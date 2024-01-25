import { CalculationResult } from '../ema.model';
import { ICalculation } from './calculation.interface';

export class CalculationContainer {
  private calculations: ICalculation[] = [];

  add(calculation: ICalculation): void {
    this.calculations.push(calculation);
  }

  executeCalculations(): void {
    this.calculations.forEach((calculation) => calculation.calculate());
  }

  getResults(): CalculationResult[] {
    return this.calculations.map((calculation) => {
      return {
        type: calculation.constructor.name,
        result: calculation.result,
      };
    });
  }
}
