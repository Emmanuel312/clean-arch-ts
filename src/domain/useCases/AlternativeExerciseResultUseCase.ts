import { AlternativeQuestion } from "../entities/alternative/AlternativeQuestion";
import { Exercise } from "../entities/Exercise";
import { QuestionResult } from "../entities/QuestionResult";

export class AlternativeExerciseResultUseCase {
  public async run(
    exercise: Exercise<AlternativeQuestion>,
    choices: Map<string, string>
  ): Promise<QuestionResult> {
    const correctQuestions: string[] = [];
    const wrongQuestions: string[] = [];

    const questionsCorrect = exercise.questions.filter((question) => {
      const alternativeCheckedId = choices.get(question.id);

      if (!alternativeCheckedId) return false;

      if (this.isAlternativeCheckedCorrect(question, alternativeCheckedId)) {
        correctQuestions.push(question.id);

        return true;
      } else {
        wrongQuestions.push(question.id);
        return false;
      }
    });

    return {
      result: questionsCorrect.length / exercise.questions.length,
      correctQuestions,
      wrongQuestions,
    };
  }

  private isAlternativeCheckedCorrect(
    question: AlternativeQuestion,
    alternativeCheckedId: string
  ): boolean {
    const alternativeCorrect = question.getResult();

    return alternativeCorrect?.id === alternativeCheckedId;
  }
}
