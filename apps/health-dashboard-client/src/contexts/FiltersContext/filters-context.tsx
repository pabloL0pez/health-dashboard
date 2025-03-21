'use client';

import { FilterSelection } from "@/contexts/FiltersContext/types";
import { filtersToSelection, getUpdatedFilters, getUpdatedFiltersAll, mapSelectionToFilters } from "@/contexts/FiltersContext/utils";
import { FilterConfig, FILTERS_PARAMETER, filtersSelectionToQueryParams, queryParamsToFilterSelection } from "@core/health-dashboard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, use, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface FiltersStateProps {
  filters: FilterConfig[];
  selectedFilter: FilterConfig | null;
  getSelection: () => FilterSelection[];
  isLoading: boolean;
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
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const initialFilters = use(filtersPromise);

  const [isLoading, setIsLoading] = useState(false);
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
    const params = new URLSearchParams(searchParams);
    setSelectedFilter(prev => prev ? filters.find(filter => filter.id === prev.id) ?? null : prev);

    const queryParams = filtersSelectionToQueryParams(filters);

    if (queryParams) {
      params.set(FILTERS_PARAMETER, queryParams);
    } else {
      params.delete(FILTERS_PARAMETER);
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
    setIsLoading(true);
  }, [filters]);

  const state = useMemo(() => ({
    filters,
    selectedFilter,
    setSelectedFilter,
    getSelection,
    isLoading,
  }), [
    filters,
    selectedFilter,
    setSelectedFilter,
    getSelection,
    isLoading,
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