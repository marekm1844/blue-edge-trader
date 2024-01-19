import { Score } from '../ema.model';

export interface ICalculation {
  result: Score;
  calculate(): void;
}
