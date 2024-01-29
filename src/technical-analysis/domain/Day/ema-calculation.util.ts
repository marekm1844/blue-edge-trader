import { ScoreValues } from '../../ema.model';

export class EmaCalculation {
  /**
   * Calculates the EMA scores for a given array of scores
   * @param daily median scores
   * @param days number of days to calculate the EMA for
   * @returns EMA scores
   */
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
      return acc;
    }, initialScores);

    //round each value from the totalScores object to 1 decimal place
    Object.keys(totalScores).forEach((key) => {
      totalScores[key] = Math.round(totalScores[key] * 10) / 10;
    });

    return totalScores;
  }
}
