'use client';

import styles from './header.module.css';
import SearchBar from '../search-bar/search-bar';
import NavigationItems from '@/components/navigation-items/navigation-items';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { IconButton } from '@/components/buttons/icon-button/icon-button';
import { useState } from 'react';
import { NavigationMenu } from '@/components/navigation-menu/navigation-menu';

export const Header = () => {
  const { isTabletPortrait } = useBreakpoint();
  const [isNavigationMenuOpen, setIsNavigationMenuOpen] = useState(false);

  const handleNavigationMenuClick = () => {
    setIsNavigationMenuOpen(prev => !prev);
  };

  const handleBackdropClick = () => {
    setIsNavigationMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      {
        isTabletPortrait ?
        <NavigationItems /> :
        <IconButton
          testId='navigation-menu-button'
          icon='line3'
          onClick={handleNavigationMenuClick}
          ariaLabel='navigation-menu-button'
        />
      }
      <SearchBar className={styles.searchBar}/>
      { isNavigationMenuOpen && <NavigationMenu onBackdropClick={handleBackdropClick}/> }
    </header>
  );
}