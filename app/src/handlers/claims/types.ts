export interface ClaimsEvent {
  influencers: string[];
  maxClaims?: number;
}

export type StatusType = 'confirmed' | 'questionable' | 'debunked';

export interface Claim {
  quote: string;
  title: string;
  category: string;
  date: string;
  source?: ClaimSource;
}

export interface ClaimVerificationScore {
  score: number;
  description?: string;
}

export interface ClaimVerificationStatus {
  status: StatusType;
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

export interface VerifiedClaimsResponse {
  verifiedClaims: VerifiedClaim[];
}

export interface InfluencerVerifiedClaims {
  influencerName: string;
  verifiedClaims: VerifiedClaim[];
}

export interface ClaimDAO {
  quote: string;
  title: string;
  category: string;
  date: string;
  source?: ClaimSource;
  // score: number;
  // status: StatusType;
}