import { Injectable, Logger } from '@nestjs/common';
import { ISummaryRepository } from './summary.interface';
import { FirestoreClient } from './firestore.client';
import { NewsWithArticleAndSummary } from 'src/scraper/news.type';
import { randomUUID } from 'crypto';
import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirestoreSummaryRepository implements ISummaryRepository {
  private collection = null;
  constructor(
    private firestoreClient: FirestoreClient,
    private configService: ConfigService,
  ) {}

  private getCollection() {
    const modelType = this.configService.get<string>('SUMMARY_MODEL');
    Logger.debug(`Model type: ${modelType}`);
    if (modelType === 'CLOUDE') {
      if (
        this.collection?.name !==
        this.configService.get<string>('FIREBASE_SUMMARY_CLOUDE_COLLECTION')
      ) {
        this.collection = this.firestoreClient.firestore.collection(
          this.configService.get<string>('FIREBASE_SUMMARY_CLOUDE_COLLECTION'),
        );
      }
    } else {
      if (
        this.collection?.name !==
        this.configService.get<string>('FIREBASE_SUMMARY_COLLECTION')
      ) {
        this.collection = this.firestoreClient.firestore.collection(
          this.configService.get<string>('FIREBASE_SUMMARY_COLLECTION'),
        );
      }
    }
  }

  async save(summary: NewsWithArticleAndSummary): Promise<string> {
    this.getCollection();
    const date = moment(summary.date.trim(), 'YYYYMMDD hh:mmA').toDate();
    const dateWithoutSpaces = date.toISOString();
    const documentId =
      dateWithoutSpaces + '|' + summary.symbol + '|' + randomUUID();
    await this.collection.doc(documentId).set(summary, { merge: true });

    return documentId;
  }

  async getLatestSavedSummary(
    symbol: string,
  ): Promise<NewsWithArticleAndSummary> {
    this.getCollection();
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
