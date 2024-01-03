import { Controller, Get, Query } from '@nestjs/common';
import { AlphaVantageService } from './alphavantage.service';
import { RSIIndicator } from './rsi.indicator';

@Controller('technical')
export class TechnicalAnalysisController {
  constructor(private alphaVantageService: AlphaVantageService) {}

  @Get('rsi')
  async getRSI(
    @Query('symbol') symbol: string,
    @Query('interval') interval: string,
    @Query('timePeriod') timePeriod: number,
    @Query('seriesType') seriesType: string,
  ) {
    const rsiBuilder = new RSIIndicator()
      .setSymbol(symbol)
      .setInterval(interval)
      .setTimePeriod(timePeriod)
      .setSeriesType(seriesType);

    const params = rsiBuilder.getParams();
    try {
      return await this.alphaVantageService.fetchData(params);
    } catch (error) {
      console.error('Error fetching data from Alpha Vantage:', error);
      throw error;
    }
  }
}
