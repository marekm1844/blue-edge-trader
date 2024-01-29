import { NewsSummarySchema } from './article-summary.schema';

interface ISummaryService {
  generateJsonSummary(
    articleText: string,
    articleSource: string,
  ): Promise<(typeof NewsSummarySchema)['_type']>;
  // Add other public methods of GptSummaryService here
}

export default ISummaryService;
