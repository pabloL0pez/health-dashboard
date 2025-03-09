'use client';

import { useFiltersContext } from "@/contexts/FiltersContext/filters-context";
import { filtersSelectionToQueryParams } from "@core/health-dashboard";
import { createContext, ReactNode, useEffect } from "react";

interface ClaimsContextProviderProps {
  children: ReactNode;
}

const ClaimsContext = createContext({});

export const ClaimsContextProvider = ({ children }: ClaimsContextProviderProps) => {
  const { mapSelection } = useFiltersContext();

  useEffect(() => {
    const queryParams = filtersSelectionToQueryParams(mapSelection);
    const url = queryParams ? `?${queryParams}` : location.pathname;

    window.history.pushState(null, '', url);
  }, [mapSelection]);

  const state = {};

  return (
    <ClaimsContext.Provider value={state}>
      { children }
    </ClaimsContext.Provider>
  );
}