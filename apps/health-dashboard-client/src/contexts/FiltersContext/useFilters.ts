import { filtersDispatch } from "@/contexts/FiltersContext/filtersDispatch";
import { FilterSelection } from "@/contexts/FiltersContext/types";
import { FilterConfig, FILTERS_PARAMETER, queryParamsToFilterSelection } from "@core/health-dashboard";
import { ReadonlyURLSearchParams } from "next/navigation";
import { use, useCallback, useEffect, useReducer } from "react";

export const useFilters = (filtersPromise: Promise<FilterConfig[]>, searchParams: ReadonlyURLSearchParams) => {
  const initialFilters = use(filtersPromise);

  const [filters, dispatchFilters] = useReducer(filtersDispatch, initialFilters);

  const updateSelection = useCallback((filterSelection: FilterSelection) => dispatchFilters({ type: 'update_selection', payload: filterSelection}), []);
  const resetSelection = useCallback((() => dispatchFilters({ type: 'reset' })), []);

  useEffect(() => {
    const queryParams = searchParams.getAll(FILTERS_PARAMETER)[0];
    const parsedSelection = queryParamsToFilterSelection(queryParams);

    dispatchFilters({ type: 'update_map', payload: parsedSelection });
  }, []);

  return {
    filters,
    updateSelection,
    resetSelection,
  }
}
