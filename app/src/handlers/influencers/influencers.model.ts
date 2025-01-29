import { Schema, model } from 'mongoose';
import { InfluencerDAO } from './types';

const InfluencerSchema = new Schema<InfluencerDAO>({
  id: { type: String, require: true },
  name: { type: String, require: true },
  rank: { type: Number, require: true },
  instagramUser: { type: String, default: null },
  twitterUser: { type: String, default: null },
});

export const InfluencerModel = model<InfluencerDAO>('Influencer', InfluencerSchema);