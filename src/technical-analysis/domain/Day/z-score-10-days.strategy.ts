import { Score } from '../../ema.model';
import { ICalculation } from '../calculation.interface';

export class ZScore10DaysStrategy implements ICalculation {
  public result: Score;
  private inputScores: Score[];

  constructor(private scores: Score[]) {
    if (scores.length < 10) {
      throw new Error('Need 10 days of articles to calculate 10 Day Z-Score');
    }
    this.inputScores = scores;
  }

  calculate(): void {
    throw new Error('Method not implemented.');
  }
}
