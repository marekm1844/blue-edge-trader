import { Inject, Injectable, Logger } from '@nestjs/common';
import { FirestoreClient } from '../../summarizer/repository/firestore.client';
import { CalculationResult, ScoreValues } from '../ema.model';
import { format, parse, subDays } from 'date-fns';

@Injectable()
export class FirestoreDailyTechnicalRepository {
  private readonly collection;

  constructor(
    private readonly firestoreClient: FirestoreClient,
    @Inject('FIREBASE_DAILY_COLLECTION')
    private readonly collectionName: string,
  ) {
    this.collection = firestoreClient.firestore.collection(collectionName);
  }

  async saveCalculationResults(
    symbol: string,
    results: CalculationResult[],
  ): Promise<void> {
    const docId = `${format(results[0].result.date, 'yyyyMMdd')}:${symbol}`;
    const data = results.map((result) => ({
      symbol: symbol,
      date: parseInt(format(result.result.date, 'yyyyMMdd')),
      type: results.reduce(
        (acc, result) => {
          acc[result.type] = result.result.scores;
          return acc;
        },
        {} as Record<string, ScoreValues>,
      ),
    }));

    await this.collection.doc(docId).set(...data, { merge: true });
  }

  private formatDate(date: Date): number {
    return parseInt(format(date, 'yyyyMMdd'));
  }

  async getScoresForDateRange(
    symbol: string,
    from: Date,
    to: Date,
  ): Promise<CalculationResult[]> {
    Logger.debug(
      `Getting scores for ${symbol} from ${this.formatDate(
        from,
      )} to ${this.formatDate(to)}`,
    );
    const snapshot = await this.collection
      .where('symbol', '==', symbol)
      .where('date', '>=', this.formatDate(from))
      .where('date', '<', this.formatDate(to))
      .get();

    if (snapshot.empty) {
      return [];
    }

    // Process each document to structure it as CalculationResult[]
    return snapshot.docs.flatMap((doc) => {
      const data = doc.data();
      const date = parse(data.date.toString(), 'yyyyMMdd', new Date());
      return Object.entries(data.type).map(([type, scores]) => ({
        type,
        result: {
          date,
          scores: scores as ScoreValues,
        },
      }));
    });
  }

  // Main function to get scores within the last X days with data
  async getScoresForLastXDaysWithData(
    symbol: string,
    days: number,
    to: Date = new Date(),
  ): Promise<CalculationResult[]> {
    let from = subDays(to, days - 1); // Start date adjusted to get the desired number of days
    let foundDays = 0; // Counter for found days with data
    let attempts = 0; // Counter to avoid infinite loops

    while (foundDays < days && attempts < 365) {
      // Safeguard with max attempts
      const snapshot = await this.collection
        .where('symbol', '==', symbol)
        .where('date', '>=', this.formatDate(from))
        .where('date', '<=', this.formatDate(to))
        .orderBy('date', 'desc')
        .get();

      if (!snapshot.empty) {
        // Count unique days with data
        const uniqueDates = new Set(
          snapshot.docs.map((doc) => doc.data().date),
        );
        foundDays += uniqueDates.size;
        Logger.debug(`Found list of dates: ${Array.from(uniqueDates)}`);

        if (foundDays < days) {
          // Adjust 'from' date backward by the deficit in days plus one to avoid recounting the last found day
          from = subDays(from, days - foundDays + 1);
        }
      } else {
        // If no data found, extend the search period by 'days' more
        from = subDays(from, days);
      }

      attempts++;
    }

    // Once we have identified the range, perform the final query
    if (foundDays >= days) {
      const finalSnapshot = await this.collection
        .where('symbol', '==', symbol)
        .where('date', '>=', this.formatDate(from))
        .where('date', '<=', this.formatDate(to))
        .orderBy('date', 'desc')
        .get();

      if (!finalSnapshot.empty) {
        // Process and return the final data set
        return finalSnapshot.docs.flatMap((doc) => {
          const data = doc.data();
          const date = parse(data.date.toString(), 'yyyyMMdd', new Date());
          return Object.entries(data.type).map(([type, scores]) => ({
            type,
            result: {
              date,
              scores: scores as ScoreValues,
            },
          }));
        });
      }
    }

    Logger.debug('Unable to find enough data within the last year.');
    return [];
  }
}
