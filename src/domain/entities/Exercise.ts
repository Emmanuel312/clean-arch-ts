import { ExerciseAlreadyValidatedException } from "./ExerciseAlreadyValidatedException";
import { OwnerTeacherCannotValidadeOwnExerciseException } from "./OwnerTeacherCannotValidadeOwnExerciseException";
import { Question } from "./Question";
import { Teacher } from "./Teacher";
import { TeacherAlreadyValidatedException } from "./TeacherAlreadyValidatedException";

export class Exercise<T extends Question<any>> {
  private readonly TEACHERS_VALIDATE_AMOUNT: number = 3;

  constructor(
    public id: string,
    public title: string,
    public description: string,
    public questions: T[],
    public teacherOwner: Teacher,
    private teachersValidated: Teacher[] = []
  ) {}

  public addValidate(teacher: Teacher) {
    const teachersValidadeAmount = this.teachersValidated.length;

    if (this.isValid()) throw new ExerciseAlreadyValidatedException();
    const teacherExists = this.teachersValidated.find(
      (teacherValidate) => teacherValidate.id === teacher.id
    );
    if (teacherExists) throw new TeacherAlreadyValidatedException();

    if (teacher.id === this.teacherOwner.id)
      throw new OwnerTeacherCannotValidadeOwnExerciseException();

    if (teachersValidadeAmount < this.TEACHERS_VALIDATE_AMOUNT)
      this.teachersValidated.push(teacher);
  }

  public isValid() {
    return this.teachersValidated.length === this.TEACHERS_VALIDATE_AMOUNT;
  }

  public validateStatus() {
    return this.teachersValidated.length;
  }
}
