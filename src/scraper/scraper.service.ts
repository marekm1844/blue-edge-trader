import { Injectable, Logger } from '@nestjs/common';
import * as cheerio from 'cheerio';

@Injectable()
export class ScraperService {
  async scrape(symbol: string): Promise<string[]> {
    const url = `https://finviz.com/quote.ashx?t=${symbol}&p=d`;
    const articles = [];
    let lastKnownDate = this.getCurrentDate();

    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`unexpected response ${res.statusText}`);
      }
      const page = await res.text();
      const $ = cheerio.load(page);

      $('table.news-table tr').each((index, element) => {
        const tdElements = $(element).find('td');
        let dateTime = $(tdElements[0]).text().trim();
        const title = $(tdElements[1]).find('a.tab-link-news').text().trim();
        const link = $(tdElements[1]).find('a.tab-link-news').attr('href');
        const source = $(tdElements[1]).find('span').text().trim();

        if (dateTime.includes('-')) {
          lastKnownDate = this.convertToDate(dateTime.split(' ')[0]);
        } else if (dateTime.includes('Today')) {
          dateTime = dateTime.replace('Today', lastKnownDate);
        } else {
          dateTime = `${lastKnownDate} ${dateTime}`;
        }

        if (title && link) {
          articles.push({ date: dateTime, title, link, source });
        }
      });
    } catch (err) {
      Logger.error(err);
    }

    return articles;
  }

  private getCurrentDate(): string {
    const now = new Date();
    return `${now.getFullYear()}${this.pad(now.getMonth() + 1)}${this.pad(
      now.getDate(),
    )}`;
  }

  private convertToDate(dateStr: string): string {
    const months = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };
    const parts = dateStr.split('-');
    return `20${parts[2]}${months[parts[0]]}${this.pad(parseInt(parts[1]))}`;
  }

  private pad(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
