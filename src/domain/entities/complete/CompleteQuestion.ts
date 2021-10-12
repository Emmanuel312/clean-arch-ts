import { Question } from "../Question";
import { Complete } from "./Complete";
import { CompleteType } from "./CompleteTypes";

export class CompleteQuestion implements Question<string[]> {
  constructor(public id: string, public completes: Complete[]) {}

  getResult(): string[] {
    return this.completes
      .filter((complete) => complete.type === CompleteType.INPUT)
      .map((complete) => complete.content);
  }
}
