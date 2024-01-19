import { ScoreValues } from '../../ema.model';

export class EmaCalculation {
  static calculateEmaScores(
    scoresArray: ScoreValues[],
    days: number,
  ): ScoreValues {
    const initialScores: ScoreValues = {
      overallSentimentScore: 0,
      relevance: 0,
      pricing: 0,
      subscribers: 0,
      competition: 0,
      costs: 0,
      quality: 0,
    };
    const smoothingFactor = 2 / (days + 1);
    const totalScores = scoresArray.reduce<ScoreValues>((acc, scores) => {
      acc.overallSentimentScore =
        scores.overallSentimentScore * smoothingFactor +
        acc.overallSentimentScore * (1 - smoothingFactor);
      acc.relevance =
        scores.relevance * smoothingFactor +
        acc.relevance * (1 - smoothingFactor);
      acc.pricing =
        scores.pricing * smoothingFactor + acc.pricing * (1 - smoothingFactor);
      acc.subscribers =
        scores.subscribers * smoothingFactor +
        acc.subscribers * (1 - smoothingFactor);
      acc.competition =
        scores.competition * smoothingFactor +
        acc.competition * (1 - smoothingFactor);
      acc.costs =
        scores.costs * smoothingFactor + acc.costs * (1 - smoothingFactor);
      acc.quality =
        scores.quality * smoothingFactor + acc.quality * (1 - smoothingFactor);
      return acc;
    }, initialScores);

    return totalScores;
  }
}
