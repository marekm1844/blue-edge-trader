import { PricingData } from '../../scraper/netflix-pricing.schema';

export interface IPricingRepository {
  save(pricing: PricingData[]): Promise<void>;
}
