import { pageName as leaderboardPage} from '@/app/leaderboard/constants';
import { pageName as claimsPage } from '@/app/claims/constants';
import styles from './navigation-items.module.css';
import { capitalize } from '@/shared/utils/capitalize';
import { pageName as homePage } from '@/app/constants';

interface NavigationItemsProps {
  className?: string;
}

const NavigationItems = ({ className }: Readonly<NavigationItemsProps>) => {
  return (
    <div className={`${styles.navigationItems} ${className}`}>
      <a href='/'>{capitalize(homePage)}</a>
      <a href={claimsPage}>{capitalize(claimsPage)}</a>
      <a href={leaderboardPage}>{capitalize(leaderboardPage)}</a>
    </div>
  );
}

export default NavigationItems;