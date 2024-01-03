import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AlphaVantageService {
  private baseUrl: string;
  private apiKey: string;

  constructor(private configService: ConfigService) {
    this.baseUrl = 'https://www.alphavantage.co/query?';
    this.apiKey = this.configService.get<string>('ALPHA_VANTAGE_API_KEY');
  }

  async fetchData(params: string) {
    const url = `${this.baseUrl}${params}&apikey=${this.apiKey}`;
    try {
      const response = await fetch(url);
      return response.text();
    } catch (error) {
      console.error('Error fetching data from Alpha Vantage:', error);
      throw error;
    }
  }
}
