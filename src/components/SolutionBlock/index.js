import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './styles.module.css';

// Icon components for each plan type
const StandardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.planIcon}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ExtendedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.planIcon}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const CustomIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.planIcon}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);

const SolutionBlock = ({ 
  number, 
  title, 
  text, 
  isPrimary = false, 
  isAnimated = false 
}) => {
  // Function to determine which icon to display based on title
  const getPlanIcon = () => {
    switch(title) {
      case 'Standard':
        return <StandardIcon />;
      case 'Extended':
        return <ExtendedIcon />;
      case 'Custom':
        return <CustomIcon />;
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
      <div className={styles['block-icon']}>{getPlanIcon()}</div>
      <div className={styles['block-number']}>{number.toString().padStart(2, '0')}</div>
      <h3 className={styles['block-title']}>{title}</h3>
      <p className={styles['block-text']}>{text}</p>
    </div>
  );
};

SolutionBlock.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isPrimary: PropTypes.bool,
  isAnimated: PropTypes.bool
};

export default SolutionBlock;
