import { z } from 'zod';

const ScoresSchema = z.object({
  overallSentiment: z.number().min(0).max(10), // assuming scores are from 0 to 10
  relevance: z.number().min(0).max(10),
  pricing: z.number().min(0).max(10),
  subscribers: z.number().min(0).max(10),
  competition: z.number().min(0).max(10),
  weight: z
    .number()
    .min(1)
    .max(2)
    .describe(
      'When the article comment comes directly from company weight is 2 when its from journalist make it 1 ',
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
    .max(5, 'At most 5 summary points allowed'),
  comment: z.string(),
  scores: ScoresSchema,
});
