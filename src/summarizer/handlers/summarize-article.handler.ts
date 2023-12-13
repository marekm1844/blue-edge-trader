import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SummarizeArticleCommand } from '../commands/summarize-article.command';
import { NewsSummarySchema } from '../article-summary.schema';
import { GptSummaryService } from '../llm.service';

@CommandHandler(SummarizeArticleCommand)
export class SummarizeArticleCommandHandler
  implements ICommandHandler<SummarizeArticleCommand>
{
  constructor(private readonly summarizeArticleService: GptSummaryService) {}

  async execute(
    command: SummarizeArticleCommand,
  ): Promise<(typeof NewsSummarySchema)['_type']> {
    const result = await this.summarizeArticleService.generateJsonSummary(
      command.articleText,
    );
    // Validate the result against the Zod schema
    return result;
  }
}
