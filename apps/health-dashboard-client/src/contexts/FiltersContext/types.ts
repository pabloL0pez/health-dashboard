import { FilterConfig } from "@/components/filters-widget/types"
import { ClaimCategoryType, ClaimVerificationStatusType } from "@core/health-dashboard";

type FilterConfigId = Pick<FilterConfig, 'id'>;
type FilterConfigOptionValue = Pick<FilterConfig['options'][0], 'value'>

export type FilterSelection = FilterConfigId & FilterConfigOptionValue;

export type MapFiltersSelection = {
  'influencer': string[],
  'date': string[],
  'category': ClaimCategoryType[],
  'status': ClaimVerificationStatusType[],
}