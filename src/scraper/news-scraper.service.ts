import { Injectable, Logger } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { News } from './news.type';
import * as moment from 'moment';

@Injectable()
export class ScraperService {
  async scrape(symbol: string, fromDateTime: string | null): Promise<News[]> {
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

        // TODO: Check if date is in correct format Mon-DD-YY HH:MMAM/PM
        if (dateTime.includes('-')) {
          // Split date and time, then process date
          const [datePart, timePart] = dateTime.split(' ');
          lastKnownDate = this.convertToDate(datePart);
          dateTime = lastKnownDate + ' ' + timePart; // Use only the date part, ignore time
        } else if (dateTime.includes('Today')) {
          const timePart = dateTime.split(' ')[1];
          dateTime = this.getCurrentDate() + ' ' + timePart; // Replace 'Today' with the current date
        } else {
          // If only time is present, use the last known date
          dateTime = lastKnownDate + ' ' + dateTime;
        }
        Logger.debug(
          `dateTime: ${dateTime} lastKnownDate: ${lastKnownDate} fromDateTime: ${fromDateTime}`,
        );

        if (
          fromDateTime &&
          moment(dateTime, 'YYYYMMDD hh:mmA').isAfter(
            moment(fromDateTime, 'YYYYMMDD hh:mmA'),
          )
        ) {
          if (title && link) {
            articles.push({ date: dateTime, title, link, source, symbol });
          }
        }
      });
    } catch (err) {
      Logger.error(err);
    }

    //return last 10 articles
    //TODO: DEBUG - remove slice
    return articles.slice(0, 5);
  }

  private getCurrentDate(): string {
    return this.formatDate(new Date());
  }

  private convertToDate(dateStr: string): string {
    const [month, day, year] = dateStr.split('-');
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
    const formattedDate = new Date(`20${year}-${months[month]}-${day}`);
    return this.formatDate(formattedDate);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  }
}
