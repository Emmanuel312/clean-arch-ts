import { Alternative } from "../../../../src/domain/entities/alternative/Alternative";
import { AlternativeQuestion } from "../../../../src/domain/entities/alternative/AlternativeQuestion";
import { AlternativeQuestionWithMultiplesCorrectAlternativesException } from "../../../../src/domain/entities/alternative/AlternativeQuestionWithMultiplesCorrectAlternativesException";
import { AlternativeQuestionWithNoCorrectAlternativesException } from "../../../../src/domain/entities/alternative/AlternativeQuestionWithNoCorrectAlternativesException";

describe("Alternative Question Validation", () => {
  test("should has only one correct alternative", () => {
    const question = new AlternativeQuestion("1", [
      new Alternative("1", "Alternative content", true),
      new Alternative("2", "Alternative content", false),
      new Alternative("3", "Alternative content", false),
      new Alternative("4", "Alternative content", false),
      new Alternative("5", "Alternative content", false),
    ]);

    expect(question).toHaveProperty("id");
  });

  test("should throw a exception with question has multiples correct alternatives", () => {
    expect(() => {
      new AlternativeQuestion("2", [
        new Alternative("1", "Alternative content", true),
        new Alternative("2", "Alternative content", true),
        new Alternative("3", "Alternative content", false),
        new Alternative("4", "Alternative content", false),
        new Alternative("5", "Alternative content", false),
      ]);
    }).toThrow(AlternativeQuestionWithMultiplesCorrectAlternativesException);
  });

  test("should throw a exception with question doesn't have any correct alternative", () => {
    expect(() => {
      new AlternativeQuestion("2", [
        new Alternative("1", "Alternative content", false),
        new Alternative("2", "Alternative content", false),
        new Alternative("3", "Alternative content", false),
        new Alternative("4", "Alternative content", false),
        new Alternative("5", "Alternative content", false),
      ]);
    }).toThrow(AlternativeQuestionWithNoCorrectAlternativesException);
  });
});
