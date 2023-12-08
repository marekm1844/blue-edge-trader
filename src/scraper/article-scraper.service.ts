import { Logger } from '@nestjs/common';
import { PlaywrightService } from './playwright-scraper.strategy';
import { YahooFinanceScraperService } from './yahoo-finance-scraper.strategy';
import { IScraper } from './scraper.interface';
import { FetchYoutubeTranscriptService } from './youtube-transcript.strategy';

export class ArticleScraperService {
  private readonly logger = new Logger(ArticleScraperService.name);
  private scraper: IScraper;

  constructor(url: string) {
    if (url.includes('yahoo')) {
      this.scraper = new YahooFinanceScraperService();
    } else if (url.includes('youtube')) {
      this.scraper = new FetchYoutubeTranscriptService();
    } else {
      this.scraper = new PlaywrightService();
    }
  }

  async scrape(url: string): Promise<string> {
    return this.scraper.scrapeArticle(url);
  }
}
