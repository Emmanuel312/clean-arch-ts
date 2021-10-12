import { Exercise } from "../../../src/domain/entities/Exercise";
import { ExerciseAlreadyValidatedException } from "../../../src/domain/entities/ExerciseAlreadyValidatedException";
import { OwnerTeacherCannotValidadeOwnExerciseException } from "../../../src/domain/entities/OwnerTeacherCannotValidadeOwnExerciseException";
import { Question } from "../../../src/domain/entities/Question";
import { Teacher } from "../../../src/domain/entities/Teacher";
import { TeacherAlreadyValidatedException } from "../../../src/domain/entities/TeacherAlreadyValidatedException";
import { TeacherValidateExerciseUseCase } from "../../../src/domain/useCases/TeacherValidateExerciseUseCase";

describe("Teacher Validade Exercise", () => {
  let teacherOwner: Teacher;
  let exercise: Exercise<Question<any>>;
  let teachers: Teacher[] = [];

  beforeEach(() => {
    teachers = [];
    teacherOwner = new Teacher(
      "1",
      "John",
      "Doe",
      "john.doe@englishquestions.com"
    );
    exercise = new Exercise<Question<any>>(
      "1",
      "Title",
      "Description",
      [],
      teacherOwner
    );
    teachers.push(
      new Teacher("2", "John2", "Doe2", "john2.doe@englishquestions.com"),
      new Teacher("3", "John3", "Doe3", "john3.doe@englishquestions.com"),
      new Teacher("4", "John4", "Doe4", "john4.doe@englishquestions.com")
    );
  });
  test("should increase validate amount", async () => {
    // given
    const teacher = new Teacher(
      "2",
      "John2",
      "Doe2",
      "john2.doe@englishquestions.com"
    );
    const teacherValidateExerciseUseCase = new TeacherValidateExerciseUseCase();
    const exerciseStatus = exercise.validateStatus();
    // when
    const exerciseValidateAmount = await teacherValidateExerciseUseCase.run(
      teacher,
      exercise
    );
    // then
    expect(exerciseValidateAmount).toBe(exerciseStatus + 1);
  });

  test("should increase validate amount and make the exercise valid", async () => {
    // given
    const teacherValidateExerciseUseCase = new TeacherValidateExerciseUseCase();
    // when
    for await (let teacher of teachers) {
      await teacherValidateExerciseUseCase.run(teacher, exercise);
    }
    // then
    expect(exercise.isValid()).toBe(true);
  });

  test("should not increase validate amount when the teacher already exists in the validate set", async () => {
    const teacherValidateExerciseUseCase = new TeacherValidateExerciseUseCase();

    const teacher = new Teacher(
      "2",
      "John2",
      "Doe2",
      "john2.doe@englishquestions.com"
    );

    await teacherValidateExerciseUseCase.run(teacher, exercise);

    await expect(() =>
      teacherValidateExerciseUseCase.run(teacher, exercise)
    ).rejects.toEqual(new TeacherAlreadyValidatedException());
  });

  test("should not increase validate amount when the exercise is already validated", async () => {
    const teacherValidateExerciseUseCase = new TeacherValidateExerciseUseCase();
    const teacher = new Teacher(
      "5",
      "John5",
      "Doe5",
      "john5.doe@englishquestions.com"
    );

    for await (let teacher of teachers) {
      await teacherValidateExerciseUseCase.run(teacher, exercise);
    }

    await expect(() =>
      teacherValidateExerciseUseCase.run(teacher, exercise)
    ).rejects.toEqual(new ExerciseAlreadyValidatedException());
  });

  test("should not validate when the exercise belongs to the owner", async () => {
    const teacherValidateExerciseUseCase = new TeacherValidateExerciseUseCase();

    await expect(() =>
      teacherValidateExerciseUseCase.run(teacherOwner, exercise)
    ).rejects.toEqual(new OwnerTeacherCannotValidadeOwnExerciseException());
  });
});
