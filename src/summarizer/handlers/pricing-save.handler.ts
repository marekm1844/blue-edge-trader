import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PricingSaveCommand } from '../commands/pricing-save.command';
import { Inject } from '@nestjs/common';
import { IPricingRepository } from '../repository/pricing.interface';

@CommandHandler(PricingSaveCommand)
export class PricingSaveCommandHandler
  implements ICommandHandler<PricingSaveCommand>
{
  constructor(
    @Inject('IPricingRepository')
    private readonly pricingRepository: IPricingRepository,
  ) {}

  async execute(command: PricingSaveCommand): Promise<void> {
    await this.pricingRepository.save(command.pricing);
  }
}
