import { CompleteQuestion } from "../entities/complete/CompleteQuestion";
import { Exercise } from "../entities/Exercise";
import { QuestionResult } from "../entities/QuestionResult";

export class CompleteExerciseResultUseCase {
  public async run(
    exercise: Exercise<CompleteQuestion>,
    completeWords: Map<string, string[]>
  ): Promise<QuestionResult> {
    const correctQuestions: string[] = [];
    const wrongQuestions: string[] = [];

    const questionsCorrect = exercise.questions.filter((question) => {
      const completeWordscurrentQuestion = completeWords.get(question.id);

      if (!completeWordscurrentQuestion) return false;

      const isCompleteSentenceCorrect = this.isCompleteSentenceCorrect(
        question,
        this.normalizeCompleteWords(completeWordscurrentQuestion)
      );

      if (isCompleteSentenceCorrect) {
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

  private isCompleteSentenceCorrect(
    question: CompleteQuestion,
    completeWordsQuestion: string[]
  ) {
    const questionResult = this.normalizeCompleteWords(question.getResult());

    return (
      JSON.stringify(questionResult) === JSON.stringify(completeWordsQuestion)
    );
  }

  private normalizeCompleteWords(words: string[]) {
    return words.map((word) => word.toLowerCase());
  }
}
