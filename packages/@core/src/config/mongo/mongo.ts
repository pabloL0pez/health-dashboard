import { connect, connection, Mongoose } from 'mongoose';
import { Singleton } from '../../utils/singleton';
import { MongoEventType } from './types';

const SingletonMongo = Singleton<MongoClient>();

export class MongoClient extends SingletonMongo {
  private readonly uri: string | undefined;
  private _client: Mongoose | undefined;

  constructor() {
    super();
    this.uri = process.env.MONGO_URI;
  }

  public async connect() {
    if (this._client) {
      return this._client;
    }

    if (!this.uri) {
      throw new Error('MongoDB URI is not defined');
    }

    try {
      this._client = await connect(this.uri, { bufferCommands: false, serverSelectionTimeoutMS: 5000 });

      return this._client;
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  }

  public on(eventName: MongoEventType, callback: () => void) {
    connection.on(eventName, callback);
  }

  public get client() {
    return this._client;
  }
}