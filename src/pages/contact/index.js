import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ErrorBoundary from '@site/src/components/ErrorBoundary';
import styles from '../features/styles.module.css'; // Use the features page styles

// Import lazy-loaded components
import { DemoForm } from '../../utils/lazyComponents';

export default function Contact() {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title="Contact Us"
      description="Get in touch with the myTRS team for support, questions, and demo requests">
      
      {/* Hero Section with Background Image - Matching Features page */}
      <div className={styles.heroWrapper}>
        <div className={styles.hero}>
          <div className="container">
            <h1 className={styles.heroTitle}>Contact Us</h1>
            <p className={styles.heroSubtitle}>
              Have questions or need assistance? Reach out to our team for personalized support.
            </p>
          </div>
        </div>
      </div>

      <main className={styles.featuresPage}>
        <div className={styles.whyTrsSection}>
        <div className="container">
          <div className="row">
            <div className="col col--10 col--offset-1">
              <div className="trs-card" style={{ padding: 'var(--my-trs-space-xl)', marginBottom: 'var(--my-trs-space-xxl)' }}>
                <DemoForm />
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>
    </Layout>
  );
}