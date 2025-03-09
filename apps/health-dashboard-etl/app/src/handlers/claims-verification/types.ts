import { VerifiedClaim } from "@core/health-dashboard";

export interface ClaimsVerificationEvent {
  influencerName: string;
}

export interface InfluencerVerifiedClaims {
  influencerName: string;
  verifiedClaims: VerifiedClaim[];
}

export type VerifiedClaimsResponse = Pick<VerifiedClaim, 'verification'>;