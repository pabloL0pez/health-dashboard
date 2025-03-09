import { FilterConfig } from '@/components/filters-widget/types';
import styles from './filter-options.module.css';
import { PillButton } from '@/components/buttons/pill-button/pill-button';
import { useFiltersContext } from '@/contexts/FiltersContext/filters-context';

interface FilterOptionsProps extends Pick<FilterConfig, 'options'> {
  filterId: FilterConfig['id'];
  className?: string;
}

export const FilterOptions = ({ filterId, options, className }: Readonly<FilterOptionsProps>) => {
  const { updateSelection } = useFiltersContext();

  return (
    <div className={`${styles.filterOptions} ${className}`}>
      {options.map(({ value, label, isSelected }) => (
        <PillButton
          key={`filter-key-${value}`}
          testId={`filter-option-${label}`}
          isSelected={isSelected}
          onClick={() => updateSelection({ id: filterId, value })}
        >
          <span className={styles.label}>{label}</span>
        </PillButton>
      ))}
    </div>
  );
}