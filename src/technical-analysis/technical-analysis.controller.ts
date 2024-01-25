import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AlphaVantageService } from './alphavantage.service';
import { RSIIndicator } from './rsi.indicator';
import { CommandBus } from '@nestjs/cqrs';
import { CreateDailyRollupCommand } from './commands/create-daily-rollup.command';
import { CreateDailyRollupDto } from './dto/create-daily-rollup.dto';

@Controller('technical')
export class TechnicalAnalysisController {
  constructor(
    private alphaVantageService: AlphaVantageService,
    private readonly commandBus: CommandBus,
  ) {}

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

  @Post('daily-rollup')
  async getScoring(@Body() createDailyRollupDto: CreateDailyRollupDto) {
    try {
      return await this.commandBus.execute(
        new CreateDailyRollupCommand(createDailyRollupDto),
      );
    } catch (error) {
      console.error('Error fetching data from Alpha Vantage:', error);
      throw error;
    }
  }
}
