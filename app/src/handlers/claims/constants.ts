import { Claim, StatusType } from "./types";

export const DEFAULT_MAX_CLAIMS = 5;

export const CLAIM_OBJECT: Claim = {
  quote: '',
  title: '',
  category: '',
  score: 0,
  status: StatusType.Confirmed,
}