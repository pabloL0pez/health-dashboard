export interface ClaimsEvent {
  influencers: string[];
  maxClaims?: number;
}

export enum StatusType {
  Confirmed = 'confirmed',
  Questionable = 'questionable',
  Debunked = 'debunked',
}

export interface Claim {
  quote: string;
  title: string;
  category: string;
  score: number;
  status: StatusType;
}

export interface InfluencerClaims {
  influencer: string;
  claims: Claim[];
}

export interface ClaimsResponse {
  claimsByInfluencer: InfluencerClaims[];
}