import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './styles.module.css';

// Icon components for each service type
const TrainingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.planIcon}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const TestingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.planIcon}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const CustomerServiceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.planIcon}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
);

const OnSiteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.planIcon}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const SolutionBlock = ({ 
  number, 
  title, 
  text, 
  isPrimary = false, 
  isAnimated = false,
  icon = null
}) => {
  // Get icon color and background based on isPrimary
  const iconBackground = isPrimary ? '#fdba74' : '#9FC1FD'; // Orange for primary, blue for secondary
  
  // Function to determine which icon to display based on title or provided icon
  const getPlanIcon = () => {
    if (icon) return icon;
    
    switch(title) {
      case 'Personalized Training':
        return <TrainingIcon />;
      case 'Expert Site Testing':
        return <TestingIcon />;
      case 'Dedicated Customer Service':
        return <CustomerServiceIcon />;
      case 'On-Site Support':
        return <OnSiteIcon />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={clsx(
        styles['solution-block'],
        isPrimary ? styles['primary-block'] : styles['secondary-block'],
        isAnimated && styles.animate
      )}
    >
      <div className={styles['pricing-card-header']}>
        <div 
          className={styles['pricing-icon-wrapper']}
          style={{ backgroundColor: iconBackground }}
        >
          {getPlanIcon()}
        </div>
        <h3 className={styles['block-title']}>{title}</h3>
      </div>
      <p className={styles['block-text']}>{text}</p>
    </div>
  );
};

SolutionBlock.propTypes = {
  number: PropTypes.number,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isPrimary: PropTypes.bool,
  isAnimated: PropTypes.bool,
  icon: PropTypes.node
};

export default SolutionBlock;
