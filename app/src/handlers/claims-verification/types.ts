import { Claim, ClaimDAO, ClaimSource, InfluencerClaims } from "../claims/types";

export type StatusType = 'confirmed' | 'questionable' | 'debunked' | 'unverifiable';

export interface ClaimVerificationScore {
  value: number;
  description?: string;
}

export interface ClaimVerificationStatus {
  value: StatusType;
  description?: string;
}

export interface ClaimVerification {
  score: ClaimVerificationScore;
  status: ClaimVerificationStatus;
  sources: ClaimSource[];
}

export interface ClaimsVerificationEvent {
  influencerName: string;
}

export interface VerifiedClaim {
  claim: Claim;
  verification: ClaimVerification;
}

export interface InfluencerVerifiedClaims {
  influencerName: string;
  verifiedClaims: VerifiedClaim[];
}

export type VerifiedClaimsResponse = Pick<VerifiedClaim, 'verification'>;

export interface ClaimVerificationDAO {
  score: ClaimVerificationScore;
  status: ClaimVerificationStatus;
  sources: ClaimSource[];
}