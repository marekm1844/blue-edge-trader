import { Injectable } from '@nestjs/common';
import { DailyStatistics, ScoreValues } from '../ema.model';
import { NewsWithArticleAndSummary } from 'src/scraper/news.type';

@Injectable()
export class StatsCalculationService {
  public calculateDailyStatistics(
    articles: NewsWithArticleAndSummary[],
  ): DailyStatistics {
    const scoresArray: ScoreValues[] = articles.map((article) => ({
      overallSentimentScore: article.scores.overallSentimentScore ?? 0,
      relevance: article.scores.relevance ?? 0,
      pricing: article.scores.pricing ?? 0,
      subscribers: article.scores.subscribers ?? 0,
      competition: article.scores.competition ?? 0,
      costs: article.scores.costs ?? 0,
      quality: article.scores.quality ?? 0,
    }));

    // Calculate average scores
    const averageScores = this.calculateAverageScores(scoresArray);

    // Calculate median scores
    const medianScores = this.calculateMedianScores(scoresArray);

    return { averageScores, medianScores };
  }

  private calculateAverageScores(scoresArray: ScoreValues[]): ScoreValues {
    const initialScores: ScoreValues = {
      overallSentimentScore: 0,
      relevance: 0,
      pricing: 0,
      subscribers: 0,
      competition: 0,
      costs: 0,
      quality: 0,
    };

    const totalScores = scoresArray.reduce<ScoreValues>((acc, scores) => {
      acc.overallSentimentScore += scores.overallSentimentScore;
      acc.relevance += scores.relevance;
      acc.pricing += scores.pricing;
      acc.subscribers += scores.subscribers;
      acc.competition += scores.competition;
      acc.costs += scores.costs;
      acc.quality += scores.quality;
      return acc;
    }, initialScores);

    const numberOfArticles = scoresArray.length;
    return {
      overallSentimentScore:
        totalScores.overallSentimentScore / numberOfArticles,
      relevance: totalScores.relevance / numberOfArticles,
      pricing: totalScores.pricing / numberOfArticles,
      subscribers: totalScores.subscribers / numberOfArticles,
      competition: totalScores.competition / numberOfArticles,
      costs: totalScores.costs / numberOfArticles,
      quality: totalScores.quality / numberOfArticles,
    };
  }

  private calculateMedianScores(scoresArray: ScoreValues[]): ScoreValues {
    const median = (arr: number[]) => {
      const mid = Math.floor(arr.length / 2);
      const nums = [...arr].sort((a, b) => a - b);
      return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };

    return {
      overallSentimentScore: median(
        scoresArray.map((s) => s.overallSentimentScore),
      ),
      relevance: median(scoresArray.map((s) => s.relevance)),
      pricing: median(scoresArray.map((s) => s.pricing)),
      subscribers: median(scoresArray.map((s) => s.subscribers)),
      competition: median(scoresArray.map((s) => s.competition)),
      costs: median(scoresArray.map((s) => s.costs)),
      quality: median(scoresArray.map((s) => s.quality)),
    };
  }
}
