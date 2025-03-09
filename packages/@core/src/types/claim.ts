export type ClaimVerificationStatusType = 'confirmed' | 'questionable' | 'debunked' | 'unverifiable';

export type ClaimCategoryType = 'nutrition' | 'mental-health' | 'cardiovascular-health' | 'training' | 'fitness' | 'education' | 'other';

export interface ClaimVerificationScore {
  value: number;
  description?: string;
}

export interface ClaimVerificationStatus {
  value: ClaimVerificationStatusType;
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

export interface Claim {
  id: string;
  quote: string;
  title: string;
  category: ClaimCategoryType;
  date: string;
  source?: ClaimSource;
}

export interface ClaimSource {
  source: string;
  url?: string;
}