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
    const median = (arr: number[]) => {
      const mid = Math.floor(arr.length / 2);
      const nums = [...arr].sort((a, b) => a - b);
      return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };

    this.result = {
      date: this.date,
      scores: {
        overallSentimentScore: median(
          this.scoresArray.map((s) => s.overallSentimentScore),
        ),
        relevance: median(this.scoresArray.map((s) => s.relevance)),
        pricing: median(this.scoresArray.map((s) => s.pricing)),
        subscribers: median(this.scoresArray.map((s) => s.subscribers)),
        competition: median(this.scoresArray.map((s) => s.competition)),
        costs: median(this.scoresArray.map((s) => s.costs)),
        quality: median(this.scoresArray.map((s) => s.quality)),
      },
    };
  }
}
