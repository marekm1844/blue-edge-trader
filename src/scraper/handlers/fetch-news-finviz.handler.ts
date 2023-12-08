import { QueryHandler } from '@nestjs/cqrs';
import { FetchNewsFinvizQuery } from '../queries/fetch-news-finviz-query';
import { ScraperService } from '../news-scraper.service';
import { News } from '../news.type';

@QueryHandler(FetchNewsFinvizQuery)
export class FetchNewsFinvizHandler {
  constructor(private readonly scraperService: ScraperService) {}
  async execute(query: FetchNewsFinvizQuery): Promise<News[]> {
    return this.scraperService.scrape(query.symbol);
  }
}
