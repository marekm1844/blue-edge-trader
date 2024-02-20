import { IEvent } from '@nestjs/cqrs';

export class CreateDailySummary implements IEvent {
  constructor(
    public readonly symbol: string,
    public readonly date: Date,
  ) {}
}
