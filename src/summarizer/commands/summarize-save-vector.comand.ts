import { NewsWithArticleAndSummary } from '../../scraper/news.type';

export class SummarizeArticleSaveVectorCommand {
  constructor(public readonly summary: NewsWithArticleAndSummary) {}
}
