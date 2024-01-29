import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DailyMedianFinishedEvent } from '../events/daily-median-finished.event';
import { Logger } from '@nestjs/common';
import { FirestoreDailyTechnicalRepository } from '../repository/daily-technical.repository';
import { CalculationContainer } from '../domain/calculation-container.service';
import { add, sub } from 'date-fns';
import { Ema5DaysStrategy } from '../domain/Day/ema-5-days.strategy';
import { CalculationResult } from '../ema.model';

@EventsHandler(DailyMedianFinishedEvent)
export class DailyMedianFinishedHandler
  implements IEventHandler<DailyMedianFinishedEvent>
{
  constructor(private readonly dailyRepo: FirestoreDailyTechnicalRepository) {}
  async handle(event: DailyMedianFinishedEvent): Promise<void> {
    const calculationContainer = new CalculationContainer();
    // INFO: Need to add 1 day becuuse the datetime is like YYYY-MM-DDT00:00:00.000Z and we need to include the current day
    const toDate = add(event.data.date, { days: 1 });
    const fromDate = sub(event.data.date, { days: 3 });
    try {
      const fiveDaysData = await this.dailyRepo.getScoresForDateRange(
        event.symbol,
        fromDate,
        toDate,
      );

      //Since when updating firebase we are not getting the score from updated day it is coming from event data that was calculated
      const eventCalculationResult: CalculationResult = {
        type: 'MedianScore',
        result: event.data,
      };

      fiveDaysData.push(eventCalculationResult);

      calculationContainer.add(
        new Ema5DaysStrategy(
          fiveDaysData
            .filter((data) => data.type === 'MedianScore')
            .map((data) => data.result),
        ),
      );

      calculationContainer.executeCalculations();
      const scores = calculationContainer.getResults();

      Logger.debug(
        `[DailyMedianFinishedHandler] Scores: ${JSON.stringify(scores)}`,
      );
      await this.dailyRepo.saveCalculationResults(event.symbol, scores);
    } catch (error) {
      Logger.error(`[DailyMedianFinishedHandler] Error: ${error}`);
    }
    Logger.log(`Daily median calculation finished for symbol: ${event.symbol}`);
  }
}
