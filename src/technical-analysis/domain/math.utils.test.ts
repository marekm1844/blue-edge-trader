// Generated by CodiumAI

import { MathUtils } from './math.utils';

describe('calculateMean', () => {
  // Returns the correct mean of an array of positive integers
  it('should return the correct mean of an array of positive integers', () => {
    const scores = [1, 2, 3, 4, 5];
    const mean = MathUtils.calculateMean(scores);
    expect(mean).toBe(3);
  });

  // Returns the correct mean of an array of negative integers
  it('should return the correct mean of an array of negative integers', () => {
    const scores = [-1, -2, -3, -4, -5];
    const mean = MathUtils.calculateMean(scores);
    expect(mean).toBe(-3);
  });

  // Returns the correct mean of an array of mixed positive and negative integers
  it('should return the correct mean of an array of mixed positive and negative integers', () => {
    const scores = [-1, 2, -3, 4, -5];
    const mean = MathUtils.calculateMean(scores);
    expect(mean).toBe(-0.6);
  });

  // Returns NaN when given an empty array
  it('should return NaN when given an empty array', () => {
    const scores: number[] = [];
    const mean = MathUtils.calculateMean(scores);
    expect(mean).toBe(NaN);
  });

  // Returns NaN when given an array with only NaN values
  it('should return NaN when given an array with only NaN values', () => {
    const scores = [NaN, NaN, NaN];
    const mean = MathUtils.calculateMean(scores);
    expect(mean).toBe(NaN);
  });

  // Returns Infinity when given an array with only Infinity values
  it('should return Infinity when given an array with only Infinity values', () => {
    const scores = [Infinity, Infinity, Infinity];
    const mean = MathUtils.calculateMean(scores);
    expect(mean).toBe(Infinity);
  });
});
