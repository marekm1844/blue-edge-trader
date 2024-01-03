import { IIndicator } from './indicator.interface';

export class RSIIndicator implements IIndicator {
  private symbol: string;
  private interval: string;
  private timePeriod: number;
  private seriesType: string;
  private month?: string;
  private dataType?: string = 'json';

  /**
   * Sets the symbol for the RSI indicator.
   * @param symbol The name of the ticker (e.g., 'IBM').
   * @returns RSIIndicator instance for chaining.
   */
  setSymbol(symbol: string): this {
    this.symbol = symbol;
    return this;
  }

  /**
   * Sets the interval between data points.
   * Supported values: '1min', '5min', '15min', '30min', '60min', 'daily', 'weekly', 'monthly'.
   * @param interval The interval string.
   * @returns RSIIndicator instance for chaining.
   */
  setInterval(interval: string): this {
    this.interval = interval;
    return this;
  }

  /**
   * Sets the time period for calculating RSI values.
   * @param timePeriod Number of data points (positive integer).
   * @returns RSIIndicator instance for chaining.
   */
  setTimePeriod(timePeriod: number): this {
    this.timePeriod = timePeriod;
    return this;
  }

  /**
   * Sets the series type (price type) for the RSI calculation.
   * Supported types: 'close', 'open', 'high', 'low'.
   * @param seriesType The series type string.
   * @returns RSIIndicator instance for chaining.
   */
  setSeriesType(seriesType: string): this {
    this.seriesType = seriesType;
    return this;
  }

  /**
   * Sets the month for intraday intervals.
   * Format: 'YYYY-MM'. Applicable for intraday intervals only.
   * @param month The month string.
   * @returns RSIIndicator instance for chaining.
   */
  setMonth(month: string): this {
    this.month = month;
    return this;
  }

  /**
   * Sets the data type for the response.
   * Default is 'json'. Supported types: 'json', 'csv'.
   * @param dataType The data type string.
   * @returns RSIIndicator instance for chaining.
   */
  setDataType(dataType: string): this {
    this.dataType = dataType;
    return this;
  }

  /**
   * Validates the configured parameters for the RSI indicator.
   * @returns True if the parameters are valid, otherwise false.
   */
  validateParams(): boolean {
    return (
      this.timePeriod > 0 &&
      this.symbol.length > 0 &&
      this.interval.length > 0 &&
      this.seriesType.length > 0
    );
  }

  /**
   * Constructs and returns the parameter string for the RSI request.
   * @returns The parameter string for RSI.
   */
  getParams(): string {
    if (this.validateParams()) {
      let params = `function=RSI&symbol=${this.symbol}&interval=${this.interval}&time_period=${this.timePeriod}&series_type=${this.seriesType}`;
      if (this.month) {
        params += `&month=${this.month}`;
      }
      if (this.dataType) {
        params += `&datatype=${this.dataType}`;
      }
      return params;
    } else {
      throw new Error('Invalid RSI parameters');
    }
  }
}
