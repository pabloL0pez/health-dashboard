'use client';

import { ClaimCard } from "@/components/claim-card/claim-card";
import styles from "./claims-list.module.css";
import { ClaimV2 } from "@core/health-dashboard";
import { use, useEffect, useState } from "react";
import { useFiltersState } from "@/contexts/FiltersContext/filters-context";

interface ClaimsListProps {
  claims: Promise<ClaimV2[]>;
}

export const ClaimsList = ({ claims }: Readonly<ClaimsListProps>) => {
  const resolvedClaims = use(claims);
  const { filters } = useFiltersState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    claims.then(() => setIsLoading(false));
  }, [claims]);

  useEffect(() => {
    setIsLoading(true);
  }, [filters]);

  return (
    <div className={`${styles.claimsList} ${isLoading ? styles.loading : ''}`}>
      {resolvedClaims.map(({ categories, quote, influencerName, date, source, verification }, index) => {
        return (
          <ClaimCard
            key={`${index}-claim-card`}
            index={index}
            categories={categories}
            quote={quote}
            influencerName={influencerName}
            date={date}
            source={source}
            verification={verification}
          />
        )
      })}
    </div>
  );
}