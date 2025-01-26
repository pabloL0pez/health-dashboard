interface Influencer {
  rank: number;
  name: string;
  instagramUser?: string;
  xUser?: string;
}

export interface InfluencersResponse {
  influencers: Influencer[];
}

export interface InfluencersEvent {
  topN: number;
}