import NavigationItems from '@/components/navigation-items/navigation-items';
import styles from './navigation-menu.module.css';

interface NavigationMenuProps {
  onBackdropClick: () => void;
}

export const NavigationMenu = ({ onBackdropClick }: Readonly<NavigationMenuProps>) => {
  return (
    <>
      <div className={styles.navigationMenu}>
        <NavigationItems className={styles.navigationItems}/>
      </div>
      <div className={styles.backdrop} onClick={onBackdropClick}/>
    </>
  );
}