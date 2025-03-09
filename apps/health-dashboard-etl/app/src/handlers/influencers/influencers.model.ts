import { Schema, model } from 'mongoose';
import { InfluencerDAO } from './types';
import { AIProviderHandler, AIProviderModel } from '../types';
import { InfluencerSchema as CoreInfluencerSchema } from '@core/health-dashboard';

const AIProviderModelSchema = new Schema<AIProviderModel>({
  provider: { type: String, required: true },
  model: { type: String, required: true },
});

const AIProviderHandlerSchema = new Schema<AIProviderHandler>({
  influencers: { type: AIProviderModelSchema, default: null },
  claims: { type: AIProviderModelSchema, default: null },
  claimsVerification: { type: AIProviderModelSchema, default: null },
});

const InfluencerSchema = new Schema<InfluencerDAO>({
  ...CoreInfluencerSchema.obj,
  ai: { type: AIProviderHandlerSchema, default: null, _id: false },
});

export const InfluencerModel = model<InfluencerDAO>('Influencer', InfluencerSchema);