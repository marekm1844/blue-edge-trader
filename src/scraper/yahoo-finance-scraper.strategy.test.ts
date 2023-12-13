// Trims leading and trailing whitespace from the returned text content.
import { YahooFinanceScraperService } from './yahoo-finance-scraper.strategy';

describe('scrapeArticle', () => {
  it('should trim leading and trailing whitespace from the returned text content', async () => {
    // Arrange
    const url = 'https://example.yahoo.com/article';
    const expectedText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: jest
        .fn()
        .mockResolvedValue(
          '<html><body><div class="caas-body">  ' +
            expectedText +
            '  </div></body></html>',
        ),
    });

    const scraper = new YahooFinanceScraperService();

    // Act
    const result = await scraper.scrapeArticle(url);

    // Assert
    expect(result).toBe(expectedText);
  });
  // Handles URLs with non-200 response codes by throwing an error.
  it('should handle URLs with non-200 response codes by throwing an error', async () => {
    // Arrange
    const url = 'https://example.yahoo.com/article';
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
    });

    const scraper = new YahooFinanceScraperService();

    // Act and Assert
    await expect(scraper.scrapeArticle(url)).rejects.toThrow(
      'Error fetching article: Not Found',
    );
  });
  // Handles URLs that are not valid by throwing an error.
  // Handles URLs that are not valid by throwing an error.
  it('should handle URLs that are not valid by throwing an error', async () => {
    // Arrange
    const url = 'https://example.com/article';
    const scraper = new YahooFinanceScraperService();

    // Act and Assert
    await expect(scraper.scrapeArticle(url)).rejects.toThrow(
      'Invalid URL. Only Yahoo URLs are allowed.',
    );
  });

  // Handles URLs that do not return HTML by throwing an error.
  it('should handle URLs that do not return HTML by throwing an error', async () => {
    // Arrange
    const url = 'https://finance.yahoo.com/article';
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: jest.fn().mockResolvedValue('Not HTML'),
    });

    const scraper = new YahooFinanceScraperService();

    // Act and Assert
    await expect(scraper.scrapeArticle(url)).rejects.toThrow(
      'Error fetching article inner text: Missing article body',
    );
  });

  // Handles URLs that return HTML without a body tag by throwing an error.
  it('should handle URLs that return HTML without a body tag by throwing an error', async () => {
    // Arrange
    const url = 'https://yahoo.com/article';
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: jest
        .fn()
        .mockResolvedValue(
          '<html><head></head><div class="caas-body"></div></html>',
        ),
    });

    const scraper = new YahooFinanceScraperService();

    // Act and Assert
    try {
      await scraper.scrapeArticle(url);
      fail('Expected an error to be thrown');
    } catch (error) {
      // Assert
      expect(error.message).toBe(
        'Error fetching article inner text: Missing article body',
      );
    }
  });
});
