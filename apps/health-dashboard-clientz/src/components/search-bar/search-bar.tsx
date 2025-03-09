'use client';

import styles from './search-bar.module.css';
import Icon from "../icon/icon";
import { ChangeEvent, useRef, useState } from 'react';
import { SEARCH_BAR_ID } from '../constants';
import TooltipDialog from '../tooltip-dialog/tooltip-dialog';
import { tooltipMessage } from '@/components/search-bar/constants';

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className }: SearchBarProps) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchBarRef = useRef<HTMLDivElement | null>(null);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }

  return (
    <>
      <div
        className={`${styles.searchBar} ${className} ${hasFocus ? styles.hasFocus : ''}`}
        ref={searchBarRef}
      >
        <input
          id={SEARCH_BAR_ID}
          type="text"
          placeholder="Search"
          className={styles.input}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          onChange={handleSearchChange}
        />
        <Icon
          icon='search'
          className={styles.icon}
        />
      </div>
      {hasFocus && !searchValue && (
        <TooltipDialog
          message={tooltipMessage}
          anchorElement={searchBarRef?.current}
          spacing={8}
          useAnchorElementWidth={true}
        />
      )}
    </>
  )
}

export default SearchBar;