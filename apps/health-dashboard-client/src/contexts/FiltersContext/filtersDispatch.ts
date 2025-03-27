import { FilterSelection } from "@/contexts/FiltersContext/types";
import { getUpdatedFilters, getUpdatedFiltersAll, mapSelectionToFilters } from "@/contexts/FiltersContext/utils";
import { FilterConfig, MapFiltersSelection } from "@core/health-dashboard";

interface ActionUpdateFromSelection {
  type: 'update_selection';
  payload: FilterSelection;
}

interface ActionUpdateFromMapSelection {
  type: 'update_map';
  payload: MapFiltersSelection;
}

interface ActionResetSelection {
  type: 'reset';
}

type FiltersDispatchAction = ActionUpdateFromSelection | ActionResetSelection | ActionUpdateFromMapSelection;

export const filtersDispatch = (state: FilterConfig[], action: FiltersDispatchAction): FilterConfig[] => {
  if (action.type === 'update_selection') {
    return getUpdatedFilters(state, action.payload);
  }

  if (action.type === 'reset') {
    return getUpdatedFiltersAll(state, false);
  }

  return mapSelectionToFilters(state, action.payload);
}