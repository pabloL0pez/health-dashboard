import { Claim, ClaimSource } from "@core/health-dashboard";
import { ClaimsResponse, InfluencerClaims } from "./types";

export const DEFAULT_MAX_CLAIMS = 5;

export const INFLUENCER_CLAIMS_OBJECT: Pick<InfluencerClaims, 'claims'> = {
  claims: [],
}

export const CLAIM_OBJECT: Pick<Claim, 'category' | 'date' | 'quote' | 'source' | 'title'> = {
  category: 'education',
  date: '',
  quote: '',
  source: { 
    source: '',
    url: '',
  },
  title: '',
}

export const CLAIMS_RESPONSE_OBJECT: ClaimsResponse = {
  claims: [],
}

export const CLAIM_SOURCE_OBJECT: ClaimSource = {
  source: '',
  url: '',
}

export const UNVERIFIABLE_CLAIM_SCORE = -1;