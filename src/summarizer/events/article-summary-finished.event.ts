import { IEvent } from '@nestjs/cqrs';
import { Score } from '../../technical-analysis/ema.model';

export class ArticleSummaryFinishedEvent implements IEvent {
  constructor(
    public readonly symbol: string,
    public readonly documentId: string,
    public readonly data: Score,
  ) {}
}
