import { IEvent } from '@nestjs/cqrs';

export class DailySummaryFinishedEvent implements IEvent {
  constructor(
    public readonly symbol: string,
    public readonly date: Date,
    public readonly summary: string[],
    public readonly comment: string,
  ) {}
}
