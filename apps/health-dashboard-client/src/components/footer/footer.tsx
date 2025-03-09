import styles from './footer.module.css';
import { legalDisclaimerLine1, legalDisclaimerLine2, yearWildcard } from '@/components/footer/constants';

export const Footer = () => {
  const year = new Date().getFullYear().toString();

  return (
    <footer className={styles.footer}>
      <div className={styles.legalDisclaimer}>
        <span>{legalDisclaimerLine1.replace(yearWildcard, year)}</span>
        <span>{legalDisclaimerLine2}</span>
      </div>
    </footer>
  );
}