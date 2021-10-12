import { Alternative } from "./Alternative";
import { Question } from "../Question";
import { AlternativeQuestionWithMultiplesCorrectAlternativesException } from "./AlternativeQuestionWithMultiplesCorrectAlternativesException";
import { AlternativeQuestionWithNoCorrectAlternativesException } from "./AlternativeQuestionWithNoCorrectAlternativesException";

export class AlternativeQuestion implements Question<Alternative> {
  public alternatives: Alternative[];

  constructor(public id: string, alternatives: Alternative[]) {
    const alternativesCorrect = alternatives.filter((alternative) =>
      alternative.isCorrect()
    );

    if (alternativesCorrect.length === 0)
      throw new AlternativeQuestionWithNoCorrectAlternativesException();
    if (alternativesCorrect.length > 1)
      throw new AlternativeQuestionWithMultiplesCorrectAlternativesException();

    this.alternatives = alternatives;
  }

  public getResult(): Alternative {
    const alternativeCorrect = this.alternatives.find((alternative) =>
      alternative.isCorrect()
    );
    if (!alternativeCorrect)
      throw new AlternativeQuestionWithNoCorrectAlternativesException();

    return alternativeCorrect;
  }
}
