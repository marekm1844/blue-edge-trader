import { YoutubeTranscript } from 'youtube-transcript';
import { IScraper } from './scraper.interface';

export class FetchYoutubeTranscriptService implements IScraper {
  async scrapeArticle(url: string): Promise<string> {
    const transcriptResponse = await YoutubeTranscript.fetchTranscript(url);
    const transcript = transcriptResponse.map((t) => t.text).join(' ');
    return transcript;
  }
}
