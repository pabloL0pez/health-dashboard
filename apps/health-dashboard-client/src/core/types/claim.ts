import { ClaimVerificationStatusType, ClaimCategoryType, ClaimSource } from "@core/health-dashboard";

export interface ClaimVerification {
  score: number;
  status: ClaimVerificationStatusType;
  description: string;
  sources: ClaimSource[];
}

export interface Claim {
  quote: string;
  categories: ClaimCategoryType[];
  date?: string;
  source?: ClaimSource;
  verification: ClaimVerification;
}