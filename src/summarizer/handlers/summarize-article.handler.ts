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
    let articleText = command.articleText;
    if (command.articleText.length > 11070)
      articleText = command.articleText.slice(0, 11070);

    const result = await this.summarizeArticleService.generateJsonSummary(
      articleText,
      // Get just the first 100 characters of the article source for source quality check
      command.articleSource.slice(0, 100),
    );

    /**
      //TODO: Replace timeout with Finetunning LLM to reduce prompt length
      const timeoutDuration = 10000;
      const updateInterval = 1000;
      // Total number of updates
      const totalUpdates = timeoutDuration / updateInterval;
      console.log('Starting 30-s delay...');
  
      // Create and start the loading bar
      let currentProgress = 0;
      const loadingInterval = setInterval(() => {
        currentProgress++;
        const progressBar =
          '▓'.repeat(currentProgress) +
          '░'.repeat(totalUpdates - currentProgress);
        process.stdout.write(
          `\r[${progressBar}] ${Math.round(
            (currentProgress / totalUpdates) * 100,
          )}%`,
        );
      }, updateInterval);
    */

    // Wait for 1 minute (60000 milliseconds) before proceeding
    //    await new Promise((resolve) => setTimeout(resolve, timeoutDuration));
    //    clearInterval(loadingInterval); // Clear the interval once the wait is over

    console.log('\nDelay complete. Proceeding with next execution.');

    // Validate the result against the Zod schema
    return result;
  }
}
