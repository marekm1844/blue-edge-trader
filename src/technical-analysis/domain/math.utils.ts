export class MathUtils {
  static calculateMean(scores: number[]): number {
    return scores.reduce((acc, score) => acc + score, 0) / scores.length;
  }

  static calculateStandardDeviation(scores: number[], mean: number): number {
    const variance =
      scores.reduce((acc, score) => acc + Math.pow(score - mean, 2), 0) /
      scores.length;
    return Math.sqrt(variance);
  }
}
