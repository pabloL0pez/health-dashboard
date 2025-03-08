import { ClaimCategory, ClaimVerificationStatus } from "./claim";

export type MapFiltersSelection = {
  'influencer': string[],
  'date': string[],
  'category': ClaimCategory[],
  'status': ClaimVerificationStatus[],
}