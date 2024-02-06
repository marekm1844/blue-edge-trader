import { ZScore10DaysStrategy } from './z-score-10-days.strategy';

describe('ZScore10DaysStrategy', () => {
  const inputScores = [
    {
      date: new Date('2024-01-18T23:00:00.000Z'),
      scores: {
        costs: 5,
        subscribers: 8,
        competition: 5,
        overallSentimentScore: 8,
        pricing: 7,
        relevance: 9,
      },
    },
    {
      date: new Date('2024-01-19T23:00:00.000Z'),
      scores: {
        costs: 5,
        subscribers: 8,
        competition: 5,
        overallSentimentScore: 8,
        pricing: 7,
        relevance: 6,
      },
    },
    {
      date: new Date('2024-01-20T23:00:00.000Z'),
      scores: {
        costs: 5,
        subscribers: 5,
        competition: 5,
        overallSentimentScore: 5,
        pricing: 5,
        relevance: 9,
      },
    },
    {
      date: new Date('2024-01-21T23:00:00.000Z'),
      scores: {
        costs: 5,
        subscribers: 8,
        competition: 5,
        overallSentimentScore: 8,
        pricing: 7,
        relevance: 9,
      },
    },
    {
      date: new Date('2024-01-22T23:00:00.000Z'),
      scores: {
        costs: null,
        subscribers: null,
        competition: null,
        overallSentimentScore: null,
        pricing: null,
        relevance: null,
      },
    },
    {
      date: new Date('2024-01-23T23:00:00.000Z'),
      scores: {
        costs: 5,
        subscribers: 10,
        competition: 7,
        overallSentimentScore: 9,
        pricing: 8,
        relevance: 9,
      },
    },
    {
      date: new Date('2024-01-24T23:00:00.000Z'),
      scores: {
        costs: 5,
        subscribers: 9,
        competition: 5,
        overallSentimentScore: 9,
        pricing: 8,
        relevance: 9,
      },
    },
    {
      date: new Date('2024-01-25T23:00:00.000Z'),
      scores: {
        costs: 5,
        subscribers: 9,
        competition: 6.5,
        overallSentimentScore: 8,
        pricing: 8,
        relevance: 9,
      },
    },
    {
      date: new Date('2024-01-26T23:00:00.000Z'),
      scores: {
        costs: 5,
        subscribers: 9,
        competition: 3.5,
        overallSentimentScore: 8,
        pricing: 7.5,
        relevance: 9,
      },
    },
    {
      date: new Date('2024-01-27T00:00:00.000Z'),
      scores: {
        overallSentimentScore: 8,
        relevance: 9,
        pricing: 7.5,
        subscribers: 9,
        competition: 3.5,
        costs: 5,
      },
    },
  ];

  it('should calculate the Z-Score correctly', () => {
    const currentScore = {
      date: new Date('2024-01-27T00:00:00.000Z'),
      scores: {
        overallSentimentScore: 1,
        relevance: 1,
        pricing: 1,
        subscribers: 1,
        competition: 1,
        costs: 1,
      },
    };
    const strategy = new ZScore10DaysStrategy(currentScore, inputScores);
    strategy.calculate();

    expect(strategy.result).toEqual({
      date: currentScore.date,
      scores: {
        overallSentimentScore: -6.26,
        relevance: -8.13,
        pricing: -7.03,
        subscribers: -5.5,
        competition: -3.72,
        costs: -4,
      },
    });
  });

  it('should throw an error if there are less than 10 input scores', () => {
    const currentScore = {
      date: new Date('2024-01-27T00:00:00.000Z'),
      scores: {
        overallSentimentScore: 8,
        relevance: 9,
        pricing: 7.5,
        subscribers: 9,
        competition: 3.5,
        costs: 5,
      },
    };
    const invalidInputScores = inputScores.slice(0, 5); // Less than 10 scores
    expect(
      () => new ZScore10DaysStrategy(currentScore, invalidInputScores),
    ).toThrow('Need 10 days of articles to calculate 10 Day Z-Score');
  });
});
