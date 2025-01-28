import { Schema, model } from 'mongoose';

export interface InfluencerDAO {
  name: string;
  rank: number;
  instagramUser?: string;
  twitterUser?: string;
}

const InfluencerSchema = new Schema<InfluencerDAO>({
  name: { type: String, require: true },
  rank: { type: Number, require: true },
  instagramUser: { type: Number, default: null },
  twitterUser: { type: Number, default: null },
});

export const InfluencerModel = model<InfluencerDAO>('Influencer', InfluencerSchema);