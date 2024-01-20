import { NewsWithArticleAndSummary } from 'src/scraper/news.type';
import { Score, ScoreValues } from '../ema.model';
import { ICalculation } from './calculation.interface';
import { MathUtils } from './math.utils';

export class ZScore10DaysArticle implements ICalculation {
  public result: Score;
  private scoresArray: ScoreValues[];
  private date: Date;
  private currentScores: ScoreValues;

  constructor(
    currentArticle: NewsWithArticleAndSummary,
    pastArticles: NewsWithArticleAndSummary[],
  ) {
    this.scoresArray = pastArticles.map((article) => ({
      overallSentimentScore: article.scores.overallSentimentScore ?? 0,
      relevance: article.scores.relevance ?? 0,
      pricing: article.scores.pricing ?? 0,
      subscribers: article.scores.subscribers ?? 0,
      competition: article.scores.competition ?? 0,
      costs: article.scores.costs ?? 0,
      quality: article.scores.quality ?? 0,
    }));
    this.date = new Date(currentArticle.date);
    this.currentScores = {
      overallSentimentScore: currentArticle.scores.overallSentimentScore ?? 0,
      relevance: currentArticle.scores.relevance ?? 0,
      pricing: currentArticle.scores.pricing ?? 0,
      subscribers: currentArticle.scores.subscribers ?? 0,
      competition: currentArticle.scores.competition ?? 0,
      costs: currentArticle.scores.costs ?? 0,
      quality: currentArticle.scores.quality ?? 0,
    };
  }

  calculate(): void {
    this.result = {
      date: this.date,
      scores: {
        overallSentimentScore: this.calculateZScore(
          this.currentScores.overallSentimentScore,
          this.scoresArray.map((scores) => scores.overallSentimentScore),
        ),
        relevance: this.calculateZScore(
          this.currentScores.relevance,
          this.scoresArray.map((scores) => scores.relevance),
        ),
        pricing: this.calculateZScore(
          this.currentScores.pricing,
          this.scoresArray.map((scores) => scores.pricing),
        ),
        subscribers: this.calculateZScore(
          this.currentScores.subscribers,
          this.scoresArray.map((scores) => scores.subscribers),
        ),
        competition: this.calculateZScore(
          this.currentScores.competition,
          this.scoresArray.map((scores) => scores.competition),
        ),
        costs: this.calculateZScore(
          this.currentScores.costs,
          this.scoresArray.map((scores) => scores.costs),
        ),
        quality: this.calculateZScore(
          this.currentScores.quality,
          this.scoresArray.map((scores) => scores.quality),
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
