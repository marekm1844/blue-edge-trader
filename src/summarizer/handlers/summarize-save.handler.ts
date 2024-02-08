import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { SummarizeArticleSaveCommand } from '../commands/summarize-save.command';
import { ISummaryRepository } from '../repository/summary.interface';
import { Inject } from '@nestjs/common';
import { ArticleSummaryFinishedEvent } from '../events/article-summary-finished.event';
import { Score } from '../../technical-analysis/ema.model';
import { addMinutes, parse } from 'date-fns';

@CommandHandler(SummarizeArticleSaveCommand)
export class SummarizeArticleSaveCommandHandler
  implements ICommandHandler<SummarizeArticleSaveCommand>
{
  constructor(
    @Inject('ISummaryRepository')
    private readonly summaryRepository: ISummaryRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: SummarizeArticleSaveCommand): Promise<void> {
    const docId = await this.summaryRepository.save(command.summary);

    const timeZoneOffset = new Date().getTimezoneOffset();

    const score: Score = {
      date: addMinutes(
        parse(command.summary.date, 'yyyyMMdd hh:mma', new Date()),
        -timeZoneOffset,
      ),
      scores: {
        overallSentimentScore: command.summary.scores.overallSentimentScore,
        relevance: command.summary.scores.relevance,
        pricing: command.summary.scores.pricing,
        subscribers: command.summary.scores.subscribers,
        competition: command.summary.scores.competition,
        costs: command.summary.scores.costs,
        quality: command.summary.scores.quality,
      },
    };

    this.eventBus.publish(
      new ArticleSummaryFinishedEvent(command.summary.symbol, docId, score),
    );
  }
}
