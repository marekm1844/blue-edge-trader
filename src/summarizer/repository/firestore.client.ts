import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as firebaseAdmin from 'firebase-admin';

@Injectable()
export class FirestoreClient implements OnModuleInit {
  private _firestore: firebaseAdmin.firestore.Firestore;

  constructor(private readonly configService: ConfigService) {
    this.initializeFirebase();
    this._firestore = firebaseAdmin.firestore();
  }

  onModuleInit() {
    Logger.log(JSON.stringify(firebaseAdmin.apps.length));
  }

  private initializeFirebase() {
    Logger.log('Initializing Firebase...');
    const adminConfig = {
      projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
      privateKey: this.configService
        .get<string>('FIREBASE_PRIVATE_KEY')
        .replace(/\\n/g, '\n'),
      clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
    };

    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(adminConfig),
    });
  }

  get firestore(): firebaseAdmin.firestore.Firestore {
    return this._firestore;
  }
}
