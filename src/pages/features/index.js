import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TestimonialCarousel from '@site/src/components/TestimonialCarousel';

// Import lazy-loaded components
import {
  FeatureCards,
  ServicesSection
} from '../../utils/lazyComponents';

export default function Features() {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title="Features"
      description="Explore the powerful features of myTRS registration management platform">
      <main className={styles.featuresPage}>
        {/* Hero Section with Background Image */}
        <div className={clsx(styles.heroWrapper, 'bg-special-olympics-before')}>
          <div className={styles.hero}>
            <div className="container">
              <h1 className={styles.heroTitle}>Powerful Event Management Features</h1>
              <p className={styles.heroSubtitle}>Discover how myTRS simplifies volunteer management with our comprehensive suite of tools</p>
            </div>
          </div>
        </div>

        <div className="container">
          <div className={styles.introSection}>
            <div className={styles.introContent}>
              <h2 className={styles.sectionTitle}>Streamlined Solutions for Every Event</h2>
              <div className={styles.titleUnderline}></div>
              <p className={styles.introText}>
             myTRS combines intuitive design with robust functionality to help you manage registrations, scheduling, communication and reporting with ease. Save time and reduce effort by cloning your registration sites year after year. Duplicate your existing setup, including all settings, structures and questions. Simply update your branding and scheduling details. We provide templates from similar events to help you get started. Your registrant data is always secure and not included in the cloning process.</p>
            </div>
          </div>

          <FeatureCards />
          
          <ServicesSection />

          <div className={styles.testimonialSection}>
            <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
            <div className={styles.titleUnderline}></div>
            <TestimonialCarousel />
          </div>



          {/* Enhanced CTA Section */}
          <div className={clsx(styles.ctaSection, 'bg-special-olympics-before')}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to see myTRS in action?</h2>
              <p className={styles.ctaText}>Schedule a personalized demo and discover how myTRS can transform your event management process.</p>
              <Link to="/contact" className={styles.ctaButton}>
                Request Free Demo
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16" fill="currentColor" style={{ marginLeft: '10px' }} aria-hidden="true">
                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}