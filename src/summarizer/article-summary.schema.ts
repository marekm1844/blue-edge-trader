import { z } from 'zod';

export const NewsSummarySchema = z.object({
  sentiment: z.enum(['positive', 'negative', 'neutral']),
  articleSummary: z
    .array(
      z
        .string()
        .describe(
          'Summary point that will proovide specific arguments for the sentiment',
        ),
    )
    .min(3, 'At least 3 summary points required')
    .max(5, 'At most 5 summary points allowed'),
});
