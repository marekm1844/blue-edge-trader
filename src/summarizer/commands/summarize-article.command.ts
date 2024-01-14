export class SummarizeArticleCommand {
  constructor(
    public readonly articleText: string,
    public readonly articleSource: string,
  ) {}
}
