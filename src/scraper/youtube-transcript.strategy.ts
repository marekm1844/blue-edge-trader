import { YoutubeTranscript } from 'youtube-transcript';
import { IScraper } from './scraper.interface';
import { Logger } from '@nestjs/common';

export class FetchYoutubeTranscriptService implements IScraper {
  async scrapeArticle(url: string): Promise<string> {
    try {
      const transcriptResponse = await YoutubeTranscript.fetchTranscript(url);
      const transcript = transcriptResponse.map((t) => t.text).join(' ');
      return transcript;
    } catch (err) {
      Logger.error(
        `[FetchYoutubeTranscriptService] Error fetching transcript for url: ${url} with error: [${err}]`,
      );
      return 'Cannot fetch transcript';
    }
  }
}
