'use client';

import { FilterConfig } from "@/components/filters-widget/types";
import { FilterSelection, MapFiltersSelection } from "@/contexts/FiltersContext/types";
import { filtersToMapSelection, filtersToSelection, getUpdatedFilters, getUpdatedFiltersAll, mapSelectionToFilters } from "@/contexts/FiltersContext/utils";
import { FILTERS_PARAMETER, filtersSelectionToQueryParams, queryParamsToFilterSelection } from "@core/health-dashboard";
import { useSearchParams } from "next/navigation";
import { createContext, use, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface FiltersStateProps {
  filters: FilterConfig[];
  selectedFilter: FilterConfig | null;
  getSelection: () => FilterSelection[];
  getMapSelection: () => MapFiltersSelection;
  getQuerySelection: () => string;
}

interface FiltersDispatchProps {
  setSelectedFilter: React.Dispatch<React.SetStateAction<FilterConfig | null>>;
  updateSelection: (filterSelection: FilterSelection) => void;
  resetSelection: () => void;
}

interface FiltersContextProviderProps {
  children: React.ReactNode;
  filtersPromise: Promise<FilterConfig[]>;
}

const FiltersStateContext = createContext<FiltersStateProps>({} as unknown as any);

const FiltersDispatchContext = createContext<FiltersDispatchProps>({} as unknown as any);

export const FiltersContextProvider = ({ children, filtersPromise }: Readonly<FiltersContextProviderProps>) => {
  const searchParams = useSearchParams();
  const initialFilters = use(filtersPromise);

  const [filters, setFilters] = useState(initialFilters);
  const [selectedFilter, setSelectedFilter] = useState<FilterConfig | null>(null);

  const getSelection = useCallback(() => filtersToSelection(filters), [filters]);
  const getMapSelection = useCallback(() => filtersToMapSelection(filters), [filters]);
  const getQuerySelection = useCallback(() => filtersSelectionToQueryParams(getMapSelection()), [getMapSelection]);

  const updateSelection = useCallback((filterSelection: FilterSelection) => setFilters(prev => getUpdatedFilters(prev, filterSelection)), []);
  const resetSelection = useCallback(() => setFilters(prev => getUpdatedFiltersAll(prev, false)), []);

  useEffect(() => {
    setSelectedFilter(prev => prev ? filters.find(filter => filter.id === prev.id) ?? null : prev);
  }, [filters]);

  useEffect(() => {
    const queryParams = searchParams.getAll(FILTERS_PARAMETER)[0];
    const parsedSelection = queryParamsToFilterSelection(queryParams);

    const updatedFilters = mapSelectionToFilters(filters, parsedSelection);

    setFilters(updatedFilters);
  }, []);

  useEffect(() => {
    const queryParams = filtersSelectionToQueryParams(getMapSelection());
    const url = queryParams ? `?${queryParams}` : location.pathname;

    window.history.pushState(null, '', url);
  }, [getMapSelection]);

  const state = useMemo(() => ({
    filters,
    selectedFilter,
    setSelectedFilter,
    getSelection,
    getMapSelection,
    getQuerySelection
  }), [
    filters,
    selectedFilter,
    setSelectedFilter,
    getSelection,
    getMapSelection,
    getQuerySelection
  ]);

  const dispatch = useMemo(() => ({
    setSelectedFilter,
    updateSelection,
    resetSelection,
  }), [
    setSelectedFilter,
    updateSelection,
    resetSelection,
  ]);

  return (
    <FiltersStateContext.Provider value={state}>
      <FiltersDispatchContext.Provider value={dispatch}>
        { children }
      </FiltersDispatchContext.Provider>
    </FiltersStateContext.Provider>
  );
}

export const useFiltersState = () => (useContext(FiltersStateContext));

export const useFiltersDispatch = () => (useContext(FiltersDispatchContext));