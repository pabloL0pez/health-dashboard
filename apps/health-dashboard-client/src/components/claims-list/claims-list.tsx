'use client';

import { ClaimCard } from "@/components/claim-card/claim-card";
import styles from "./claims-list.module.css";
import { ClaimV2, ClaimVerificationStatusType } from "@core/health-dashboard";
import { use } from "react";

interface ClaimsListProps {
  claims: Promise<ClaimV2[]>;
}

export const ClaimsList = ({ claims }: Readonly<ClaimsListProps>) => {
  const resolvedClaims = use(claims);

  return (
    <div className={styles.claimsList}>
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