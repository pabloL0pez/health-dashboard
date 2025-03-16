import { capitalize } from '@/shared/utils/capitalize';
import styles from './score-counter.module.css';
import { ClaimVerificationStatusType } from '@core/health-dashboard';

interface ScoreCounterProps {
  score: number;
  status: ClaimVerificationStatusType;
}

export const ScoreCounter = ({ score, status }: ScoreCounterProps) => {
  return (
    <div className={`${styles.scoreContainer} ${styles[status]}`}>
      <span className={styles.score}>{status === 'unverifiable' || status === 'unverified' ? '--' : score}</span>
      <span className={styles.status}>{capitalize(status)}</span>
    </div>
  );
}