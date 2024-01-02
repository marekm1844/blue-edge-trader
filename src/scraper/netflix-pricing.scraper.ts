import { Injectable, Logger } from '@nestjs/common';
import * as cheerio from 'cheerio';
import {
  NetflixDataSchema,
  NetflixPlan,
  PricingData,
} from './netflix-pricing.schema';

@Injectable()
export class NetflixPricingScraperService {
  async scrape(tag: string): Promise<PricingData> {
    const url = `https://help.netflix.com/en/node/24926/${tag}`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`unexpected response ${res.statusText}`);
      }

      const page = await res.text();
      const $ = cheerio.load(page);

      const pricing: NetflixPlan[] = [];

      $('h3:contains("Pricing")')
        .next('ul')
        .find('li')
        .each((index, element) => {
          const priceText = $(element).text().trim();
          const priceParts = priceText.split(': ');
          const plan = priceParts[0].trim();
          const priceDetails = priceParts[1].trim();

          // Extract currency and amount
          const currencyMatch = priceDetails.match(/[^\d\s.]+/);
          const amountMatch = priceDetails.match(/[\d.]+/); // Match numeric characters
          const currency = currencyMatch ? currencyMatch[0] : '';
          const amount = amountMatch ? amountMatch[0].trim() : '';

          pricing.push({ plan, price: { currency, amount } });

          // Parse additional member fee
          const additionalFeeMatch = priceDetails.match(
            /\(.*?(\d+\.?\d*)\s*([^\d.]+)/,
          );
          if (additionalFeeMatch && additionalFeeMatch.length >= 3) {
            const additionalFee = additionalFeeMatch[1];
            const additionalPlan = `${plan} - Extra Member`;
            pricing.push({
              plan: additionalPlan,
              price: { currency: currency, amount: additionalFee },
            });
          }
        });

      const netflixData: PricingData = {
        country: tag,
        date: new Date(),
        pricing,
        symbol: 'NFLX',
      };

      // Validate the data with Zod
      const parsedData = NetflixDataSchema.parse(netflixData);
      return parsedData as PricingData;
    } catch (err) {
      Logger.error(err);
    }
  }
}
