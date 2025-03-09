import type { Metadata } from "next";
import { baseMetadata, pageName, siteSlogan, siteTitleName, siteTitlePrefix } from "./constants";
import styles from './page.module.css';
import AccessCardsSection from "@/components/access-cards-section/access-cards-section";
import { capitalize } from "@/shared/utils/capitalize";

export const metadata: Metadata = {
  title: baseMetadata.baseTitle.concat(` | ${capitalize(pageName)}`),
  description: `Health dashboard ${pageName}`,
};

export default function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.topSection}>
        <div className={styles.title}>
          <h1>{siteTitlePrefix}</h1>
          <h1 className={styles.siteName}>{siteTitleName}</h1>
        </div>
        <h3 className={styles.slogan}>{siteSlogan}</h3>
      </section>
      <AccessCardsSection />
    </div>
  );
}
