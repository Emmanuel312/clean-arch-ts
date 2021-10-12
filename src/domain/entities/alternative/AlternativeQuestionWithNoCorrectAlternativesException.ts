export class AlternativeQuestionWithNoCorrectAlternativesException
  implements Error
{
  constructor(
    public name: string = "QuestionWithNoCorrectAlternativesException",
    public message: string = "Question with no correct alternatives"
  ) {}
}
