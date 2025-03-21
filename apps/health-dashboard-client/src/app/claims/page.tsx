import styles from './page.module.css';
import type { Metadata } from "next";
import { baseMetadata } from "@/app/constants";
import { capitalize } from "@/shared/utils/capitalize";
import { pageName } from "@/app/claims/constants";
import { FiltersWidget } from '@/components/filters-widget/filters-widget';
import { FiltersProvider } from '@/contexts';
import { ClaimsList } from '@/components/claims-list/claims-list';
import { ClaimsService } from '@/services/claims.service';
import { FILTERS_PARAMETER } from '@core/health-dashboard';
import { Suspense } from 'react';
import { ClaimsListSkeleton } from '@/components/claims-list-skeleton/claims-list-skeleton';

export const metadata: Metadata = {
  title: baseMetadata.baseTitle.concat(` | ${capitalize(pageName)}`),
  description: `Health dashboard ${pageName}`,
};

interface SearchParams {
  searchParams: Promise<{ [key: string]: string}>
}

const Claims = async ({ searchParams }: SearchParams) => { 
  const queryParams = (await searchParams)?.filters;
  const claims = ClaimsService.getClaims(`${FILTERS_PARAMETER}=${queryParams}`);
  const filters = ClaimsService.getFilters();

  return (
    <FiltersProvider filtersPromise={filters}>
      <div className={styles.page}>
        <FiltersWidget />
        <Suspense fallback={<ClaimsListSkeleton />}>
          <ClaimsList claims={claims}/>
        </Suspense>
      </div>
    </FiltersProvider>
  );
}

export default Claims;