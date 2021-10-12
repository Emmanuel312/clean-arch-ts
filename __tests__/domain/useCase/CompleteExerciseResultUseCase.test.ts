import { Exercise } from "../../../src/domain/entities/Exercise";
import { Complete } from "../../../src/domain/entities/complete/Complete";
import { CompleteQuestion } from "../../../src/domain/entities/complete/CompleteQuestion";
import { CompleteType } from "../../../src/domain/entities/complete/CompleteTypes";
import { CompleteExerciseResultUseCase } from "../../../src/domain/useCases/CompleteExerciseResultUseCase";
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
    const completeExerciseResultUseCase = new CompleteExerciseResultUseCase();
    const completeSentence1 = new CompleteQuestion("1", [
      new Complete("1", "Are", CompleteType.INPUT),
      new Complete("2", "you sure?", CompleteType.TEXT),
    ]);
    /// ___ you sure?
    const completeSentence2 = new CompleteQuestion("2", [
      new Complete("1", "Am", CompleteType.INPUT),
      new Complete("2", "I crazy?", CompleteType.TEXT),
    ]);

    const exercise = new Exercise(
      "1",
      "Exercise 1",
      "Description",
      [completeSentence1, completeSentence2],
      teacherOwner
    );

    //when
    const completeWords: Map<string, string[]> = new Map();
    completeWords.set("1", ["Are"]);
    completeWords.set("2", ["Are"]);

    const questionResult = await completeExerciseResultUseCase.run(
      exercise,
      completeWords
    );
    // then
    expect(questionResult).toEqual({
      result: 0.5,
      correctQuestions: ["1"],
      wrongQuestions: ["2"],
    });
  });

  test("should returns the result of exercise ignoring insensitive case", async () => {
    // given
    const completeExerciseResultUseCase = new CompleteExerciseResultUseCase();
    const completeSentence1 = new CompleteQuestion("1", [
      new Complete("1", "Are", CompleteType.INPUT),
      new Complete("2", "you sure?", CompleteType.TEXT),
    ]);

    const completeSentence2 = new CompleteQuestion("2", [
      new Complete("1", "Am", CompleteType.INPUT),
      new Complete("2", "I crazy?", CompleteType.TEXT),
    ]);

    const exercise = new Exercise(
      "1",
      "Exercise 1",
      "Description",
      [completeSentence1, completeSentence2],
      teacherOwner
    );

    //when
    const completeWords: Map<string, string[]> = new Map();
    completeWords.set("1", ["are"]);
    completeWords.set("2", ["are"]);

    const questionResult = await completeExerciseResultUseCase.run(
      exercise,
      completeWords
    );
    // then
    expect(questionResult).toEqual({
      result: 0.5,
      correctQuestions: ["1"],
      wrongQuestions: ["2"],
    });
  });
});
