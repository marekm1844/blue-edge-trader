import { Module } from '@nestjs/common';
import { ScraperService } from './news-scraper.service';
import { ScraperController } from './scraper.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { FetchNewsFinvizHandler } from './handlers/fetch-news-finviz.handler';
import { FetchInnerTextHandler } from './handlers/fetch-inner-text.handler';
import { PlaywrightService } from './playwright-scraper.service';
import { YahooFinanceScraperService } from './yahoo-finance-scraper.service';

const QueryHandlers = [FetchNewsFinvizHandler, FetchInnerTextHandler];
@Module({
  imports: [CqrsModule],
  controllers: [ScraperController],
  providers: [
    ScraperService,
    YahooFinanceScraperService,
    PlaywrightService,
    ...QueryHandlers,
  ],
  exports: [ScraperService], // Export the service if it needs to be used outside this module
})
export class ScraperModule {}
