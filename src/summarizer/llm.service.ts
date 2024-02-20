import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
  OutputFixingParser,
  StructuredOutputParser,
} from 'langchain/output_parsers';
import { ZodType } from 'zod';
import {
  DailySummarySchema,
  NewsSummarySchema,
} from './article-summary.schema';
import { ROLLUP_PROMPT, SUMMARY_PROMPT } from './prompts';
import { SystemMessage } from 'langchain/schema';
import ISummaryService from './summary-service.interface';
import { NewsWithArticleAndSummary } from '../scraper/news.type';

@Injectable()
export class GptSummaryService implements ISummaryService {
  private readonly openAI: ChatOpenAI;
  private parser: StructuredOutputParser<ZodType>;

  constructor(private configService: ConfigService) {
    this.openAI = new ChatOpenAI({
      temperature: 0.2,
      openAIApiKey: this.configService.get<string>('OPENAI_API_KEY'),
      modelName: 'gpt-4-1106-preview',
    });

    this.parser = StructuredOutputParser.fromZodSchema(NewsSummarySchema);
  }

  private async pareseOutput(
    output: string,
  ): Promise<(typeof NewsSummarySchema)['_type']> {
    let parsedOutput;
    try {
      parsedOutput = await this.parser.parse(output);
    } catch (error) {
      const fixParser = OutputFixingParser.fromLLM(this.openAI, this.parser);
      parsedOutput = await fixParser.parse(output);
    }

    return NewsSummarySchema.parse(parsedOutput);
  }

  private async parseDailySummaryOutput(
    output: string,
  ): Promise<(typeof DailySummarySchema)['_type']> {
    let parsedOutput;
    try {
      parsedOutput = await this.parser.parse(output);
    } catch (error) {
      const fixParser = OutputFixingParser.fromLLM(this.openAI, this.parser);
      parsedOutput = await fixParser.parse(output);
    }

    return DailySummarySchema.parse(parsedOutput);
  }

  async generateJsonSummary(
    articleText: string,
    articleSource: string,
  ): Promise<(typeof NewsSummarySchema)['_type']> {
    this.parser = StructuredOutputParser.fromZodSchema(NewsSummarySchema);

    const formatInstructions = this.parser.getFormatInstructions();
    SUMMARY_PROMPT.partialVariables = { formatInstructions };

    const finalPrompt = await SUMMARY_PROMPT.format({
      newsStory: articleText,
      articleSource: articleSource,
    });

    const response = await this.openAI.call([new SystemMessage(finalPrompt)]);
    const output = await this.pareseOutput(response.content.toString());

    Logger.log(`Generated summary: ${JSON.stringify(output)}`);
    return output;
  }

  async generateDailySummary(
    summaries: NewsWithArticleAndSummary[],
  ): Promise<(typeof DailySummarySchema)['_type']> {
    this.parser = StructuredOutputParser.fromZodSchema(DailySummarySchema);

    const formatInstructions = this.parser.getFormatInstructions();
    ROLLUP_PROMPT.partialVariables = { formatInstructions };

    const summaryString = summaries
      .map((summary) => {
        const { title, articleSummary, comment, sentiment, scores } = summary;
        return `Title: ${title}\n Summary: ${articleSummary}\n Comment: ${comment}\n Sentiment: ${sentiment} \n Scores: ${JSON.stringify(
          scores,
        )}`;
      })
      .join('\n ----------- \n');

    const finalPrompt = await ROLLUP_PROMPT.format({
      newsStory: summaryString,
    });

    Logger.debug(`${this.constructor.name} Final prompt: ${finalPrompt}`);

    const response = await this.openAI.call([new SystemMessage(finalPrompt)]);

    const output = await this.parseDailySummaryOutput(
      response.content.toString(),
    );

    Logger.log(`Generated daily summary: ${JSON.stringify(output)}`);
    return output;
  }
}
