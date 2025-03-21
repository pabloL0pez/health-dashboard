'use client';

import styles from './filters-widget.module.css';
import { TextButton } from '@/components/buttons/text-button/text-button';
import { FilterDropdown } from '@/components/filters-widget/filter-dropdown/filter-dropdown';
import { FilterOptions } from '@/components/filters-widget/filter-options/filter-options';
import { useFiltersDispatch, useFiltersState } from '@/contexts/FiltersContext/filters-context';
import { FilterConfig } from '@core/health-dashboard';
import { useMemo } from 'react';

interface FilterWidgetProps {}

export const FiltersWidget = ({}: Readonly<FilterWidgetProps>) => {
  const { filters, selectedFilter, getSelection } = useFiltersState();
  const { setSelectedFilter, resetSelection, updateSelection } = useFiltersDispatch();

  const handleFilterClick = (filter: FilterConfig) => {
    setSelectedFilter(prev => (prev?.id === filter.id ? null : filter));
  }

  const selection = useMemo(getSelection, [getSelection]);

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
          options={selectedFilter?.options}
          onClick={(value: string) => updateSelection({ id: selectedFilter?.id, value })}
        />
      )}

      <TextButton
        className={styles.resetAllButton}
        testId='filters-reset-all-button'
        onClick={resetSelection}
        disabled={!selection?.length}
      >
        <span>Reset all</span>
      </TextButton>
    </div>
  );
}