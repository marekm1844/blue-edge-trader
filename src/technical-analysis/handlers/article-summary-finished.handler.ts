import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ArticleSummaryFinishedEvent } from '../../summarizer/events/article-summary-finished.event';
import { FirestoreTechnicalAnalysisRepository } from '../repository/firestore-technical.repository';
import { CalculationContainer } from '../domain/calculation-container.service';
import { FirestoreDailyTechnicalRepository } from '../repository/daily-technical.repository';
import { Logger } from '@nestjs/common';
import { ZScore10DaysStrategy } from '../domain/Day/z-score-10-days.strategy';

@EventsHandler(ArticleSummaryFinishedEvent)
export class ArticleSummaryFinishedHandler
  implements IEventHandler<ArticleSummaryFinishedEvent>
{
  constructor(
    private readonly articleRepo: FirestoreTechnicalAnalysisRepository,
    private readonly dailyRepo: FirestoreDailyTechnicalRepository,
  ) {}

  async handle(event: ArticleSummaryFinishedEvent) {
    const calculationContainer = new CalculationContainer();

    const toDate = event.data.date;

    try {
      const tenDaysData = await this.dailyRepo.getScoresForLastXDaysWithData(
        event.symbol,
        10,
        toDate,
      );

      Logger.debug(
        `[ArticleSummaryFinishedHandler] Day data: ${JSON.stringify(
          tenDaysData
            .filter((data) => data.type === 'MedianScore')
            .map((data) => data.result.date),
        )}`,
      );

      calculationContainer.add(
        new ZScore10DaysStrategy(
          event.data,
          tenDaysData
            .filter((data) => data.type === 'MedianScore')
            .flatMap((data) => data.result),
        ),
      );

      calculationContainer.executeCalculations();

      this.articleRepo.updateFieldInArticlesById(
        event.documentId,
        '10DaysZScore',
        calculationContainer
          .getResults()
          .reduce((acc, result) => ({ ...acc, ...result.result.scores }), {}),
      );
    } catch (error) {
      Logger.error(`Error getting 10 days data: ${error.message}`);
    }
  }
}
