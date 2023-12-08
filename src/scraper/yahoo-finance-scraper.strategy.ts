import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { IScraper } from './scraper.interface';

@Injectable()
export class YahooFinanceScraperService implements IScraper {
  async scrapeArticle(url: string): Promise<string> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching article: ${response.statusText}`);
      }
      const html = await response.text();
      const $ = cheerio.load(html);

      // Get the text content of the body tag
      const innerText = $('.caas-body').text();

      return innerText.trim();
    } catch (error) {
      console.error(`Error fetching article inner text: ${error.message}`);
      return '';
    }
  }
}
