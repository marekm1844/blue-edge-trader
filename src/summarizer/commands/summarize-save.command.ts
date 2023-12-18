import { NewsWithArticleAndSummary } from '../../scraper/news.type';

export class SummarizeArticleSaveCommand {
  constructor(public readonly summary: NewsWithArticleAndSummary) {}
}
