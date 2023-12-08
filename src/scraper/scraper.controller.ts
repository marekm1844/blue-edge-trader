import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { QueryBus } from '@nestjs/cqrs';
import { NewsWithArticle } from './news.type';
import { FetchNewsFinvizQuery } from './queries/fetch-news-finviz-query';
import { FetchInnerTextQuery } from './queries/fetch-inner-text.query';

@Controller('scraper')
export class ScraperController {
  constructor(private queryBus: QueryBus) {}

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

      return res.json(newsWithArticle);
    } catch (error) {
      res.status(500).json({ message: `Error occurred: ${error.message}` });
    }
  }
}
