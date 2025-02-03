export interface ClaimsEvent {
  influencers: string[];
  maxClaims?: number;
}

export type StatusType = 'confirmed' | 'questionable' | 'debunked' | 'unverifiable';

export interface Claim {
  quote: string;
  title: string;
  category: string;
  date: string;
  source?: ClaimSource;
}

export interface ClaimVerificationScore {
  value: number;
  description?: string;
}

export interface ClaimVerificationStatus {
  value: StatusType;
  description?: string;
}

export interface ClaimSource {
  source: string;
  url?: string;
}

export interface ClaimVerification {
  score: ClaimVerificationScore;
  status: ClaimVerificationStatus;
  sources: ClaimSource[];
}

export interface VerifiedClaim {
  claim: Claim;
  verification: ClaimVerification;
}

export interface InfluencerClaims {
  influencerName: string;
  claims: Claim[];
}

export type ClaimsResponse = Pick<InfluencerClaims, 'claims'>;

export type VerifiedClaimsResponse = Pick<VerifiedClaim, 'verification'>;

export interface InfluencerVerifiedClaims {
  influencerName: string;
  verifiedClaims: VerifiedClaim[];
}

export interface ClaimDAO {
  id: string;
  quote: string;
  title: string;
  category: string;
  date: string;
  source?: ClaimSource;
}