import { FilterConfig, MapFiltersSelection } from "../types/filters";
import { ClaimCategoryType, ClaimVerificationStatusType } from "../types/claim";

export const FILTERS_PARAMETER = 'filters';

export interface FiltersQuery {
  [FILTERS_PARAMETER]: string;
}

const DEFAULT_MAP_SELECTION: MapFiltersSelection = {
  'influencer': [],
  'date': [],
  'category': [],
  'status': [],
};

const filtersToMapSelection = (filters: FilterConfig[]): MapFiltersSelection => {
  return filters.reduce((acum: MapFiltersSelection, { id, options }) => ({
    ...acum,
    [id]: options.filter(option => option.isSelected).map(({ value }) => value),
  }), DEFAULT_MAP_SELECTION);
}

export const filtersSelectionToQueryParams = (selection: FilterConfig[]): string => {
  const queryParams: string[] = [];

  const mapSelection = filtersToMapSelection(selection);
  const filters = Object.keys(mapSelection) as (keyof MapFiltersSelection)[];

  for (let filter of filters) {
    const selectedOptions = mapSelection[filter];

    if (selectedOptions?.length) {
      queryParams.push(`${filter}:${selectedOptions?.join(',')}`);
    }
  }

  if (queryParams.length === 0) {
    return '';
  }

  return `${queryParams.join('|')}`;
}

export const queryParamsToFilterSelection = (queryParams: string): MapFiltersSelection => {
  const filterSelection: MapFiltersSelection = {
    influencer: [],
    date: [],
    category: [],
    status: []
  };

  if (!queryParams) {
    return filterSelection;
  }

  const filters = queryParams.split('|');

  filters.forEach(filter => {
    const [key, value] = filter.split(':');
    
    if (key && value) {
      const selectedOptions = value.split(',');

      if (selectedOptions.length > 0) {
        if (key === 'influencer') {
          filterSelection.influencer = selectedOptions;
        } else if (key === 'date') {
          filterSelection.date = selectedOptions;
        } else if (key === 'category') {
          filterSelection.category = selectedOptions as ClaimCategoryType[];
        } else if (key === 'status') {
          filterSelection.status = selectedOptions as ClaimVerificationStatusType[];
        }
      }
    }
  });

  return filterSelection;
};