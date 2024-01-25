import { Module, OnModuleInit } from '@nestjs/common';
import { GptSummaryService } from './llm.service';
import { SummarizeArticleCommandHandler } from './handlers/summarize-article.handler';
import { FirestoreClient } from './repository/firestore.client';
import { ConfigService } from '@nestjs/config';
import { FirestoreSummaryRepository } from './repository/firestore-summary.repository';
import { SummarizeArticleSaveCommandHandler } from './handlers/summarize-save.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { GetLatestSavedSummaryHandler } from './handlers/get-latest-saved-summary.handler';
import { FirestorePricingRepository } from './repository/firestore-pricing.repository';
import { PricingSaveCommandHandler } from './handlers/pricing-save.handler';
import { CosmosVectorRepository } from './repository/cosmos-vector.repository';
import { CosmosTestController } from './test.controller';
import { SummarizeArticleSaveVectorHandler } from './handlers/summarize-save-vector.handler';

const commandHandlers = [
  SummarizeArticleCommandHandler,
  SummarizeArticleSaveCommandHandler,
  GetLatestSavedSummaryHandler,
  PricingSaveCommandHandler,
  SummarizeArticleSaveVectorHandler,
];

@Module({
  imports: [CqrsModule],
  providers: [
    FirestoreClient,
    GptSummaryService,
    ...commandHandlers,
    {
      provide: 'FIREBASE_SUMMARY_COLLECTION',
      useFactory: (configService: ConfigService) =>
        configService.get<string>('FIREBASE_SUMMARY_COLLECTION'),
      inject: [ConfigService],
    },
    {
      provide: 'ISummaryRepository',
      useClass: FirestoreSummaryRepository,
    },
    {
      provide: 'FIREBASE_PRICING_COLLECTION',
      useFactory: (configService: ConfigService) =>
        configService.get<string>('FIREBASE_PRICING_COLLECTION'),
      inject: [ConfigService],
    },
    {
      provide: 'IPricingRepository',
      useClass: FirestorePricingRepository,
    },
    FirestoreSummaryRepository,
    FirestorePricingRepository,
    CosmosVectorRepository,
  ],
  controllers: [CosmosTestController],
  exports: [FirestoreClient],
})
export class SummarizerModule implements OnModuleInit {
  constructor(
    private readonly cosmosVectorRepository: CosmosVectorRepository,
  ) {}

  async onModuleInit() {
    await this.cosmosVectorRepository.createIndex();
  }
}
