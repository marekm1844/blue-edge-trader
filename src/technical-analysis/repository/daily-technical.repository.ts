import { Inject, Injectable } from '@nestjs/common';
import { FirestoreClient } from '../../summarizer/repository/firestore.client';
import { CalculationResult } from '../ema.model';
import { format } from 'date-fns';

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
      calculationName: result.type,
      scores: result.result.scores,
    }));

    await this.collection.doc(docId).set({ ...data }, { merge: true });
  }
}
