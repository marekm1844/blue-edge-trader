import { Body, Controller, Get, Post } from '@nestjs/common';
import { CosmosVectorRepository } from '../summarizer/repository/cosmos-vector.repository';

@Controller('cosmos-test')
export class CosmosTestController {
  constructor(private cosmosVectorRepository: CosmosVectorRepository) {}

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
}
