import { Module } from '@nestjs/common';
import { GptSummaryService } from './llm.service';
import { SummarizeArticleCommandHandler } from './handlers/summarize-article.handler';

const commandHandlers = [SummarizeArticleCommandHandler];

@Module({
  providers: [GptSummaryService, ...commandHandlers],
  exports: [GptSummaryService],
})
export class SummarizerModule {}
