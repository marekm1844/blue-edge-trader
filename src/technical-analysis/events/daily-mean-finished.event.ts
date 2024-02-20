import { IEvent } from '@nestjs/cqrs';
import { Score } from '../ema.model';

export class DailyMeanFinishedEvent implements IEvent {
  constructor(
    public readonly symbol: string,
    public readonly data: Score,
  ) {}
}
