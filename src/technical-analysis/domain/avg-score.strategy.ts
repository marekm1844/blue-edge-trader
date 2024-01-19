import { NewsWithArticleAndSummary } from 'src/scraper/news.type';
import { Score, ScoreValues } from '../ema.model';
import { ICalculation } from './calculation.interface';

export class AverageScoreCalclation implements ICalculation {
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
    const initialScores: ScoreValues = {
      overallSentimentScore: 0,
      relevance: 0,
      pricing: 0,
      subscribers: 0,
      competition: 0,
      costs: 0,
      quality: 0,
    };

    const totalScores = this.scoresArray.reduce<ScoreValues>((acc, scores) => {
      acc.overallSentimentScore += scores.overallSentimentScore;
      acc.relevance += scores.relevance;
      acc.pricing += scores.pricing;
      acc.subscribers += scores.subscribers;
      acc.competition += scores.competition;
      acc.costs += scores.costs;
      acc.quality += scores.quality;
      return acc;
    }, initialScores);

    const numberOfArticles = this.scoresArray.length;
    this.result = {
      date: this.date,
      scores: {
        overallSentimentScore:
          totalScores.overallSentimentScore / numberOfArticles,
        relevance: totalScores.relevance / numberOfArticles,
        pricing: totalScores.pricing / numberOfArticles,
        subscribers: totalScores.subscribers / numberOfArticles,
        competition: totalScores.competition / numberOfArticles,
        costs: totalScores.costs / numberOfArticles,
        quality: totalScores.quality / numberOfArticles,
      },
    };
  }
}
