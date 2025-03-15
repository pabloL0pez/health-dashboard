import { ClaimVerificationStatusType } from "@core/health-dashboard";

export const INFLUENCER_FILTER_LABEL = 'Influencer';
export const CATEGORY_FILTER_LABEL = 'Category';
export const DATE_FILTER_LABEL = 'Date';
export const STATUS_FILTER_LABEL = 'Status';

export const STATUS_ORDER: Record<ClaimVerificationStatusType, number> = {
  'confirmed': 1,
  'questionable': 2,
  'debunked': 3,
  'unverified': 4,
  'unverifiable': 4,
}