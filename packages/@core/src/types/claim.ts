export type ClaimVerificationStatusType = 'confirmed' | 'questionable' | 'debunked' | 'unverified' | 'unverifiable';

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

export interface ClaimVerificationV2 {
  score: number;
  status: ClaimVerificationStatusType;
  description?: string;
  sources: ClaimSource[];
}

export interface ClaimV2 {
  influencerName: string;
  quote: string;
  categories: ClaimCategoryType[];
  date?: string;
  source?: ClaimSource;
  verification: ClaimVerificationV2;
}