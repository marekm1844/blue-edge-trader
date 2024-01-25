import { IEvent } from '@nestjs/cqrs';

export class DailyMedianFinishedEvent implements IEvent {
  constructor(public readonly data: any) {}
}
