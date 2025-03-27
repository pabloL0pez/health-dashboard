'use client';

import { FilterSelection } from "@/contexts/FiltersContext/types";
import { useFilters } from "@/contexts/FiltersContext/useFilters";
import { FilterConfig, FILTERS_PARAMETER, filtersSelectionToQueryParams, queryParamsToFilterSelection } from "@core/health-dashboard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface FiltersStateProps {
  filters: FilterConfig[];
  selectedFilter: FilterConfig | null;
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
  const { filters, updateSelection, resetSelection } = useFilters(filtersPromise, searchParams);

  const [selectedFilter, setSelectedFilter] = useState<FilterConfig | null>(null);

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
  }, [filters]);

  const state = useMemo(() => ({
    filters,
    selectedFilter,
  }), [
    filters,
    selectedFilter,
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