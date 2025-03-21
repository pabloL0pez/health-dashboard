import { FilterConfig } from "@core/health-dashboard";

type FilterConfigId = Pick<FilterConfig, 'id'>;
type FilterConfigOptionValue = Pick<FilterConfig['options'][0], 'value'>

export type FilterSelection = FilterConfigId & FilterConfigOptionValue;