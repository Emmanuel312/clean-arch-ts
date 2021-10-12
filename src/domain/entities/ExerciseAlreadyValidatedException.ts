export class ExerciseAlreadyValidatedException implements Error {
  constructor(
    public name: string = "ExerciseAlreadyValidatedException",
    public message: string = "Exercise already validated"
  ) {}
}
