import { Module } from '@nestjs/common';
import { AlphaVantageService } from './alphavantage.service';
import { TechnicalAnalysisController } from './technical-analysis.controller';

@Module({
  controllers: [TechnicalAnalysisController],
  providers: [AlphaVantageService],
  exports: [AlphaVantageService],
})
export class TechnicalAnalysisModule {}
