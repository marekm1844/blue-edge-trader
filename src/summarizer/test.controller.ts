import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { CosmosVectorRepository } from '../summarizer/repository/cosmos-vector.repository';
import { FirestoreSummaryRepository } from './repository/firestore-summary.repository';
import { GptSummaryService } from './llm.service';

@Controller('cosmos-test')
export class CosmosTestController {
  constructor(
    private cosmosVectorRepository: CosmosVectorRepository,
    private summaryRepo: FirestoreSummaryRepository,
    private gptSummaryService: GptSummaryService,
  ) {}

  @Get('test-connection')
  async testConnection() {
    const isConnected = await this.cosmosVectorRepository.testConnection();
    return { isConnected };
  }

  @Get('create-index')
  async createIndex() {
    const isCreated = await this.cosmosVectorRepository.createIndex();
    return { isCreated };
  }

  @Post('search')
  async search(@Body() body: { query: string }) {
    const result = await this.cosmosVectorRepository.similaritySearch(
      body.query,
    );
    return { result };
  }

  @Get('day-artcles')
  async getDayArticles(
    @Query('date') date: string,
    @Query('symbol') symbol: string,
  ) {
    const articles = await this.summaryRepo.getArticlesForDay(date, symbol);
    return await this.gptSummaryService.generateDailySummary(articles);
  }
}
