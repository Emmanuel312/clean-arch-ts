export class AlternativeQuestionWithMultiplesCorrectAlternativesException
  implements Error
{
  constructor(
    public name: string = "QuestionWithMultiplesCorrectAlternativesException",
    public message: string = "Question with multiples correct alternatives"
  ) {}
}
