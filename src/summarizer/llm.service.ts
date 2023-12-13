import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
  OutputFixingParser,
  StructuredOutputParser,
} from 'langchain/output_parsers';
import { ZodType } from 'zod';
import { NewsSummarySchema } from './article-summary.schema';
import { SUMMARY_PROMPT } from './prompts';
import { SystemMessage } from 'langchain/schema';

@Injectable()
export class GptSummaryService {
  private readonly openAI: ChatOpenAI;
  private readonly parser: StructuredOutputParser<ZodType>;

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

  async generateJsonSummary(
    articleText: string,
  ): Promise<(typeof NewsSummarySchema)['_type']> {
    const formatInstructions = this.parser.getFormatInstructions();
    SUMMARY_PROMPT.partialVariables = { formatInstructions };

    const finalPrompt = await SUMMARY_PROMPT.format({
      newsStory: articleText,
    });

    const response = await this.openAI.call([new SystemMessage(finalPrompt)]);
    const output = await this.pareseOutput(response.content.toString());

    Logger.log(`Generated summary: ${JSON.stringify(output)}`);
    return output;
  }
}
