import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { NewsWithArticle, NewsWithArticleAndSummary } from './news.type';
import { FetchNewsFinvizQuery } from './queries/fetch-news-finviz-query';
import { FetchInnerTextQuery } from './queries/fetch-inner-text.query';
import { SummarizeArticleCommand } from 'src/summarizer/commands/summarize-article.command';
import { NewsSummarySchema } from 'src/summarizer/article-summary.schema';
import { z } from 'zod';
import { SummarizeArticleSaveCommand } from 'src/summarizer/commands/summarize-save.command';
import { GetLatestSavedSummaryQuery } from 'src/summarizer/queries/get-latest-saved-summary.query';

@Controller('scraper')
export class ScraperController {
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus,
  ) {}

  @Get(':symbol')
  async scrape(@Param('symbol') symbol: string, @Res() res: Response) {
    try {
      const latestSavedSummary: NewsWithArticleAndSummary =
        await this.queryBus.execute(new GetLatestSavedSummaryQuery(symbol));

      const dateSave = latestSavedSummary ? latestSavedSummary.date : null;
      const newsArticles = await this.queryBus.execute(
        new FetchNewsFinvizQuery(symbol, dateSave),
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

      //remove articles whren innerText containd "Continue reading"
      const newsWithArticleFiltered = newsWithArticle.filter((article) => {
        return !article.innerText.includes('Continue reading');
      });

      const withSummary: NewsWithArticleAndSummary[] = [];
      for (const article of newsWithArticleFiltered) {
        Logger.log(`Summarizing article: ${JSON.stringify(article)}`);
        const summary: z.infer<typeof NewsSummarySchema> =
          await this.commandBus.execute(
            new SummarizeArticleCommand(article.innerText),
          );
        withSummary.push({ ...article, ...summary });
        await this.commandBus.execute(
          new SummarizeArticleSaveCommand({ ...article, ...summary }),
        );
      }

      return res.json(withSummary);
    } catch (error) {
      res.status(500).json({ message: `Error occurred: ${error.message}` });
    }
  }
}
