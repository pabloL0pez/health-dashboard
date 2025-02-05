import { Schema, model } from 'mongoose';
import { InfluencerDAO } from './types';
import { ClaimSchema } from '../claims/claims.model';
import { AIProviderHandler, AIProviderModel } from '../types';

const AIProviderModelSchema = new Schema<AIProviderModel>({
  provider: { type: String, required: true },
  model: { type: String, required: true },
});

const AIProviderHandlerSchema = new Schema<AIProviderHandler>({
  influencers: { type: AIProviderModelSchema, default: null },
  claims: { type: AIProviderModelSchema, default: null },
});

const InfluencerSchema = new Schema<InfluencerDAO>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  bio: { type: String, required: true },
  rank: { type: Number, required: true },
  instagramUser: { type: String, default: null },
  twitterUser: { type: String, default: null },
  claims: { type: [ClaimSchema], default: [], _id: false },
  ai: { type: AIProviderHandlerSchema, default: null, _id: false },
  image: { type: Buffer, default: null },
});

export const InfluencerModel = model<InfluencerDAO>('Influencer', InfluencerSchema);