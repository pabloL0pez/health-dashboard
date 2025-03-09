import { Claim } from "@core/health-dashboard";

export interface ClaimsEvent {
  influencers: string[];
  maxClaims?: number;
}

export interface InfluencerClaims {
  influencerName: string;
  claims: Claim[];
}

export type ClaimsResponse = Pick<InfluencerClaims, 'claims'>;