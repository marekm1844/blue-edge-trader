export class FetchPricingQuery {
  constructor(
    public readonly symbol: string,
    public readonly country,
  ) {}
}
