import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FetchInnerTextQuery } from '../queries/fetch-inner-text.query';
import { ArticleScraperService } from '../article-scraper.service';

@QueryHandler(FetchInnerTextQuery)
export class FetchInnerTextHandler
  implements IQueryHandler<FetchInnerTextQuery>
{
  async execute(query: FetchInnerTextQuery): Promise<string> {
    const scraper = new ArticleScraperService(query.url);
    return scraper.scrape(query.url);
  }
}
