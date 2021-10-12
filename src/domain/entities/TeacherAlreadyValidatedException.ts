export class TeacherAlreadyValidatedException implements Error {
  constructor(
    public name: string = "TeacherAlreadyValidatedException",
    public message: string = "Teacher already validated"
  ) {}
}
