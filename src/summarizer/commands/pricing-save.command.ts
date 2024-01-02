import { PricingData } from '../../scraper/netflix-pricing.schema';

export class PricingSaveCommand {
  constructor(public readonly pricing: PricingData[]) {}
}
