'use client';

import { ClaimCard } from "@/components/claim-card/claim-card";
import styles from "./claims-list.module.css";
import { ClaimVerificationStatusType } from "@core/health-dashboard";

interface ClaimsListProps {
  claims: Promise<unknown>;
}

export const ClaimsList = ({ claims }: Readonly<ClaimsListProps>) => {  
  return (
    <div className={styles.claimsList}>
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
  );
}

const getMockedStatus = (score: number): ClaimVerificationStatusType => {
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
