import { Logger } from '@nestjs/common';
import { Score } from '../../ema.model';
import { ICalculation } from '../calculation.interface';
import { MathUtils } from '../math.utils';

export class ZScore10DaysStrategy implements ICalculation {
  public result: Score;
  private inputScores: Score[];
  private currentScores: Score;

  constructor(currentScore: Score, scores: Score[]) {
    if (scores.length < 10) {
      throw new Error('Need 10 days of articles to calculate 10 Day Z-Score');
    }
    this.inputScores = scores;
    this.currentScores = currentScore;
    Logger.debug(
      `[ZScore10DaysStrategy] Current Score: ${JSON.stringify(currentScore)}`,
    );
    Logger.debug(
      `[ZScore10DaysStrategy] Past Scores: ${JSON.stringify(scores)}`,
    );
  }

  calculate(): void {
    this.result = {
      date: this.currentScores.date,
      scores: {
        overallSentimentScore: this.calculateZScore(
          this.currentScores.scores.overallSentimentScore,
          this.filterNullValues(
            this.inputScores.map((score) => score.scores.overallSentimentScore),
          ),
        ),
        relevance: this.calculateZScore(
          this.currentScores.scores.relevance,
          this.filterNullValues(
            this.inputScores.map((score) => score.scores.relevance),
          ),
        ),
        pricing: this.calculateZScore(
          this.currentScores.scores.pricing,
          this.filterNullValues(
            this.inputScores.map((score) => score.scores.pricing),
          ),
        ),
        subscribers: this.calculateZScore(
          this.currentScores.scores.subscribers,
          this.filterNullValues(
            this.inputScores.map((score) => score.scores.subscribers),
          ),
        ),
        competition: this.calculateZScore(
          this.currentScores.scores.competition,
          this.filterNullValues(
            this.inputScores.map((score) => score.scores.competition),
          ),
        ),
        costs: this.calculateZScore(
          this.currentScores.scores.costs,
          this.filterNullValues(
            this.inputScores.map((score) => score.scores.costs),
          ),
        ),
      },
    };
  }

  private filterNullValues(scores: number[]): number[] {
    return scores.filter((score) => score !== null && !isNaN(score));
  }

  private calculateZScore(currentScore: number, pastScores: number[]): number {
    const mean = MathUtils.calculateMean(pastScores);
    const stdDev = MathUtils.calculateStandardDeviation(pastScores, mean);
    Logger.debug(`[ZScore10DaysStrategy] Mean: ${mean}, StdDev: ${stdDev}`);
    const zScore = (currentScore - mean) / (stdDev || 1); // Avoid division by zero
    return Number(zScore.toFixed(2));
  }
}
