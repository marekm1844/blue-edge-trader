import { NewsSummarySchema } from '../summarizer/article-summary.schema';
import { z } from 'zod';

export type News = {
  title: string;
  link: string;
  date: string;
  source: string;
};

export type NewsWithArticle = News & {
  article: string;
};

export type NewsWithArticleAndSummary = NewsWithArticle &
  z.infer<typeof NewsSummarySchema>;
