import { Module } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ScraperController } from './scraper.controller';

@Module({
  imports: [
    // Other modules can be imported here if needed
  ],
  controllers: [ScraperController],
  providers: [ScraperService],
  exports: [ScraperService], // Export the service if it needs to be used outside this module
})
export class ScraperModule {}
