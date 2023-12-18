import { ScraperService } from './news-scraper.service';

describe('ScraperService', () => {
  // Successfully scrape news articles for a given stock symbol
  it('should successfully scrape news articles for a given stock symbol', async () => {
    // Arrange
    const symbol = 'AAPL';
    const expectedArticles = [
      {
        title: 'Article 1',
        link: 'https://example.com/article1',
        date: '20220103 10:00AM',
        source: 'Source 1',
      },
      {
        title: 'Article 2',
        link: 'https://example.com/article2',
        date: '20220103 11:00AM',
        source: 'Source 2',
      },
    ];
    const scraperService = new ScraperService();
    jest
      .spyOn(scraperService as any, 'getCurrentDate')
      .mockReturnValue('20220103');
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: jest
        .fn()
        .mockResolvedValue(
          '<html><body><table class="news-table">' +
            '<tr><td>Jan-03-22 10:00AM</td><td><a class="tab-link-news" href="https://example.com/article1">Article 1</a><span>Source 1</span></td></tr>' +
            '<tr><td>Today 11:00AM</td><td><a class="tab-link-news" href="https://example.com/article2">Article 2</a><span>Source 2</span></td></tr>' +
            '</table></body></html>',
        ),
    });

    // Act
    const result = await scraperService.scrape(symbol, null);

    // Assert
    expect(result).toEqual(expectedArticles);
  });
});
