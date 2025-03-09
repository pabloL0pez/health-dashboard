import { AIProviderHandler } from "../types";
import { InfluencerDAO as CoreInfluencerDAO, Influencer } from '@core/health-dashboard';

export interface InfluencersEvent {
  topN: number;
}

export interface InfluencersResponse {
  influencers: Influencer[];
}

export type InfluencerDAO = CoreInfluencerDAO & { ai?: AIProviderHandler };