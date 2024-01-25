import { z } from 'zod';

const ScoresSchema = z.object({
  overallSentimentScore: z.number().min(1).max(10), // assuming scores are from 0 to 10
  relevance: z.number().min(1).max(10),
  pricing: z.number().min(1).max(10),
  subscribers: z.number().min(1).max(10),
  competition: z.number().min(1).max(10),
  costs: z.number().min(1).max(10),
  quality: z
    .number()
    .min(1)
    .max(5)
    .describe(
      `1) Company announcement = 5
       2) Comments from management, for example at a conference = 4 
       3) Comments from an investment bank broker report = 3 
       4) high quality global journalism like the Wall St Journal or Financial Times = 2     
       5) other news articles (eg Zacks, ZeroHedge, Benzinga) = 1`,
    ),
});

export const NewsSummarySchema = z.object({
  sentiment: z.enum(['positive', 'negative', 'neutral']),
  articleSummary: z
    .array(
      z
        .string()
        .describe(
          'Summary point that will provide specific data for the sentiment',
        ),
    )
    .min(3, 'At least 3 summary points required')
    .describe('At least 3 summary points required')
    .max(5, 'At most 10 summary points allowed')
    .describe('At most 10 summary points allowed'),
  comment: z.string(),
  scores: ScoresSchema,
});
