import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateDailyRollupCommand } from '../commands/create-daily-rollup.command';
import { FirestoreTechnicalAnalysisRepository } from '../repository/firestore-technical.repository';
import { CalculationContainer } from '../domain/calculation-container.service';
import { parse } from 'date-fns';
import { Logger } from '@nestjs/common';
import { FirestoreDailyTechnicalRepository } from '../repository/daily-technical.repository';
import { MeanScore } from '../domain/mean-score-article.strategy';
import { DailyMeanFinishedEvent } from '../events/daily-mean-finished.event';
import { CreateDailySummary } from '../events/create-daily-summary.event';

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

      calculationContainer.add(new MeanScore(dailyData, utcDate));
    } catch (error) {
      console.error('Error fetching data from specific date:', error);
      throw error;
    }

    calculationContainer.executeCalculations();
    const scores = calculationContainer.getResults();

    if (
      scores.some((result) => isNaN(result.result.scores.overallSentimentScore))
    ) {
      return;
    }
    try {
      await this.dailyRepo.saveCalculationResults(command.input.symbol, scores);
      const event = new DailyMeanFinishedEvent(
        command.input.symbol,
        scores.find((result) => result.type === 'MeanScore').result,
      );

      Logger.debug(
        `[CreateDailyRollupHandler] Event: ${JSON.stringify(event)}`,
      );
      this.eventBus.publish(event);
      this.eventBus.publish(
        new CreateDailySummary(command.input.symbol, event.data.date),
      );
    } catch (err) {
      Logger.error(
        `[CreateDailyRollupHandler] Error saving scores: ${err.message}`,
        err.stack,
        `[${command.input.symbol}]`,
      );
    }
  }
}
