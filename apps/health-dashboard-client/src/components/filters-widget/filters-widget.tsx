'use client';

import styles from './filters-widget.module.css';
import { TextButton } from '@/components/buttons/text-button/text-button';
import { FilterDropdown } from '@/components/filters-widget/filter-dropdown/filter-dropdown';
import { FilterOptions } from '@/components/filters-widget/filter-options/filter-options';
import { FilterConfig } from '@/components/filters-widget/types';
import { useFiltersContext } from '@/contexts/FiltersContext/filters-context';
import { useQuery } from '@/core/utils/useQuery';
import { ClaimsService } from '@/services/claims.service';

interface FilterWidgetProps {}

const claimsPromiseCache = new Map<string, Promise<{}>>();

export const FiltersWidget = ({}: Readonly<FilterWidgetProps>) => {
  const { filters, selectedFilter, setSelectedFilter, selection, resetSelection, querySelection } = useFiltersContext();

  const claimsMock = useQuery({
    cache: claimsPromiseCache,
    key: `query${querySelection ? '_' + querySelection : ''}`,
    promise: ClaimsService.getClaims(querySelection),
  });

  const handleFilterClick = (filter: FilterConfig) => {
    setSelectedFilter(prev => (prev?.id === filter.id ? null : filter));
  }

  return (
    <div className={styles.filterWidget}>
      <div className={styles.filtersContainer}>
        {filters.map((filter) => (
          <FilterDropdown
            key={filter?.id}
            label={filter?.label}
            isSelected={selectedFilter?.id === filter?.id}
            selectionCount={selection.filter(item => item.id === filter.id)?.length}
            onClick={() => handleFilterClick(filter)}
          />
        ))}
      </div>

      {selectedFilter && (
        <FilterOptions
          className={styles.filterOptions}
          filterId={selectedFilter?.id}
          options={selectedFilter?.options}
        />
      )}

      { selection.length > 0 && (
        <TextButton
          className={styles.resetAllButton}
          testId='filters-reset-all-button'
          onClick={resetSelection}
        >
          <span>Reset all</span>
        </TextButton>
      )}

      <>{JSON.stringify(claimsMock)}</>
    </div>
  );
}