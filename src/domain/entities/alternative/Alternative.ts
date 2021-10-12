export class Alternative {
  constructor(
    public id: string,
    public content: string,
    private correct: boolean
  ) {}

  public isCorrect(): boolean {
    return this.correct;
  }
}
