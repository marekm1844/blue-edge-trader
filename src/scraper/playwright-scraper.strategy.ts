// playwright.service.ts
import { Injectable } from '@nestjs/common';
import { chromium } from 'playwright';
import { IScraper } from './scraper.interface';

@Injectable()
export class PlaywrightService implements IScraper {
  async scrapeArticle(url: string): Promise<string> {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    try {
      // Wait for the button to be available and click it

      const innerText = await page.evaluate(() => document.body.innerText);
      return innerText;
    } catch (error) {
      console.error('Error clicking the button:', error);
      return null;
    } finally {
      await browser.close();
    }
  }
}
