import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const HomepageHeader = () => {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <header className={styles['hero-banner']}>
      <div className={clsx('container', styles['split-container'])}>        
        <div className={styles['text-column']}>
          <Heading as="h1" className={styles['hero-title']}>
          Event and Volunteer Management made simple.
          </Heading>
          <p className={styles['hero-text']}>
          Build and customize the registration process. Grow a unique volunteer database across events and for the future. Utilize your registrant, event, and financial data for reporting before, during, and after events. <Link to="/features" className={styles['text-link']}>volunteer management software</Link>.
          </p>
                   <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              style={{ width: "180px" }}
              to="/contact">
              Request Demo
            </Link>
            <Link
              className="button button--outline-secondary button--lg"
              style={{ width: "180px" }}
              to="/docs/intro">
              Explore Solutions
            </Link>
          </div>
        </div>
        <div className={styles['image-column']}>
          <div 
            className={styles['image-container']} 
            style={{
              backgroundImage: 'url(/img/event_photos/hands_computer.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '350px',
              borderRadius: '8px'
            }}
          ></div>
        </div>
      </div>
    </header>
  );
};

// No PropTypes needed anymore as we're using hardcoded values

export default HomepageHeader;
