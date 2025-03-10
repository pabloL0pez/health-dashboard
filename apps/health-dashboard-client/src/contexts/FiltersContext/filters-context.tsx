'use client';

import { FilterConfig } from "@/components/filters-widget/types";
import { filterWidgetConfig } from "@/contexts/FiltersContext/constants";
import { FilterSelection, MapFiltersSelection } from "@/contexts/FiltersContext/types";
import { filtersToMapSelection, filtersToSelection, getUpdatedFilters, getUpdatedFiltersAll, mapSelectionToFilters } from "@/contexts/FiltersContext/utils";
import { FILTERS_PARAMETER, filtersSelectionToQueryParams, queryParamsToFilterSelection } from "@core/health-dashboard";
import { useSearchParams } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const DEFAULT_FILTERS = filterWidgetConfig;

interface FiltersContextProps {
  filters: FilterConfig[];
  selectedFilter: FilterConfig | null;
  setSelectedFilter: React.Dispatch<React.SetStateAction<FilterConfig | null>>;
  selection: FilterSelection[];
  mapSelection: MapFiltersSelection;
  updateSelection: (filterSelection: FilterSelection) => void;
  resetSelection: () => void;
  querySelection: string;
}

interface FiltersContextProviderProps {
  children: React.ReactNode;
}

const FiltersContext = createContext<FiltersContextProps>({} as unknown as any);

export const FiltersContextProvider = ({ children }: Readonly<FiltersContextProviderProps>) => {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selectedFilter, setSelectedFilter] = useState<FilterConfig | null>(null);

  const selection: FilterSelection[] = useMemo(() => filtersToSelection(filters), [filters]);
  const mapSelection: MapFiltersSelection = useMemo(() => filtersToMapSelection(filters), [filters]);
  const querySelection = useMemo(() => filtersSelectionToQueryParams(mapSelection), [mapSelection]);

  const updateSelection = useCallback((filterSelection: FilterSelection) => setFilters(getUpdatedFilters(filters, filterSelection)), [filters, setFilters]);
  const resetSelection = useCallback(() => setFilters(getUpdatedFiltersAll(filters, false)), [filters, setFilters]);

  useEffect(() => {
    setSelectedFilter(prev => prev ? filters.find(filter => filter.id === prev.id) ?? null : prev);
  }, [filters]);

  useEffect(() => {
    const queryParams = searchParams.getAll(FILTERS_PARAMETER)[0];
    const parsedSelection = queryParamsToFilterSelection(queryParams);

    const updatedFilters = mapSelectionToFilters(filters, parsedSelection);

    setFilters(updatedFilters);
  }, []);

  const state = useMemo(() => ({
    filters,
    selectedFilter,
    setSelectedFilter,
    selection,
    mapSelection,
    updateSelection,
    resetSelection,
    querySelection
  }), [filters,selectedFilter, setSelectedFilter, selection, mapSelection, updateSelection, resetSelection, querySelection]);

  return (
    <FiltersContext.Provider value={state}>
      { children }
    </FiltersContext.Provider>
  );
}

export const useFiltersContext = () => (useContext(FiltersContext));