'use client';

import Icon from '@/components/icon/icon';
import styles from './filter-dropdown.module.css';

interface FilterDropdownProps {
  label: string;
  isSelected: boolean;
  selectionCount?: number;
  onClick: () => void;
}

export const FilterDropdown = ({ label, isSelected, onClick, selectionCount = 0 }: Readonly<FilterDropdownProps>) => {
  const handleOnClick = (e: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    onClick();
  }

  return (
    <button
      className={`${styles.filterDropdown} ${isSelected ? styles.selected : ''}`}
      onClick={handleOnClick}
    >
      <span className={styles.label}>{label}</span>
      { selectionCount > 0 && <span className={styles.badge}>{selectionCount}</span>}
      <Icon icon='caret-down' className={styles.icon}/>
    </button>
  );
}