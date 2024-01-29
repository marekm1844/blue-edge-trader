import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateDailyRollupCommand } from '../commands/create-daily-rollup.command';
import { FirestoreTechnicalAnalysisRepository } from '../repository/firestore-technical.repository';
import { CalculationContainer } from '../domain/calculation-container.service';
import { parse } from 'date-fns';
import { MedianScore } from '../domain/median-score-article.strategy';
import { Logger } from '@nestjs/common';
import { FirestoreDailyTechnicalRepository } from '../repository/daily-technical.repository';
import { DailyMedianFinishedEvent } from '../events/daily-median-finished.event';

@CommandHandler(CreateDailyRollupCommand)
export class CreateDailyRollupHandler
  implements ICommandHandler<CreateDailyRollupCommand>
{
  constructor(
    private readonly techRepo: FirestoreTechnicalAnalysisRepository,
    private readonly dailyRepo: FirestoreDailyTechnicalRepository,
    private readonly eventBus: EventBus,
  ) {}
  async execute(command: CreateDailyRollupCommand): Promise<void> {
    const calculationContainer = new CalculationContainer();
    try {
      const dailyData = await this.techRepo.getScoresForDate(
        command.input.date,
        command.input.symbol,
      );

      const date = parse(command.input.date, 'yyyyMMdd', new Date());
      // Get the time zone offset in minutes, then convert it to milliseconds
      const timeZoneOffset = date.getTimezoneOffset() * 60000;
      const utcDate = new Date(date.getTime() - timeZoneOffset);

      calculationContainer.add(new MedianScore(dailyData, utcDate));
    } catch (error) {
      console.error('Error fetching data from specific date:', error);
      throw error;
    }

    calculationContainer.executeCalculations();
    const scores = calculationContainer.getResults();

    try {
      await this.dailyRepo.saveCalculationResults(command.input.symbol, scores);
      const event = new DailyMedianFinishedEvent(
        command.input.symbol,
        scores.find((result) => result.type === 'MedianScore').result,
      );

      Logger.debug(
        `[CreateDailyRollupHandler] Event: ${JSON.stringify(event)}`,
      );
      this.eventBus.publish(event);
    } catch (err) {
      Logger.error(
        `[CreateDailyRollupHandler] Error saving scores: ${err.message}`,
        err.stack,
        `[${command.input.symbol}]`,
      );
    }
  }
}
