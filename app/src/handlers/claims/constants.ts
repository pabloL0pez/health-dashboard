import { Claim, ClaimSource, ClaimsResponse, InfluencerClaims } from "./types";

export const DEFAULT_MAX_CLAIMS = 5;

export const INFLUENCER_CLAIMS_OBJECT: Pick<InfluencerClaims, 'claims'> = {
  claims: [],
}

export const CLAIM_OBJECT: Claim = {
  quote: '',
  title: '',
  category: '',
  date: '',
}

export const CLAIMS_RESPONSE_OBJECT: ClaimsResponse = {
  claims: [],
}

export const CLAIM_SOURCE_OBJECT: ClaimSource = {
  source: '',
  url: '',
}

export const UNVERIFIBLE_CLAIM_SCORE = -1;