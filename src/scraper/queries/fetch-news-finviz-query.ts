import { Logger } from '@nestjs/common';

export class FetchNewsFinvizQuery {
  constructor(
    public readonly symbol: string,
    public readonly fromDateTime: string | null,
  ) {
    Logger.debug(`FetchNewsFinvizQuery: ${symbol} ${fromDateTime}`);
  }
}
