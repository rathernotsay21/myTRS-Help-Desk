import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './styles.module.css';

const SolutionBlock = ({ 
  number, 
  title, 
  text, 
  isPrimary = false, 
  isAnimated = false 
}) => {
  return (
    <div 
      className={clsx(
        styles['solution-block'],
        isPrimary ? styles['primary-block'] : styles['secondary-block'],
        isAnimated && styles.animate
      )}
    >
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
