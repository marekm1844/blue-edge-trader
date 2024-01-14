import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { NewsWithArticle, NewsWithArticleAndSummary } from './news.type';
import { FetchNewsFinvizQuery } from './queries/fetch-news-finviz-query';
import { FetchInnerTextQuery } from './queries/fetch-inner-text.query';
import { SummarizeArticleCommand } from 'src/summarizer/commands/summarize-article.command';
import { NewsSummarySchema } from 'src/summarizer/article-summary.schema';
import { z } from 'zod';
import { SummarizeArticleSaveCommand } from 'src/summarizer/commands/summarize-save.command';
import { GetLatestSavedSummaryQuery } from 'src/summarizer/queries/get-latest-saved-summary.query';
import { FetchPricingQuery } from './queries/fetch-pricing.query';
import { PricingSaveCommand } from 'src/summarizer/commands/pricing-save.command';
import { PricingData } from './netflix-pricing.schema';
import { SummarizeArticleSaveVectorCommand } from 'src/summarizer/commands/summarize-save-vector.comand';

@Controller('scraper')
export class ScraperController {
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus,
  ) {}

  @Get(':symbol')
  async scrape(@Param('symbol') symbol: string, @Res() res: Response) {
    try {
      const latestSavedSummary: NewsWithArticleAndSummary =
        await this.queryBus.execute(new GetLatestSavedSummaryQuery(symbol));

      const dateSave = latestSavedSummary ? latestSavedSummary.date : null;
      const newsArticles = await this.queryBus.execute(
        new FetchNewsFinvizQuery(symbol, dateSave),
      );

      // Use Promise.all to fetch innerText for all articles in parallel
      const fetchInnerTextPromises = newsArticles.map((article) =>
        this.queryBus
          .execute(new FetchInnerTextQuery(article.link))
          .then((innerText) => ({ ...article, innerText })),
      );

      const newsWithArticle: NewsWithArticle[] = await Promise.all(
        fetchInnerTextPromises,
      );

      //remove articles whren innerText containd "Continue reading"
      const newsWithArticleFiltered = newsWithArticle.filter((article) => {
        return !article.innerText.includes('Continue reading');
      });

      const withSummary: NewsWithArticleAndSummary[] = [];
      for (const article of newsWithArticleFiltered) {
        Logger.log(`Summarizing article: ${JSON.stringify(article)}`);
        const summary: z.infer<typeof NewsSummarySchema> =
          await this.commandBus.execute(
            new SummarizeArticleCommand(article.innerText, article.source),
          );
        withSummary.push({ ...article, ...summary });
        await this.commandBus.execute(
          new SummarizeArticleSaveCommand({ ...article, ...summary }),
        );
        await this.commandBus.execute(
          new SummarizeArticleSaveVectorCommand({ ...article, ...summary }),
        );
      }

      return res.json(withSummary);
    } catch (error) {
      res.status(500).json({ message: `Error occurred: ${error.message}` });
    }
  }

  @Get('price/:symbol')
  async getPricing(@Param('symbol') symbol: string, @Res() res: Response) {
    try {
      const countries_list = [
        'AF',
        'AL',
        'DE',
        'AD',
        'AO',
        'AI',
        'AQ',
        'AG',
        'SA',
        'DZ',
        'AR',
        'AM',
        'AW',
        'AU',
        'AT',
        'AZ',
        'BS',
        'BD',
        'BB',
        'BH',
        'BE',
        'BZ',
        'BJ',
        'BM',
        'BY',
        'BO',
        'BA',
        'BW',
        'BR',
        'BN',
        'BG',
        'BF',
        'BI',
        'BT',
        'CV',
        'KH',
        'CM',
        'CA',
        'BQ',
        'QA',
        'TD',
        'CL',
        'CN',
        'CY',
        'VA',
        'CO',
        'KM',
        'KP',
        'KR',
        'CR',
        'CI',
        'HR',
        'CU',
        'CW',
        'DK',
        'DJ',
        'DM',
        'EC',
        'EG',
        'SV',
        'AE',
        'ER',
        'SK',
        'SI',
        'ES',
        'US',
        'EE',
        'ET',
        'PH',
        'FI',
        'FJ',
        'FR',
        'GA',
        'GM',
        'GE',
        'GH',
        'GI',
        'GD',
        'GR',
        'GL',
        'GP',
        'GU',
        'GT',
        'GF',
        'GG',
        'GN',
        'GW',
        'GQ',
        'GY',
        'HT',
        'HN',
        'HK',
        'HU',
        'IN',
        'ID',
        'IQ',
        'IR',
        'IE',
        'BV',
        'CX',
        'IM',
        'IS',
        'NF',
        'AX',
        'KY',
        'CC',
        'CK',
        'FO',
        'GS',
        'HM',
        'FK',
        'MP',
        'MH',
        'UM',
        'PN',
        'SB',
        'TC',
        'VG',
        'VI',
        'IL',
        'IT',
        'JM',
        'JP',
        'JE',
        'KZ',
        'KE',
        'KG',
        'KI',
        'KW',
        'LA',
        'LS',
        'LV',
        'LB',
        'LR',
        'LY',
        'LI',
        'LT',
        'LU',
        'MO',
        'MK',
        'MG',
        'MY',
        'MW',
        'MV',
        'ML',
        'MT',
        'MA',
        'MQ',
        'MU',
        'MR',
        'YT',
        'MX',
        'FM',
        'MD',
        'MC',
        'MN',
        'ME',
        'MS',
        'MZ',
        'MM',
        'NA',
        'NR',
        'NP',
        'NI',
        'NE',
        'NG',
        'NU',
        'NO',
        'NC',
        'NZ',
        'OM',
        'NL',
        'PK',
        'PW',
        'PS',
        'PA',
        'PG',
        'PY',
        'PE',
        'PF',
        'PL',
        'PT',
        'PR',
        'GB',
        'CF',
        'CZ',
        'CG',
        'CD',
        'DO',
        'RE',
        'RW',
        'RO',
        'RU',
        'EH',
        'WS',
        'AS',
        'BL',
        'KN',
        'SM',
        'MF',
        'PM',
        'SH',
        'LC',
        'ST',
        'VC',
        'SN',
        'RS',
        'SC',
        'SL',
        'SG',
        'SX',
        'SY',
        'SO',
        'LK',
        'SZ',
        'ZA',
        'SD',
        'SS',
        'SE',
        'CH',
        'SR',
        'SJ',
        'TH',
        'TW',
        'TZ',
        'TJ',
        'IO',
        'TF',
        'TL',
        'TG',
        'TK',
        'TO',
        'TT',
        'TN',
        'TM',
        'TR',
        'TV',
        'UA',
        'UG',
        'UY',
        'UZ',
        'VU',
        'VE',
        'VN',
        'WF',
        'YE',
        'ZM',
        'ZW',
      ];

      const promises = countries_list.map((country) => {
        return this.queryBus.execute(new FetchPricingQuery(symbol, country));
      });

      const p2: PricingData[] = await Promise.all(promises);

      await this.commandBus.execute(new PricingSaveCommand(p2));

      return res.json(p2);
    } catch (error) {
      res.status(500).json({ message: `Error occurred: ${error.message}` });
    }
  }
}
