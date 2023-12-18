import { NewsWithArticleAndSummary } from 'src/scraper/news.type';

export interface ISummaryRepository {
  save(summary: NewsWithArticleAndSummary): Promise<void>;
  getLatestSavedSummary(symbol: string): Promise<NewsWithArticleAndSummary>;
}
