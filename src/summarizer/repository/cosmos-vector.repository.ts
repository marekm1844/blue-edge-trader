import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import { OpenAIEmbeddings } from '@langchain/openai';
import {
  AzureCosmosDBVectorStore,
  AzureCosmosDBSimilarityType,
} from '@langchain/community/vectorstores/azure_cosmosdb';
import { ConfigService } from '@nestjs/config';
import { Document } from 'langchain/document';

@Injectable()
export class CosmosVectorRepository implements OnModuleDestroy {
  private readonly dbClient: MongoClient;
  private readonly db: Db;
  private readonly vectorStore: AzureCosmosDBVectorStore;
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPENAI_API_KEY');
    const connectionString = this.configService.get<string>(
      'AZURE_COSMOSDB_CONNECTION_STRING',
    );
    if (!connectionString) {
      throw new Error('Connection string for Azure Cosmos DB is not defined');
    }
    this.dbClient = new MongoClient(connectionString);

    this.vectorStore = new AzureCosmosDBVectorStore(
      new OpenAIEmbeddings({ openAIApiKey: this.apiKey }),
      {
        client: this.dbClient,
        databaseName: 'NewsFeed', // Replace with your Cosmos DB database name
        collectionName: 'Stage1Summary', // Replace with your collection name
      },
    );
  }
  onModuleDestroy() {
    this.vectorStore.close();
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.dbClient.connect();
      const dbs = await this.dbClient.db().admin().listDatabases();
      Logger.debug(`Databases: ${JSON.stringify(dbs)}`);
      await this.dbClient.close();
      return true;
    } catch (error) {
      Logger.error(`Failed to connect to Azure Cosmos DB: ${error}`);
      return false;
    }
  }

  async createIndex(): Promise<boolean> {
    const numLists = 100;
    const dimensions = 1536;
    const similarity = AzureCosmosDBSimilarityType.COS;

    if (await this.vectorStore.checkIndexExists()) return true;

    try {
      await this.vectorStore.createIndex(numLists, dimensions, similarity);
      return true;
    } catch (err) {
      Logger.error(`Failed to create index: ${err}`);
      return false;
    }
  }

  async insertDocuments(
    document: string,
    source: string,
    date: string,
    symbol: string,
  ): Promise<boolean> {
    try {
      const doc = new Document({
        pageContent: document,
        metadata: { source, date, symbol },
      });

      await this.vectorStore.addDocuments([doc]);
      return true;
    } catch (err) {
      Logger.error(`Failed to insert documents: ${err}`);
      return false;
    }
  }

  async similaritySearch(question: string): Promise<string> {
    const docs = await this.vectorStore.similaritySearch(question);
    return docs[0].pageContent;
  }
  private async generateEmbedding(texts: string[]): Promise<any> {
    const embedder = new OpenAIEmbeddings({ openAIApiKey: this.apiKey });
    return embedder.embedDocuments(texts);
  }
}
