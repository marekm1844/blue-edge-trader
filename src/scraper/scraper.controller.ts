import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get(':symbol')
  async scrape(@Param('symbol') symbol: string, @Res() res: Response) {
    try {
      const data = await this.scraperService.scrape(symbol);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: `Error occurred: ${error.message}` });
    }
  }
}
