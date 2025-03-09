import { ClaimCategoryType, ClaimVerificationStatus } from "./claim";

export type MapFiltersSelection = {
  'influencer': string[],
  'date': string[],
  'category': ClaimCategoryType[],
  'status': ClaimVerificationStatus[],
}