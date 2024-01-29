import { Injectable, Logger } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { IScraper } from './scraper.interface';

@Injectable()
export class YahooFinanceScraperService implements IScraper {
  async scrapeArticle(url: string): Promise<string> {
    /**
     * Fetches an article from the specified URL, extracts the text content of the article's body,
     * and returns it as a string.
     *
     * @param url - The URL of the article to be scraped.
     * @returns The text content of the article's body, trimmed and without leading or trailing whitespace.
     * @throws If the URL is invalid, there is an error fetching the article, or extracting the inner text.
     */
    try {
      // Validate the URL
      if (!/^https?:\/\/.*yahoo.*\//i.test(url)) {
        throw new Error('Invalid URL. Only Yahoo URLs are allowed.');
      }

      const response = await fetch(url);

      // Check if the response is not found
      if (response.status === 404) {
        Logger.error(`Error 404 article: ${response.statusText}`);
        return 'No News Found';
      }

      if (!response.ok) {
        throw new Error(
          `Error fetching article: ${response.statusText}, ${response.status}`,
        );
      }
      const html = await response.text();
      const $ = cheerio.load(html);

      // Check if the selector exists before calling `.text()` on it
      const caasBody = $('.caas-body');
      const innerText = caasBody.length > 0 ? caasBody.text() : '';

      if (innerText === '') {
        throw new Error('Missing article body');
      }

      return innerText.trim();
    } catch (error) {
      console.debug(`Error fetching article url: ${url}`);
      throw new Error(`Error fetching article inner text: ${error.message}`);
    }
  }
}
