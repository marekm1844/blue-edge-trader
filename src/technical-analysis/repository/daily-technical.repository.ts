import { Inject, Injectable, Logger } from '@nestjs/common';
import { FirestoreClient } from '../../summarizer/repository/firestore.client';
import { CalculationResult, ScoreValues } from '../ema.model';
import { format, parse } from 'date-fns';

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

  async getScoresForDateRange(
    symbol: string,
    from: Date,
    to: Date,
  ): Promise<CalculationResult[]> {
    Logger.debug(
      `Getting scores for ${symbol} from ${parseInt(
        format(from, 'yyyyMMdd'),
      )} to ${parseInt(format(to, 'yyyyMMdd'))}`,
    );
    const snapshot = await this.collection
      .where('symbol', '==', symbol)
      .where('date', '>=', parseInt(format(from, 'yyyyMMdd')))
      .where('date', '<', parseInt(format(to, 'yyyyMMdd')))
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
}
