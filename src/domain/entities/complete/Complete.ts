import { CompleteType } from "./CompleteTypes";

export class Complete {
  constructor(
    public id: string,
    public content: string,
    public type: CompleteType
  ) {}
}
