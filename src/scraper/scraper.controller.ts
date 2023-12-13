import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { NewsWithArticle, NewsWithArticleAndSummary } from './news.type';
import { FetchNewsFinvizQuery } from './queries/fetch-news-finviz-query';
import { FetchInnerTextQuery } from './queries/fetch-inner-text.query';
import { SummarizeArticleCommand } from 'src/summarizer/commands/summarize-article.command';
import { NewsSummarySchema } from 'src/summarizer/article-summary.schema';
import { z } from 'zod';

@Controller('scraper')
export class ScraperController {
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus,
  ) {}

  @Get(':symbol')
  async scrape(@Param('symbol') symbol: string, @Res() res: Response) {
    try {
      const newsArticles = await this.queryBus.execute(
        new FetchNewsFinvizQuery(symbol),
      );

      // Use Promise.all to fetch innerText for all articles in parallel
      const fetchInnerTextPromises = newsArticles.map((article) =>
        this.queryBus
          .execute(new FetchInnerTextQuery(article.link))
          .then((innerText) => ({ ...article, innerText })),
      );

      const newsWithArticle: NewsWithArticle[] = await Promise.all(
        fetchInnerTextPromises,
      );

      const withSummary: NewsWithArticleAndSummary[] = [];
      for (const article of newsWithArticle) {
        const summary: z.infer<typeof NewsSummarySchema> =
          await this.commandBus.execute(
            new SummarizeArticleCommand(article.article),
          );
        withSummary.push({ ...article, ...summary });
      }

      return res.json(withSummary);
    } catch (error) {
      res.status(500).json({ message: `Error occurred: ${error.message}` });
    }
  }
}
