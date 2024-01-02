import { z } from 'zod';

interface Price {
  currency: string;
  amount: string;
}

export interface NetflixPlan {
  plan: string;
  price: Price;
}

export interface PricingData {
  pricing: NetflixPlan[];
  country: string;
  date: Date;
  symbol: string;
}

const PriceSchema = z.object({
  currency: z.string(),
  amount: z.string(),
});

const NetflixPlanSchema = z.object({
  plan: z.string(),
  price: PriceSchema,
});

export const NetflixDataSchema = z.object({
  pricing: z.array(NetflixPlanSchema),
  country: z.string(),
  date: z.date(),
  symbol: z.string(),
});
