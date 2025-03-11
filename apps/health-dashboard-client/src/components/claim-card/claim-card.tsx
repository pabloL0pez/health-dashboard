'use client';

import { capitalize } from '@/shared/utils/capitalize';
import styles from './claim-card.module.css';
import buttonStyles from '@/components/buttons/button.module.css';
import { Claim } from "@/core/types";
import Icon from '@/components/icon/icon';
import { useState } from 'react';
import { ScoreCounter } from '@/components/claim-card/score-counter/score-counter';
import { Button } from '@/components/buttons/button';
import React from 'react';

interface iClaimCard {
  influencerName: string;
  index: number;
}

interface ButtonParams {
  testId: string;
  position: string;
  label: string;
  iconPosition?: string;
}

type ClaimCardProps = Claim & iClaimCard;

const quoteWildcard = "“{{quote}}”"
const readScoreSummary = "Read score summary";
const readInfluencerQuote = "Back to quote";

export const ClaimCard = React.memo(({ index, categories, quote, influencerName, date, verification }: Readonly<ClaimCardProps>) => {
  const [isScoreSummaryActive, setIsScoreSummaryActive] = useState(false);

  const renderQuote = () => (
    <div className={`${styles.quoteContainer} ${styles.contentContainer}`}>
      <div className={styles.categoriesContainer}>
        {categories.map((category) => (
          <div
            key={`${index}-${category}`}
            className={styles.category}
          >
            {capitalize(category)}
          </div>
        ))}
      </div>
      <span className={styles.quote}>{quoteWildcard.replace("{{quote}}", quote)}</span>
      <span className={styles.influencer}>- {influencerName}{date && `, ${date}`}</span>

      {renderButton({ testId: 'read-score-summary', position: styles.toggleRight, label: readScoreSummary })}
    </div>
  );

  const renderScoreSummary = () => {
    return (
      <div className={`${styles.verificationContainer} ${styles.contentContainer}`}>
        <span className={styles.description}>{verification.description}</span>
        <ul className={styles.sourcesContainer}>
          {verification.sources.map((source, index) => (
            <li key={`${index}-${source.source}`} className={styles.source}>
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {source.source}
              </a>
            </li>
          ))}
        </ul>

        {renderButton({ testId: 'read-influencer-quote', position: styles.toggleLeft, label: readInfluencerQuote, iconPosition: styles.rotateToggleIcon })}
      </div>
    );
  }

  const renderButton = ({ testId, position, label, iconPosition }: Readonly<ButtonParams>) => {
    return (
      <Button
        testId={`${index}-${testId}`}
        className={`${styles.toggle} ${buttonStyles.primary} ${position}`}
        onClick={() => setIsScoreSummaryActive(!isScoreSummaryActive)}
      >
        <span className={styles.toggleLabel}>{label}</span>
        <Icon icon='caret-down' className={`${styles.toggleIcon} ${iconPosition}`}/>
      </Button>
    );
  }

  return (
    <div className={styles.claimCard}>
      <div className={`${styles.content} ${isScoreSummaryActive ? styles.slideContent : ''}`}>
        {renderQuote()}
        {renderScoreSummary()}
      </div>

      <ScoreCounter
        score={verification.score}
        status={verification.status}
      />
    </div>
  );
});