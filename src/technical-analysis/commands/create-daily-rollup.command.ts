import { ICommand } from '@nestjs/cqrs';
import { CreateDailyRollupDto } from '../dto/create-daily-rollup.dto';

export class CreateDailyRollupCommand implements ICommand {
  constructor(public readonly input: CreateDailyRollupDto) {}
}
