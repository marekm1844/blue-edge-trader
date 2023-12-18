import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SummarizeArticleSaveCommand } from '../commands/summarize-save.command';
import { ISummaryRepository } from '../repository/summary.interface';
import { Inject } from '@nestjs/common';

@CommandHandler(SummarizeArticleSaveCommand)
export class SummarizeArticleSaveCommandHandler
  implements ICommandHandler<SummarizeArticleSaveCommand>
{
  constructor(
    @Inject('ISummaryRepository')
    private readonly summaryRepository: ISummaryRepository,
  ) {}

  async execute(command: SummarizeArticleSaveCommand): Promise<void> {
    await this.summaryRepository.save(command.summary);
  }
}
