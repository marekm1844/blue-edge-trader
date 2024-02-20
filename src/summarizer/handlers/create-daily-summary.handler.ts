import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateDailySummary } from '../../technical-analysis/events/create-daily-summary.event';
import { FirestoreSummaryRepository } from '../repository/firestore-summary.repository';
import { GptSummaryService } from '../llm.service';
import { DailySummaryFinishedEvent } from '../events/daily-summary-finished.event';
import { format } from 'date-fns';
import { Logger } from '@nestjs/common';

@EventsHandler(CreateDailySummary)
export class CreateDailySummaryHandler
  implements IEventHandler<CreateDailySummary>
{
  constructor(
    private readonly summaryRepo: FirestoreSummaryRepository,
    private readonly gptSummaryService: GptSummaryService,
    private eventsBus: EventBus,
  ) {}

  async handle(event: CreateDailySummary) {
    const dateStr = format(event.date, 'yyyyMMdd');
    Logger.debug(
      `[${this.constructor.name}] Creating daily summary for ${event.symbol} on ${dateStr}`,
    );

    const articles = await this.summaryRepo.getArticlesForDay(
      format(event.date, 'yyyyMMdd'),
      event.symbol,
    );

    const summary = await this.gptSummaryService.generateDailySummary(articles);
    Logger.debug(`[${this.constructor.name}] Summary: ${summary.summary}`);

    this.eventsBus.publish(
      new DailySummaryFinishedEvent(
        event.symbol,
        event.date,
        summary.summary,
        summary.comment,
      ),
    );
  }
}
