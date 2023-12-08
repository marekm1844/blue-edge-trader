import { Logger } from '@nestjs/common';
import { PlaywrightService } from './playwright-scraper.service';
import { YahooFinanceScraperService } from './yahoo-finance-scraper.service';
import { IScraper } from './scraper.interface';

export class ArticleScraperService {
  private readonly logger = new Logger(ArticleScraperService.name);
  private scraper: IScraper;

  constructor(url: string) {
    if (url.includes('yahoo')) {
      this.scraper = new YahooFinanceScraperService();
    } else {
      this.scraper = new PlaywrightService();
    }
  }

  async scrape(url: string): Promise<string> {
    return this.scraper.scrapeArticle(url);
  }
}
