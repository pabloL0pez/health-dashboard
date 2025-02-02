import { ClaimDAO } from "../claims/types";
import { AIProviderHandler } from "../types";

export interface Influencer {
  rank: number;
  name: string;
  instagramUser?: string;
  twitterUser?: string;
  image?: string;
}

export interface InfluencersEvent {
  topN: number;
}

export interface InfluencerDAO {
  id: string;
  name: string;
  rank: number;
  instagramUser?: string;
  twitterUser?: string;
  claims?: ClaimDAO[];
  ai?: AIProviderHandler;
  image?: Buffer;
}