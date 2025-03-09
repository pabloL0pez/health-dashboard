import styles from './page.module.css';
import type { Metadata } from "next";
import { baseMetadata } from "@/app/constants";
import { capitalize } from "@/shared/utils/capitalize";
import { pageName } from "@/app/claims/constants";
import { ClaimCard } from "@/components/claim-card/claim-card";
import { ClaimVerificationStatus } from '@/core/types';
import { FiltersWidget } from '@/components/filters-widget/filters-widget';
import { FiltersProvider, ClaimsProvider } from '@/contexts';

export const metadata: Metadata = {
  title: baseMetadata.baseTitle.concat(` | ${capitalize(pageName)}`),
  description: `Health dashboard ${pageName}`,
};

const Claims = () => {
  return (
    <FiltersProvider>
      <ClaimsProvider>
        <div className={styles.page}>
          <FiltersWidget/>
          <div className={styles.claims}>
            {[...Array(10).keys()].map((index) => {
              const score = 100 - (index * 10);

              return (
                <ClaimCard
                  key={`${index}-claim-card`}
                  index={index}
                  categories={['cardiovascular-health', 'education']}
                  quote='Stress relief through deep breathing and gentle movement encourages relaxation and reduces stress hormones.'
                  influencerName='Massy Arias'
                  date='May, 2024'
                  source={{
                    source: 'Massy\'s Mobility and Mental Health Video Series',
                    url: 'https://www.massyarias.com/massys-mobility-mental-health-video-series/',
                  }}
                  verification={{
                    score: score,
                    status: getMockedStatus(score),
                    description: 'The claim is supported by robust scientific evidence. Studies consistently show that deep breathing exercises effectively reduce stress and stress hormones by promoting relaxation and decreasing cortisol levels.',
                    sources: [
                      { source: 'Research: Why Breathing Is So Effective at Reducing Stress', url: 'https://hbr.org/2020/09/research-why-breathing-is-so-effective-at-reducing-stress'},
                      { source: 'The Effect of Breathing Exercise on Stress Hormones', url: 'https://cyprusjmedsci.com/articles/the-effect-of-breathing-exercise-on-stress-hormones/doi/cjms.2021.2020.2390'},
                    ]
                  }}
                />
              )
            })}
          </div>
        </div>
      </ClaimsProvider>
    </FiltersProvider>
  );
}

const getMockedStatus = (score: number): ClaimVerificationStatus => {
  if (!score) {
    return 'unverified';
  }

  if (score >= 81) {
    return 'confirmed'
  }

  if (score >= 51) {
    return 'questionable'
  }

  return 'debunked';
}

export default Claims;