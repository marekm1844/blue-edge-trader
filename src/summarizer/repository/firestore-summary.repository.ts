import { Inject, Injectable, Logger } from '@nestjs/common';
import { ISummaryRepository } from './summary.interface';
import { FirestoreClient } from './firestore.client';
import { NewsWithArticleAndSummary } from 'src/scraper/news.type';
import { randomUUID } from 'crypto';
import * as moment from 'moment';

@Injectable()
export class FirestoreSummaryRepository implements ISummaryRepository {
  private readonly collection;
  constructor(
    private firestoreClient: FirestoreClient,
    @Inject('FIREBASE_SUMMARY_COLLECTION')
    private readonly collectionName: string,
  ) {
    Logger.log(`FirestoreSummaryRepository: ${collectionName}`);
    this.collection = firestoreClient.firestore.collection(collectionName);
  }

  async save(summary: NewsWithArticleAndSummary) {
    const date = moment(summary.date.trim(), 'YYYYMMDD hh:mmA').toDate();
    const dateWithoutSpaces = date.toISOString();
    await this.collection
      .doc(dateWithoutSpaces + '|' + summary.symbol + '|' + randomUUID())
      .set(summary, { merge: true });
  }

  async getLatestSavedSummary(
    symbol: string,
  ): Promise<NewsWithArticleAndSummary> {
    const snapshot = await this.collection
      .where('symbol', '==', symbol)
      .orderBy('date', 'desc')
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return doc.data() as NewsWithArticleAndSummary;
  }
}
