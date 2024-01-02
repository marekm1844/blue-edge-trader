import { Inject, Injectable, Logger } from '@nestjs/common';
import { FirestoreClient } from './firestore.client';
import { randomUUID } from 'crypto';
import { IPricingRepository } from './pricing.interface';
import { PricingData } from 'src/scraper/netflix-pricing.schema';

@Injectable()
export class FirestorePricingRepository implements IPricingRepository {
  private readonly collection;
  constructor(
    private firestoreClient: FirestoreClient,
    @Inject('FIREBASE_PRICING_COLLECTION')
    private readonly collectionName: string,
  ) {
    Logger.log(`FirestoreSummaryRepository: ${collectionName}`);
    this.collection = firestoreClient.firestore.collection(collectionName);
  }

  async save(pricing: PricingData[]) {
    const filteredPricing = pricing.filter((p) => p !== undefined);
    const dateWithoutSpaces = filteredPricing[0].date.toISOString();
    const pricingData = {
      pricingArray: filteredPricing, // Encapsulate the array in an object
      createdAt: new Date(), // Optionally, add other relevant fields
    };
    await this.collection
      .doc(
        dateWithoutSpaces +
          '|' +
          filteredPricing[0].symbol +
          '|' +
          randomUUID(),
      )
      .set(pricingData, { merge: true });
  }
}
