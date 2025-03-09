import { ClaimCategoryType, ClaimSource, ClaimVerification, ClaimVerificationScore, ClaimVerificationStatus } from "types/claim";

export interface ClaimVerificationDAO {
  score: ClaimVerificationScore;
  status: ClaimVerificationStatus;
  sources: ClaimSource[];
}

export interface ClaimDAO {
  id: string;
  quote: string;
  title: string;
  category: ClaimCategoryType;
  date: string;
  source?: ClaimSource;
  verification?: ClaimVerification;
}