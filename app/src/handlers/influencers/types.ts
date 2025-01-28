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