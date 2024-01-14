import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SummarizeArticleSaveVectorCommand } from '../commands/summarize-save-vector.comand';
import { CosmosVectorRepository } from '../repository/cosmos-vector.repository';

@CommandHandler(SummarizeArticleSaveVectorCommand)
export class SummarizeArticleSaveVectorHandler
  implements ICommandHandler<SummarizeArticleSaveVectorCommand>
{
  constructor(
    private readonly cosmosVectorRepository: CosmosVectorRepository,
  ) {}

  async execute(command: SummarizeArticleSaveVectorCommand): Promise<void> {
    const { innerText: _innerText, ...summary } = command.summary;
    const summaryString = JSON.stringify(summary);
    await this.cosmosVectorRepository.insertDocuments(
      summaryString,
      summary.link,
      summary.date,
      summary.symbol,
    );
  }
}
