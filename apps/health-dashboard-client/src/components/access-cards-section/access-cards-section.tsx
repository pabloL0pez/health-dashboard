'use client';

import styles from './access-cards-section.module.css';
import AccessCard from "../access-card/access-card";
import { useRouter } from 'next/navigation';
import { SEARCH_BAR_ID } from '../constants';

const AccessCardsSection = () => {
  const router = useRouter();
  
  return (
    <section className={styles.accessCardsSection}>
      <AccessCard
        title="Search health influencers"
        description="Look for a specific health influencer in our AI powered search"
        onClick={() => document.getElementById(SEARCH_BAR_ID)?.focus()}
        icon='search'
      />
      <AccessCard
        title="Reliable health claims "
        description="Read the latest AI fact checked claims made by top influencers"
        onClick={() => router.push('/claims')}
        icon='check'
      />
      <AccessCard
        title="Top health influencers"
        description="Discover the top health influencers of the moment"
        onClick={() => router.push('/leaderboard')}
        icon='flame'
      />
    </section>
  );
}

export default AccessCardsSection;