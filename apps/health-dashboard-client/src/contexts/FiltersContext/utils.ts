import { FilterConfig } from "@/components/filters-widget/types";
import { DEFAULT_MAP_SELECTION } from "@/contexts/FiltersContext/constants";
import { FilterSelection, MapFiltersSelection } from "@/contexts/FiltersContext/types";

export const filtersToSelection = (filters: FilterConfig[]): FilterSelection[] => {
  return filters.reduce((acum: FilterSelection[], { id, options }) => ([
    ...acum,
    ...options.filter(option => option.isSelected).map(({ value }) => ({ id, value }))
  ]), []);
}

export const filtersToMapSelection = (filters: FilterConfig[]): MapFiltersSelection => {
  return filters.reduce((acum: MapFiltersSelection, { id, options }) => ({
    ...acum,
    [id]: options.filter(option => option.isSelected).map(({ value }) => value),
  }), DEFAULT_MAP_SELECTION);
}

export const getUpdatedFilters = (filters: FilterConfig[], { id, value }: FilterSelection): FilterConfig[] => {
  return filters.map(filter => {
    if (filter.id === id) {
      return {
        ...filter,
        options: filter.options.map(option => {
          if (option.value === value) {
            return {
              ...option,
              isSelected: !option.isSelected,
            };
          }

          return option;
        })
      };
    }

    return filter;
  }) as FilterConfig[];
}

export const getUpdatedFiltersAll = (filters: FilterConfig[], isSelected: boolean): FilterConfig[] => {
  return filters.map(filter => {
    return {
      ...filter,
      options: filter.options.map(option => {
        return {
          ...option,
          isSelected,
        };
      })
    };
  }) as FilterConfig[];
}

export const mapSelectionToFilters = (filters: FilterConfig[], mapSelection: MapFiltersSelection): FilterConfig[] => {
  return filters.map(filter => ({
    ...filter,
    options: filter.options.map(option => ({
      ...option,
      isSelected: Boolean(mapSelection[filter?.id].find((item) => item === option.value)),
    }))
  })) as FilterConfig[];
}