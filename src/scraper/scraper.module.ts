import { Module } from '@nestjs/common';
import { ScraperService } from './news-scraper.service';
import { ScraperController } from './scraper.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { FetchNewsFinvizHandler } from './handlers/fetch-news-finviz.handler';
import { FetchInnerTextHandler } from './handlers/fetch-inner-text.handler';
import { PlaywrightService } from './playwright-scraper.strategy';
import { YahooFinanceScraperService } from './yahoo-finance-scraper.strategy';
import { FetchPricingHandler } from './handlers/fetch-pricing.handler';
import { NetflixPricingScraperService } from './netflix-pricing.scraper';

const QueryHandlers = [
  FetchNewsFinvizHandler,
  FetchInnerTextHandler,
  FetchPricingHandler,
];
@Module({
  imports: [CqrsModule],
  controllers: [ScraperController],
  providers: [
    ScraperService,
    YahooFinanceScraperService,
    PlaywrightService,
    NetflixPricingScraperService,
    ...QueryHandlers,
  ],
  exports: [], // Export the service if it needs to be used outside this module
})
export class ScraperModule {}
