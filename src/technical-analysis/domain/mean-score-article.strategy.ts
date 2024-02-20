import { Logger } from '@nestjs/common';
import { Score, ScoreValues } from '../ema.model';
import { ICalculation } from './calculation.interface';

export class MeanScore implements ICalculation {
  public result: Score;
  private scoresArray: ScoreValues[];
  private date: Date;

  constructor(scoresArray: ScoreValues[], date: Date) {
    this.scoresArray = scoresArray;
    this.date = date;
  }

  /**
   * Calculate the mean score of the given scores
   * Mean score is weighted by quaility and overallSentimentScore
   */
  calculate(): void {
    this.result = {
      date: this.date,
      scores: {
        overallSentimentScore: this.weightedMean(
          this.scoresArray,
          'overallSentimentScore',
        ),
        relevance: this.weightedMean(this.scoresArray, 'relevance'),
        pricing: this.weightedMean(this.scoresArray, 'pricing'),
        subscribers: this.weightedMean(this.scoresArray, 'subscribers'),
        competition: this.weightedMean(this.scoresArray, 'competition'),
        costs: this.weightedMean(this.scoresArray, 'costs'),
      },
    };
    Logger.debug(`Mean score: ${JSON.stringify(this.result)}`);
  }

  private weightedMean(
    scores: ScoreValues[],
    scoreType: keyof ScoreValues,
  ): number {
    let weightedProductSum = 0;
    let weightsSum = 0;

    scores.forEach((score) => {
      const weightProduct = score.quality * (score.overallSentimentScore || 5); // Assuming a default sentiment value of 5 if not provided
      weightedProductSum += score[scoreType] * weightProduct;
      weightsSum += weightProduct;
    });

    const mean = weightedProductSum / weightsSum;
    return parseFloat(mean.toFixed(1));
  }
}
