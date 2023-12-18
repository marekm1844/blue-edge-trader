import { Module } from '@nestjs/common';
import { GptSummaryService } from './llm.service';
import { SummarizeArticleCommandHandler } from './handlers/summarize-article.handler';
import { FirestoreClient } from './repository/firestore.client';
import { ConfigService } from '@nestjs/config';
import { FirestoreSummaryRepository } from './repository/firestore-summary.repository';
import { SummarizeArticleSaveCommandHandler } from './handlers/summarize-save.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { GetLatestSavedSummaryHandler } from './handlers/get-latest-saved-summary.handler';

const commandHandlers = [
  SummarizeArticleCommandHandler,
  SummarizeArticleSaveCommandHandler,
  GetLatestSavedSummaryHandler,
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
    FirestoreSummaryRepository,
  ],
  exports: [],
})
export class SummarizerModule {}
