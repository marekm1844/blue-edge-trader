export type ScoreValues = {
  overallSentimentScore: number;
  relevance: number;
  pricing: number;
  subscribers: number;
  competition: number;
  costs: number;
  quality?: number;
};

export type DailyStatistics = {
  averageScores: ScoreValues;
  medianScores: ScoreValues;
};

export type Score = {
  date: Date; // The date for which this score is calculated
  scores: ScoreValues; // EMA scores averaged over 5 days
};

export type CalculationResult = {
  type: string;
  result: Score;
};
