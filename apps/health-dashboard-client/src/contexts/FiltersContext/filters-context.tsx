'use client';

import { FilterSelection } from "@/contexts/FiltersContext/types";
import { filtersToSelection, getUpdatedFilters, getUpdatedFiltersAll, mapSelectionToFilters } from "@/contexts/FiltersContext/utils";
import { FilterConfig, FILTERS_PARAMETER, filtersSelectionToQueryParams, queryParamsToFilterSelection } from "@core/health-dashboard";
import { useSearchParams } from "next/navigation";
import { createContext, use, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface FiltersStateProps {
  filters: FilterConfig[];
  selectedFilter: FilterConfig | null;
  getSelection: () => FilterSelection[];
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

export const FiltersProvider = ({ children, filtersPromise }: Readonly<FiltersContextProviderProps>) => {
  const searchParams = useSearchParams();
  const initialFilters = use(filtersPromise);

  const [filters, setFilters] = useState(initialFilters);
  const [selectedFilter, setSelectedFilter] = useState<FilterConfig | null>(null);

  const getSelection = useCallback(() => filtersToSelection(filters), [filters]);
  const updateSelection = useCallback((filterSelection: FilterSelection) => setFilters(prev => getUpdatedFilters(prev, filterSelection)), []);
  const resetSelection = useCallback(() => setFilters(prev => getUpdatedFiltersAll(prev, false)), []);

  useEffect(() => {
    const queryParams = searchParams.getAll(FILTERS_PARAMETER)[0];
    const parsedSelection = queryParamsToFilterSelection(queryParams);

    const updatedFilters = mapSelectionToFilters(filters, parsedSelection);

    setFilters(updatedFilters);
  }, []);

  useEffect(() => {
    setSelectedFilter(prev => prev ? filters.find(filter => filter.id === prev.id) ?? null : prev);

    const queryParams = filtersSelectionToQueryParams(filters);
    const url = queryParams ? `?${queryParams}` : location.pathname;

    window.history.pushState(null, '', url);
  }, [filters]);

  const state = useMemo(() => ({
    filters,
    selectedFilter,
    setSelectedFilter,
    getSelection,
  }), [
    filters,
    selectedFilter,
    setSelectedFilter,
    getSelection,
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