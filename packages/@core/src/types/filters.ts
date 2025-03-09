import { ClaimCategoryType, ClaimVerificationStatusType } from "./claim";

export type MapFiltersSelection = {
  'influencer': string[],
  'date': string[],
  'category': ClaimCategoryType[],
  'status': ClaimVerificationStatusType[],
}