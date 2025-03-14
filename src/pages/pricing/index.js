import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import featuresStyles from '../features/styles.module.css';
import clsx from 'clsx';
import PackageDetails from '@site/src/components/PackageDetails';
import { packagePlans, additionalServices } from '@site/src/data/pricingData';

const PricingPage = () => {
  return (
    <Layout
      title="Pricing"
      description="myTRS Pricing Plans - Flexible plans to meet your volunteer management needs">
      <main className={styles.pricingPage}>
        {/* Hero Section with Background Image - Consistent with Features/Contact pages */}
        <div className={clsx(featuresStyles.heroWrapper, 'bg-special-olympics-before')}>
          <div className={featuresStyles.hero}>
            <div className="container">
              <h1 className={featuresStyles.heroTitle}>Pricing Plans</h1>
              <p className={featuresStyles.heroSubtitle}>Flexible plans to meet your volunteer management needs</p>
            </div>
          </div>
        </div>
      
        <div className={styles.container}>
          {/* Package Details Section */}
          <PackageDetails packageData={packagePlans} additionalServices={additionalServices} />
          
          {/* Enhanced CTA Section - Consistent with Features page */}
          <div className="container" style={{ marginTop: 'var(--my-trs-space-xl)', marginBottom: 'var(--my-trs-space-xl)' }}>
            <div className={clsx(featuresStyles.ctaSection, 'bg-special-olympics-before')}>
              <div className={featuresStyles.ctaContent}>
                <h2 className={featuresStyles.ctaTitle}>Ready to get started?</h2>
                <p className={featuresStyles.ctaText}>Contact our team to discuss which plan is best for your needs.</p>
                <Link to="/contact" className={featuresStyles.ctaButton}>
                  Contact Us
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16" fill="currentColor" style={{ marginLeft: '10px' }} aria-hidden="true">
                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default PricingPage;