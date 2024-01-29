import { max } from 'date-fns/max';
import { EmaCalculation } from './ema-calculation.util';
import { Score } from '../../ema.model';
import { ICalculation } from '../calculation.interface';

export class Ema5DaysStrategy implements ICalculation {
  public result: Score;
  private inputScores: Score[];

  /**
   *
   * @param scores 5 days of scores
   */
  constructor(private scores: Score[]) {
    if (scores.length < 5) {
      throw new Error('Need 5 days of articles to calculate EMA');
    }
    this.inputScores = scores;
  }

  calculate(): void {
    //check if there are 5 days of articles and get newest date from articles
    if (!this.scores) {
      throw new Error('Need 5 days of articles to calculate EMA');
    }
    const filteredScores = this.inputScores.filter(
      (score) => !isNaN(score.scores.overallSentimentScore),
    );
    const dates = filteredScores.map((score) => score.date);
    const latestDate = max(dates);
    const fiveDayEmaScores = EmaCalculation.calculateEmaScores(
      filteredScores.map((score) => score.scores),
      5,
    );

    this.result = {
      date: latestDate,
      scores: fiveDayEmaScores,
    };
  }
}
