import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetLatestSavedSummaryQuery } from '../queries/get-latest-saved-summary.query';
import { ISummaryRepository } from '../repository/summary.interface';
import { Inject } from '@nestjs/common';

@QueryHandler(GetLatestSavedSummaryQuery)
export class GetLatestSavedSummaryHandler
  implements IQueryHandler<GetLatestSavedSummaryQuery>
{
  constructor(
    @Inject('ISummaryRepository')
    private readonly summaryRepository: ISummaryRepository,
  ) {}

  async execute(query: GetLatestSavedSummaryQuery) {
    return this.summaryRepository.getLatestSavedSummary(query.symbol);
  }
}
