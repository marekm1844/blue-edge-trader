import { Test } from '@nestjs/testing';
import { EventBus } from '@nestjs/cqrs';
import { SummarizeArticleSaveCommandHandler } from './summarize-save.handler';
import { SummarizeArticleSaveCommand } from '../commands/summarize-save.command';
import { ISummaryRepository } from '../repository/summary.interface';
import { ArticleSummaryFinishedEvent } from '../events/article-summary-finished.event';

describe('SummarizeArticleSaveCommandHandler', () => {
  let handler: SummarizeArticleSaveCommandHandler;
  let mockSummaryRepository: Partial<ISummaryRepository>;
  let mockEventBus: Partial<EventBus>;

  beforeEach(async () => {
    // Setup mock implementations
    mockSummaryRepository = {
      save: jest.fn(),
    };
    mockEventBus = {
      publish: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        SummarizeArticleSaveCommandHandler,
        {
          provide: 'ISummaryRepository',
          useValue: mockSummaryRepository,
        },
        {
          provide: EventBus,
          useValue: mockEventBus,
        },
      ],
    }).compile();

    handler = moduleRef.get<SummarizeArticleSaveCommandHandler>(
      SummarizeArticleSaveCommandHandler,
    );
  });

  it('should save summary and publish ArticleSummaryFinishedEvent', async () => {
    const command = new SummarizeArticleSaveCommand({
      title: 'Test Article',
      link: 'https://example.com/test-article',
      source: 'Test Source',
      symbol: 'TEST2',
      date: '20230101 08:30PM',
      innerText: 'This is a test article.',
      sentiment: 'positive',
      articleSummary: ['This is a summary of the test article.'],
      scores: {
        overallSentimentScore: 0.75,
        relevance: 1,
        pricing: 0.5,
        subscribers: 0.8,
        competition: 0.6,
        costs: 0.9,
        quality: 0.95,
      },
    });

    await handler.execute(command);

    // Verify save was called with the summary
    expect(mockSummaryRepository.save).toHaveBeenCalledWith(command.summary);

    // Verify publish was called with the correct event and data
    expect(mockEventBus.publish).toHaveBeenCalledWith(
      expect.any(ArticleSummaryFinishedEvent),
    );

    // Print out the event that was published
    const publishedEvent = (mockEventBus.publish as jest.Mock).mock.calls[0][0]; // Access the first argument of the first call
    console.log('Published event:', publishedEvent);

    // Additional detailed assertions about the published event can go here
    // For example, you might want to check the event's symbol and score properties
    expect(publishedEvent.symbol).toBe(command.summary.symbol);
  });
});
