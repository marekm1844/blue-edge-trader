import { Inject, Injectable, Logger } from '@nestjs/common';
import { NewsWithArticleAndSummary } from '../../scraper/news.type';
import { FirestoreClient } from '../../summarizer/repository/firestore.client';
import { startOfDay, endOfDay, parse, format, addDays } from 'date-fns';
import { ScoreValues } from '../ema.model';

@Injectable()
export class FirestoreTechnicalAnalysisRepository {
  private readonly collection;

  constructor(
    private readonly firestoreClient: FirestoreClient,
    @Inject('FIREBASE_SUMMARY_COLLECTION')
    private readonly collectionName: string,
  ) {
    this.collection = firestoreClient.firestore.collection(collectionName);
  }

  /**
   * Retrieves only documentId and scores for all summaries for a specific day.
   *
   * @param dateStr - The date for which to retrieve summaries in 'YYYY-MM-DD' format.
   * @returns An array of objects containing documentId and scores.
   */
  async getScoresForDate(
    dateStr: string,
    symbol: string,
  ): Promise<ScoreValues[]> {
    const date = parse(dateStr, 'yyyyMMdd', new Date());
    const start = format(startOfDay(date), 'yyyyMMdd');
    const end = format(addDays(endOfDay(date), 1), 'yyyyMMdd');

    Logger.debug(`Searching for summaries between ${start} and ${end}`);
    const snapshot = await this.collection
      .where('date', '>=', start)
      .where('date', '<', end)
      .where('symbol', '==', symbol)
      .get();

    if (snapshot.empty) {
      Logger.log(`No summaries found for date: ${dateStr}`);
      return [];
    }

    Logger.log(`Found ${snapshot.size} summaries for date: ${dateStr}`);
    return snapshot.docs.map((doc) => {
      const data = doc.data() as NewsWithArticleAndSummary;
      return {
        ...data.scores,
      };
    });
  }

  /**
   * Updates articles by adding or updating a specified field based on document IDs.
   *
   * @param documentIds -  document IDs to update.
   * @param fieldName - The name of the field to add or update.
   * @param fieldValue - The value to set for the field.
   */
  async updateFieldInArticlesById(
    documentIds: string,
    fieldName: string,
    fieldValue: any,
  ): Promise<void> {
    const docRef = this.collection.doc(documentIds);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      Logger.error(`Document with ID ${documentIds} not found`);
      throw new Error(`Document with ID ${documentIds} not found`);
    }

    const updateObject = { [fieldName]: fieldValue };
    await docRef.update(updateObject);
  }
}
