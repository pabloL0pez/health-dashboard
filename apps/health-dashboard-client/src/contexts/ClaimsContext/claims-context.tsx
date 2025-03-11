'use client';

import { useFiltersState } from "@/contexts/FiltersContext/filters-context";
import { filtersSelectionToQueryParams } from "@core/health-dashboard";
import { createContext, ReactNode, useEffect } from "react";

interface ClaimsContextProviderProps {
  children: ReactNode;
}

const ClaimsContext = createContext({});

export const ClaimsContextProvider = ({ children }: ClaimsContextProviderProps) => {
  const { getMapSelection } = useFiltersState();

  const state = {};

  return (
    <ClaimsContext.Provider value={state}>
      { children }
    </ClaimsContext.Provider>
  );
}