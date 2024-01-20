import { NewsWithArticleAndSummary } from '../../scraper/news.type';
import { Score, ScoreValues } from '../ema.model';
import { ICalculation } from './calculation.interface';

export class MedianScore implements ICalculation {
  public result: Score;
  private scoresArray: ScoreValues[];
  private date: Date;

  constructor(articles: NewsWithArticleAndSummary[]) {
    this.scoresArray = articles.map((article) => ({
      overallSentimentScore: article.scores.overallSentimentScore ?? 0,
      relevance: article.scores.relevance ?? 0,
      pricing: article.scores.pricing ?? 0,
      subscribers: article.scores.subscribers ?? 0,
      competition: article.scores.competition ?? 0,
      costs: article.scores.costs ?? 0,
      quality: article.scores.quality ?? 0,
    }));
    this.date = new Date(articles[0].date);
  }

  calculate(): void {
    this.result = {
      date: this.date,
      scores: {
        overallSentimentScore: this.weightedMedian(
          this.scoresArray,
          'overallSentimentScore',
        ),
        relevance: this.weightedMedian(this.scoresArray, 'relevance'),
        pricing: this.weightedMedian(this.scoresArray, 'pricing'),
        subscribers: this.weightedMedian(this.scoresArray, 'subscribers'),
        competition: this.weightedMedian(this.scoresArray, 'competition'),
        costs: this.weightedMedian(this.scoresArray, 'costs'),
      },
    };
  }

  private weightedMedian(scores: ScoreValues[], scoreType: keyof ScoreValues) {
    const weightedScores = [];

    /**
     * For each score, it's duplicated a number of times equal to its quality score before calculating the median.
     */
    scores.forEach((score) => {
      for (let i = 0; i < score.quality; i++) {
        weightedScores.push(score[scoreType]);
      }
    });

    weightedScores.sort((a, b) => a - b);

    const mid = Math.floor(weightedScores.length / 2);

    return weightedScores.length % 2 !== 0
      ? weightedScores[mid]
      : (weightedScores[mid - 1] + weightedScores[mid]) / 2;
  }

  private median = (arr: number[]) => {
    const mid = Math.floor(arr.length / 2);
    const nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  };
}
