export type ClaimCategory = 'nutrition' | 'mental-health' | 'cardiovascular-health' | 'training' | 'fitness' | 'education' | 'other';

export type ClaimVerificationStatus = 'confirmed' | 'questionable' | 'debunked' | 'unverified';

export interface ClaimSource {
  source: string;
  url: string;
}

export interface ClaimVerification {
  score: number;
  status: ClaimVerificationStatus;
  description: string;
  sources: ClaimSource[];
}

export interface Claim {
  quote: string;
  categories: ClaimCategory[];
  date?: string;
  source: ClaimSource;
  verification: ClaimVerification;
}