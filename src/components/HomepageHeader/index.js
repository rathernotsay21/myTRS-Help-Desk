import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const HomepageHeader = ({ 
  primaryText = 'Event Management',
  accentText = 'Made Simple',
  primaryButtonText = 'Request Free Demo',
  primaryButtonUrl = '/contact',
  secondaryButtonText = 'Explore Solutions',
  secondaryButtonUrl = '/docs/intro'
}) => {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <header className={clsx('hero', styles['hero-banner'], 'bg-volunteer-checkin')}>
      <div className="container">
        <Heading as="h1" className={clsx('hero__title', styles['hero-title'])}>
          <span className={styles['primary-text']}>{primaryText} </span>
          <br className={styles['mobile-break']} />
          <span className={styles['accent-text']}>{accentText}</span>
        </Heading>
        <div className={styles.buttons}>
          <Link
            className={`button button--outline-secondary button--lg ${styles['fixed-width-button']}`}
            to={primaryButtonUrl}>
            {primaryButtonText}
          </Link>
          <Link
            className={`button button--secondary button--lg ${styles['fixed-width-button']}`}
            to={secondaryButtonUrl}>
            {secondaryButtonText}
          </Link>
        </div>
      </div>
    </header>
  );
};

HomepageHeader.propTypes = {
  primaryText: PropTypes.string,
  accentText: PropTypes.string,
  primaryButtonText: PropTypes.string,
  primaryButtonUrl: PropTypes.string,
  secondaryButtonText: PropTypes.string,
  secondaryButtonUrl: PropTypes.string
};

export default HomepageHeader;
