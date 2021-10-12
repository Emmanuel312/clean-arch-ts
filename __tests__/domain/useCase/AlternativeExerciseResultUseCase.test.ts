import { AlternativeExerciseResultUseCase } from "../../../src/domain/useCases/AlternativeExerciseResultUseCase";
import { Alternative } from "../../../src/domain/entities/alternative/Alternative";
import { Exercise } from "../../../src/domain/entities/Exercise";
import { AlternativeQuestion } from "../../../src/domain/entities/alternative/AlternativeQuestion";
import { Teacher } from "../../../src/domain/entities/Teacher";

describe("Exercise Result Use Case", () => {
  let teacherOwner: Teacher;

  beforeEach(() => {
    teacherOwner = new Teacher(
      "1",
      "John",
      "Doe",
      "john.doe@englishquestions.com"
    );
  });

  test("should returns the result of exercise", async () => {
    // given
    const alternativeExerciseResultUseCase =
      new AlternativeExerciseResultUseCase();
    const question1 = new AlternativeQuestion("1", [
      new Alternative("1", "Alternative content", true),
      new Alternative("2", "Alternative content", false),
      new Alternative("3", "Alternative content", false),
      new Alternative("4", "Alternative content", false),
      new Alternative("5", "Alternative content", false),
    ]);

    const question2 = new AlternativeQuestion("2", [
      new Alternative("1", "Alternative content", false),
      new Alternative("2", "Alternative content", true),
      new Alternative("3", "Alternative content", false),
      new Alternative("4", "Alternative content", false),
      new Alternative("5", "Alternative content", false),
    ]);

    const question3 = new AlternativeQuestion("3", [
      new Alternative("1", "Alternative content", false),
      new Alternative("2", "Alternative content", true),
      new Alternative("3", "Alternative content", false),
      new Alternative("4", "Alternative content", false),
      new Alternative("5", "Alternative content", false),
    ]);

    const question4 = new AlternativeQuestion("4", [
      new Alternative("1", "Alternative content", false),
      new Alternative("2", "Alternative content", false),
      new Alternative("3", "Alternative content", false),
      new Alternative("4", "Alternative content", false),
      new Alternative("5", "Alternative content", true),
    ]);

    const exercise = new Exercise(
      "1",
      "Exercise 1",
      "Description",
      [question1, question2, question3, question4],
      teacherOwner
    );

    //when
    const choices: Map<string, string> = new Map();
    choices.set("1", "5");
    choices.set("2", "2");
    choices.set("3", "2");
    choices.set("4", "5");

    const questionResult = await alternativeExerciseResultUseCase.run(
      exercise,
      choices
    );
    // then
    expect(questionResult).toEqual({
      result: 0.75,
      correctQuestions: ["2", "3", "4"],
      wrongQuestions: ["1"],
    });
  });
});
