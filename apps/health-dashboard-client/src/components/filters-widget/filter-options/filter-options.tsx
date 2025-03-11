import { FilterConfig } from '@/components/filters-widget/types';
import styles from './filter-options.module.css';
import { PillButton } from '@/components/buttons/pill-button/pill-button';

interface FilterOptionsProps extends Pick<FilterConfig, 'options'> {
  className?: string;
  onClick: (value: string) => void;
}

export const FilterOptions = ({ options, className, onClick }: Readonly<FilterOptionsProps>) => {
  return (
    <div className={`${styles.filterOptions} ${className}`}>
      {options.map(({ value, label, isSelected }) => (
        <PillButton
          key={`filter-key-${value}`}
          testId={`filter-option-${label}`}
          isSelected={isSelected}
          onClick={() => onClick(value)}
        >
          <span className={styles.label}>{label}</span>
        </PillButton>
      ))}
    </div>
  );
}