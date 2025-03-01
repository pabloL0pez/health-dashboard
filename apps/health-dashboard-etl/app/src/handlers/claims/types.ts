import { ClaimVerification } from "../claims-verification/types";

export interface ClaimsEvent {
  influencers: string[];
  maxClaims?: number;
}

export interface Claim {
  id: string;
  quote: string;
  title: string;
  category: string;
  date: string;
  source?: ClaimSource;
}

export interface ClaimSource {
  source: string;
  url?: string;
}

export interface InfluencerClaims {
  influencerName: string;
  claims: Claim[];
}

export type ClaimsResponse = Pick<InfluencerClaims, 'claims'>;

export interface ClaimDAO {
  id: string;
  quote: string;
  title: string;
  category: string;
  date: string;
  source?: ClaimSource;
  verification?: ClaimVerification;
}
