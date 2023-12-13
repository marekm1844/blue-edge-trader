import { Module } from '@nestjs/common';
import { ScraperModule } from './scraper/scraper.module';
import { ConfigModule } from '@nestjs/config';
import { SummarizerModule } from './summarizer/summarizer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    ScraperModule,
    SummarizerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
