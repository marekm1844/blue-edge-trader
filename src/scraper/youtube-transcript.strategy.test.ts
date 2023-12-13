import { FetchYoutubeTranscriptService } from './youtube-transcript.strategy';
import { YoutubeTranscript } from 'youtube-transcript';

jest.mock('youtube-transcript', () => {
  return {
    YoutubeTranscript: {
      fetchTranscript: jest.fn(),
    },
  };
});

describe('FetchYoutubeTranscriptService', () => {
  let service: FetchYoutubeTranscriptService;

  beforeEach(() => {
    service = new FetchYoutubeTranscriptService();
  });

  it('should scrape and return the transcript for a given YouTube URL', async () => {
    const mockUrl = 'youtube.com/testVideo';
    const mockTranscript = [{ text: 'Hello' }, { text: 'world' }];

    (YoutubeTranscript.fetchTranscript as jest.Mock).mockResolvedValue(
      mockTranscript,
    );

    const expectedTranscript = 'Hello world';
    const result = await service.scrapeArticle(mockUrl);

    expect(result).toBe(expectedTranscript);
    expect(YoutubeTranscript.fetchTranscript).toHaveBeenCalledWith(mockUrl);
  });
});
