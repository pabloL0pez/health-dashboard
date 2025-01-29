import { Schema, model } from 'mongoose';
import { MongoDocument } from '../../layers/repository/data-access/mongo.repository';

export interface InfluencerDAO extends MongoDocument {
  name: string;
  rank: number;
  instagramUser?: string;
  twitterUser?: string;
}

const InfluencerSchema = new Schema<InfluencerDAO>({
  id: { type: String, require: true },
  name: { type: String, require: true },
  rank: { type: Number, require: true },
  instagramUser: { type: String, default: null },
  twitterUser: { type: String, default: null },
});

export const InfluencerModel = model<InfluencerDAO>('Influencer', InfluencerSchema);