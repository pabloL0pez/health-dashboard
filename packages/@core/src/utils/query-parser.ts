import { MapFiltersSelection } from "../types/filters";
import { ClaimCategoryType, ClaimVerificationStatus } from "../types/claim";

export const FILTERS_PARAMETER = 'filters';

export interface FiltersQuery {
  [FILTERS_PARAMETER]: string;
}

export const filtersSelectionToQueryParams = (selection: MapFiltersSelection): string => {
  const queryParams: string[] = [];

  const filters = Object.keys(selection) as (keyof MapFiltersSelection)[];

  for (let filter of filters) {
    const selectedOptions = selection[filter];

    if (selectedOptions?.length > 0) {
      queryParams.push(`${filter}:${selectedOptions?.join(',')}`);
    }
  }

  if (queryParams.length === 0) {
    return '';
  }

  return `${FILTERS_PARAMETER}=${queryParams.join('|')}`;
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
          filterSelection.status = selectedOptions as ClaimVerificationStatus[];
        }
      }
    }
  });

  return filterSelection;
};