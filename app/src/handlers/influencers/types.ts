import { ClaimDAO } from "../claims/types";

export interface Influencer {
  rank: number;
  name: string;
  instagramUser?: string;
  twitterUser?: string;
}

export interface InfluencersResponse {
  influencers: Influencer[];
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
}