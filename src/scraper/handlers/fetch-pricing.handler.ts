import { QueryHandler } from '@nestjs/cqrs';
import { FetchPricingQuery } from '../queries/fetch-pricing.query';
import { NetflixPricingScraperService } from '../netflix-pricing.scraper';
import { PricingData } from '../netflix-pricing.schema';

@QueryHandler(FetchPricingQuery)
export class FetchPricingHandler {
  constructor(private readonly scraperService: NetflixPricingScraperService) {}

  async execute(query: FetchPricingQuery): Promise<PricingData> {
    if (query.symbol === 'NFLX') {
      return this.scraperService.scrape(query.country);
    }
  }
}
