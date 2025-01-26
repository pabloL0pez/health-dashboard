export interface Influencer {
  rank: number;
  name: string;
  instagramUser: string | null;
  twitterUser: string | null;
}

export interface InfluencersResponse {
  influencers: Influencer[];
}

export interface InfluencersEvent {
  topN: number;
}