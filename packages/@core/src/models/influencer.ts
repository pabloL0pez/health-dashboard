import { Schema, model } from 'mongoose';
import { ClaimSchema } from 'models/claim';
import { InfluencerDAO } from 'types/influencerDAO';

export const InfluencerSchema = new Schema<InfluencerDAO>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  bio: { type: String, required: true },
  rank: { type: Number, required: true },
  instagramUser: { type: String, default: null },
  twitterUser: { type: String, default: null },
  claims: { type: [ClaimSchema], default: [], _id: false },
  image: { type: Buffer, default: null },
});

export const InfluencerModel = model<InfluencerDAO>('Influencer', InfluencerSchema);