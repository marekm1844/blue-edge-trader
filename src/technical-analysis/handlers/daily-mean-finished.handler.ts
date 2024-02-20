import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { FirestoreDailyTechnicalRepository } from '../repository/daily-technical.repository';
import { CalculationContainer } from '../domain/calculation-container.service';
import { add } from 'date-fns';
import { Ema5DaysStrategy } from '../domain/Day/ema-5-days.strategy';
import { CalculationResult } from '../ema.model';
import { ZScore10DaysStrategy } from '../domain/Day/z-score-10-days.strategy';
import { DailyMeanFinishedEvent } from '../events/daily-mean-finished.event';

@EventsHandler(DailyMeanFinishedEvent)
export class DailyMeanFinishedHandler
  implements IEventHandler<DailyMeanFinishedEvent>
{
  constructor(private readonly dailyRepo: FirestoreDailyTechnicalRepository) {}
  async handle(event: DailyMeanFinishedEvent): Promise<void> {
    const calculationContainer = new CalculationContainer();
    // INFO: Need to add 1 day becuuse the datetime is like YYYY-MM-DDT00:00:00.000Z and we need to include the current day
    const toDate = add(event.data.date, { days: 1 });
    //const fromDate = sub(event.data.date, { days: 8 });
    try {
      const fiveDaysData = await this.dailyRepo.getScoresForLastXDaysWithData(
        event.symbol,
        10,
        toDate,
      );

      //Since when updating firebase we are not getting the score from updated day it is coming from event data that was calculated
      const eventCalculationResult: CalculationResult = {
        type: 'MeanScore',
        result: event.data,
      };

      fiveDaysData.push(eventCalculationResult);

      Logger.debug(
        `Dayes data: ${JSON.stringify(
          fiveDaysData
            .filter((data) => data.type === 'MeanScore')
            .map((data) => data.result.date),
        )}`,
      );

      calculationContainer.add(
        new Ema5DaysStrategy(
          fiveDaysData
            .filter((data) => data.type === 'MeanScore')
            .slice(-5)
            .map((data) => data.result),
        ),
      );
      calculationContainer.add(
        new ZScore10DaysStrategy(
          eventCalculationResult.result,
          fiveDaysData
            .filter((data) => data.type === 'MeanScore')
            .map((data) => data.result),
        ),
      );

      calculationContainer.executeCalculations();
      const scores = calculationContainer.getResults();
      scores.push(eventCalculationResult);

      Logger.debug(
        `[DailyMeanFinishedEvent] Scores: ${JSON.stringify(scores)}`,
      );
      await this.dailyRepo.saveCalculationResults(event.symbol, scores);
    } catch (error) {
      Logger.error(`[DailyMeanFinishedEvent] Error: ${error}`);
    }
    Logger.log(`Daily median calculation finished for symbol: ${event.symbol}`);
  }
}
