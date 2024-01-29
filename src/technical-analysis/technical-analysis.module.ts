import { Module } from '@nestjs/common';
import { AlphaVantageService } from './alphavantage.service';
import { TechnicalAnalysisController } from './technical-analysis.controller';
import { SummarizerModule } from 'src/summarizer/summarizer.module';
import { ConfigService } from '@nestjs/config';
import { FirestoreTechnicalAnalysisRepository } from './repository/firestore-technical.repository';
import { CreateDailyRollupHandler } from './handlers/create-daily-rollup.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { FirestoreDailyTechnicalRepository } from './repository/daily-technical.repository';
import { DailyMedianFinishedHandler } from './handlers/daily-median-finished.handler';

const commandHandlers = [CreateDailyRollupHandler, DailyMedianFinishedHandler];
@Module({
  imports: [CqrsModule, SummarizerModule],
  controllers: [TechnicalAnalysisController],
  providers: [
    ...commandHandlers,
    AlphaVantageService,
    {
      provide: 'FIREBASE_SUMMARY_COLLECTION',
      useFactory: (configService: ConfigService) =>
        configService.get<string>('FIREBASE_SUMMARY_COLLECTION'),
      inject: [ConfigService],
    },
    {
      provide: 'FIREBASE_DAILY_COLLECTION',
      useFactory: (configService: ConfigService) =>
        configService.get<string>('FIREBASE_DAILY_COLLECTION'),
      inject: [ConfigService],
    },
    FirestoreTechnicalAnalysisRepository,
    FirestoreDailyTechnicalRepository,
  ],
  exports: [AlphaVantageService],
})
export class TechnicalAnalysisModule {}
