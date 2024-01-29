import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatAnthropic } from '@langchain/anthropic';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { ZodType } from 'zod';
import { NewsSummarySchema } from './article-summary.schema';
import { CLOUDE_SUMMARY_PROMPT } from './prompts';
import { BasePromptValue } from 'langchain/schema';
import ISummaryService from './summary-service.interface';

@Injectable()
export class CloudeSummaryService implements ISummaryService {
  private readonly ai: ChatAnthropic;
  private readonly parser: StructuredOutputParser<ZodType>;

  constructor(private configService: ConfigService) {
    this.ai = new ChatAnthropic({
      temperature: 0.2,
      anthropicApiKey: this.configService.get<string>('ANTHROPIC_API_KEY'),
      modelName: 'claude-2.1',
      maxTokens: 2000,
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
      Logger.error(`[CloudeSummaryService] Error parsing output: ${error}`);
      throw error;
    }

    return NewsSummarySchema.parse(parsedOutput);
  }

  async generateJsonSummary(
    articleText: string,
    articleSource: string,
  ): Promise<(typeof NewsSummarySchema)['_type']> {
    const formatInstructions = this.parser.getFormatInstructions();
    CLOUDE_SUMMARY_PROMPT.partialVariables = { formatInstructions };

    const finalPrompt = await CLOUDE_SUMMARY_PROMPT.format({
      newsStory: articleText,
      articleSource: articleSource,
    });

    Logger.debug(`Final prompt: ${finalPrompt}`);
    const response = await this.ai.invoke(['system', finalPrompt]);
    const output = await this.pareseOutput(response.content.toString());

    Logger.log(`Generated summary: ${JSON.stringify(output)}`);
    return output;
  }
}
