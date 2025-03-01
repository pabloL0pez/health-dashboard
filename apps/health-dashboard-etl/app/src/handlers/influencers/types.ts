import { ClaimDAO } from "../claims/types";
import { AIProviderHandler } from "../types";

export interface Influencer {
  rank: number;
  name: string;
  bio: string;
  instagramUser?: string;
  twitterUser?: string;
  image?: string;
}

export interface InfluencersEvent {
  topN: number;
}

export interface InfluencersResponse {
  influencers: Influencer[];
}

export interface InfluencerDAO {
  id: string;
  name: string;
  bio: string;
  rank: number;
  instagramUser?: string;
  twitterUser?: string;
  claims?: ClaimDAO[];
  ai?: AIProviderHandler;
  image?: Buffer;
}