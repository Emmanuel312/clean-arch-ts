export class OwnerTeacherCannotValidadeOwnExerciseException implements Error {
  constructor(
    public name: string = "OwnerTeacherCannotValidadeOwnExerciseException",
    public message: string = "Owner Teacher Cannot Validade Own Exercise"
  ) {}
}
