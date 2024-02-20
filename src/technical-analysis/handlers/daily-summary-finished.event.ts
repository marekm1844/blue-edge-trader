import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DailySummaryFinishedEvent } from '../../summarizer/events/daily-summary-finished.event';
import { FirestoreDailyTechnicalRepository } from '../repository/daily-technical.repository';
import { format } from 'date-fns';

@EventsHandler(DailySummaryFinishedEvent)
export class DailySummaryFinishedHandler
  implements IEventHandler<DailySummaryFinishedEvent>
{
  constructor(private readonly dailyRepo: FirestoreDailyTechnicalRepository) {}

  async handle(event: DailySummaryFinishedEvent) {
    const documentId = `${format(event.date, 'yyyyMMdd')}:${event.symbol}`;

    await this.dailyRepo.updateFieldsById(documentId, 'summary', event.summary);
    await this.dailyRepo.updateFieldsById(documentId, 'comment', event.comment);
  }
}
