import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateDailyRollupCommand } from '../commands/create-daily-rollup.command';
import { FirestoreTechnicalAnalysisRepository } from '../repository/firestore-technical.repository';
import { CalculationContainer } from '../domain/calculation-container.service';
import { parse } from 'date-fns';
import { MedianScore } from '../domain/median-score-article.strategy';
import { Logger } from '@nestjs/common';
import { FirestoreDailyTechnicalRepository } from '../repository/daily-technical.repository';

@CommandHandler(CreateDailyRollupCommand)
export class CreateDailyRollupHandler
  implements ICommandHandler<CreateDailyRollupCommand>
{
  constructor(
    private readonly techRepo: FirestoreTechnicalAnalysisRepository,
    private readonly dailyRepo: FirestoreDailyTechnicalRepository,
  ) {}
  async execute(command: CreateDailyRollupCommand): Promise<void> {
    const calculationContainer = new CalculationContainer();
    try {
      const dailyData = await this.techRepo.getScoresForDate(
        command.input.date,
        command.input.symbol,
      );

      const date = parse(command.input.date, 'yyyyMMdd', new Date());
      Logger.log(`Calculating median score for ${date}`);

      calculationContainer.add(new MedianScore(dailyData, date));
    } catch (error) {
      console.error('Error fetching data from specific date:', error);
      throw error;
    }

    calculationContainer.executeCalculations();
    const scores = calculationContainer.getResults();
    await this.dailyRepo.saveCalculationResults(command.input.symbol, scores);
    Logger.log(`Scores: ${JSON.stringify(scores)}`);
  }
}
