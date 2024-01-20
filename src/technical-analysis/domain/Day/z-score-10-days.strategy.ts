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
  }

  calculate(): void {
    this.result = {
      date: this.currentScores.date,
      scores: {
        overallSentimentScore: this.calculateZScore(
          this.currentScores.scores.overallSentimentScore,
          this.inputScores.map((score) => score.scores.overallSentimentScore),
        ),
        relevance: this.calculateZScore(
          this.currentScores.scores.relevance,
          this.inputScores.map((score) => score.scores.relevance),
        ),
        pricing: this.calculateZScore(
          this.currentScores.scores.pricing,
          this.inputScores.map((score) => score.scores.pricing),
        ),
        subscribers: this.calculateZScore(
          this.currentScores.scores.subscribers,
          this.inputScores.map((score) => score.scores.subscribers),
        ),
        competition: this.calculateZScore(
          this.currentScores.scores.competition,
          this.inputScores.map((score) => score.scores.competition),
        ),
        costs: this.calculateZScore(
          this.currentScores.scores.costs,
          this.inputScores.map((score) => score.scores.costs),
        ),
      },
    };
  }

  private calculateZScore(currentScore: number, pastScores: number[]): number {
    const mean = MathUtils.calculateMean(pastScores);
    const stdDev = MathUtils.calculateStandardDeviation(pastScores, mean);
    return (currentScore - mean) / (stdDev || 1); // Avoid division by zero
  }
}
