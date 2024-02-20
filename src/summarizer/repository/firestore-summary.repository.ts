import { Injectable, Logger } from '@nestjs/common';
import { ISummaryRepository } from './summary.interface';
import { FirestoreClient } from './firestore.client';
import { NewsWithArticleAndSummary } from 'src/scraper/news.type';
import { randomUUID } from 'crypto';
import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';
import { startOfDay, addDays, endOfDay, format, parse } from 'date-fns';

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

  async getArticlesForDay(
    dateStr: string,
    symbol: string,
  ): Promise<NewsWithArticleAndSummary[]> {
    this.getCollection();

    const date = parse(dateStr, 'yyyyMMdd', new Date());
    const start = format(startOfDay(date), 'yyyyMMdd');
    const end = format(addDays(endOfDay(date), 1), 'yyyyMMdd');

    const snapshot = await this.collection
      .where('symbol', '==', symbol)
      .where('date', '>=', start)
      .where('date', '<=', end)
      .get();

    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      // Extract only the required fields
      const { title, articleSummary, comment, sentiment, scores } = data;
      return {
        title,
        articleSummary,
        comment,
        sentiment,
        scores,
      } as NewsWithArticleAndSummary; // Type casting for clarity
    });
  }
}
