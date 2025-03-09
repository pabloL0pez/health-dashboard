import { ClaimVerification } from "@core/health-dashboard";
import { VerifiedClaimsResponse } from "./types";

export const CLAIM_VERIFICATION_OBJECT: ClaimVerification = {
  score: {
    value: 0,
    description: ''
  },
  status: {
    value: 'confirmed',
    description: '',
  },
  sources: [
    {
      source: '',
      url: '',
    },
  ],
};

export const VERIFIED_CLAIMS_RESPONSE_OBJECT: VerifiedClaimsResponse = {
  verification: CLAIM_VERIFICATION_OBJECT,
}