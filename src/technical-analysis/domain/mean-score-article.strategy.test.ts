import { MeanScore } from './mean-score-article.strategy';
import { ScoreValues } from '../ema.model'; // Adjust the import paths according to your project structure

describe('MeanScore', () => {
  it('should correctly calculate weighted mean scores based on provided data', () => {
    // Mock data setup
    const scoresArray: ScoreValues[] = [
      {
        competition: 5,
        costs: 5,
        overallSentimentScore: 5,
        pricing: 5,
        quality: 1,
        relevance: 5,
        subscribers: 5,
      },
      {
        competition: 5,
        costs: 5,
        overallSentimentScore: 3,
        pricing: 5,
        quality: 1,
        relevance: 8,
        subscribers: 5,
      },
      {
        competition: 5,
        costs: 5,
        overallSentimentScore: 5,
        pricing: 5,
        quality: 2,
        relevance: 5,
        subscribers: 5,
      },
      {
        competition: 7,
        costs: 5,
        overallSentimentScore: 9,
        pricing: 8,
        quality: 2,
        relevance: 9,
        subscribers: 9,
      },
      {
        competition: 5,
        costs: 5,
        overallSentimentScore: 5,
        pricing: 5,
        quality: 2,
        relevance: 2,
        subscribers: 5,
      },
      {
        competition: 5,
        costs: 5,
        overallSentimentScore: 7,
        pricing: 5,
        quality: 2,
        relevance: 5,
        subscribers: 6,
      },
      {
        competition: 5,
        costs: 5,
        overallSentimentScore: 5,
        pricing: 5,
        quality: 2,
        relevance: 5,
        subscribers: 5,
      },
      {
        competition: 3,
        costs: 5,
        overallSentimentScore: 5,
        pricing: 5,
        quality: 2,
        relevance: 5,
        subscribers: 5,
      },
    ];
    const expectedDate = new Date(); // Use a specific date as needed

    // Instantiate MeanScore with the mock data
    const meanScore = new MeanScore(scoresArray, expectedDate);

    // Perform calculation
    meanScore.calculate();

    // Assertions
    const result = meanScore.result;
    expect(result).toBeDefined();
    expect(result.date).toEqual(expectedDate);

    // Asserting the mean calculations, rounded to one decimal place
    // Note: These expected values need to be calculated based on your formula and inserted here
    expect(result.scores.competition).toBeCloseTo(5.2, 1);
    expect(result.scores.costs).toBeCloseTo(5.0, 1);
    expect(result.scores.overallSentimentScore).toBeCloseTo(6.2, 1);
    expect(result.scores.pricing).toBeCloseTo(5.7, 1); // Assuming 'price' is referred to as 'pricing' in your model
    expect(result.scores.relevance).toBeCloseTo(5.6, 1);
    expect(result.scores.subscribers).toBeCloseTo(6.1, 1); // Assuming 'subscriptions' is referred to as 'subscribers'
    // Note: Add any additional score types as necessary
  });
});
