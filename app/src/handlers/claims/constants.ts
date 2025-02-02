import { Claim, ClaimsResponse, InfluencerClaims, StatusType } from "./types";

export const DEFAULT_MAX_CLAIMS = 5;

export const INFLUENCER_CLAIMS_OBJECT: InfluencerClaims = {
  influencerName: '',
  claims: [],
}

export const CLAIM_OBJECT: Claim = {
  quote: '',
  title: '',
  category: '',
  score: 0,
  status: StatusType.Confirmed,
}

export const CLAIMS_RESPONSE_OBJECT: ClaimsResponse = {
  claimsByInfluencer: [],
}