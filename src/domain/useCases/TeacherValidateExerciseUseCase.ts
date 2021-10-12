import { Exercise } from "../entities/Exercise";
import { Question } from "../entities/Question";
import { Teacher } from "../entities/Teacher";

export class TeacherValidateExerciseUseCase {
  public async run(
    teacher: Teacher,
    exercise: Exercise<Question<any>>
  ): Promise<number> {
    exercise.addValidate(teacher);

    return exercise.validateStatus();
  }
}
