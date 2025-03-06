import React from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

/**
 * LoadingSpinner component that displays during lazy loading
 * 
 * @param {Object} props - Component props
 * @param {string} props.size - Size of the spinner ('sm', 'md', 'lg')
 * @param {string} props.color - Color theme of the spinner ('primary', 'secondary', 'light')
 * @param {string} props.text - Optional text to display with the spinner
 * @param {string} props.className - Additional CSS class
 * @returns {JSX.Element} Loading spinner component
 */
const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary', 
  text = 'Loading...', 
  className = '',
  fullPage = false,
  ...props 
}) => {
  // Determine size class
  const sizeClass = {
    sm: styles.spinnerSm,
    md: styles.spinnerMd,
    lg: styles.spinnerLg
  }[size] || styles.spinnerMd;
  
  // Determine color class
  const colorClass = {
    primary: styles.spinnerPrimary,
    secondary: styles.spinnerSecondary,
    light: styles.spinnerLight
  }[color] || styles.spinnerPrimary;
  
  const spinner = (
    <div 
      className={clsx(
        styles.spinnerContainer,
        className,
        fullPage && styles.fullPage
      )}
      {...props}
    >
      <div className={clsx(styles.spinner, sizeClass, colorClass)}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {text && <div className={styles.spinnerText}>{text}</div>}
    </div>
  );
  
  if (fullPage) {
    return (
      <div className={styles.fullPageWrapper}>
        {spinner}
      </div>
    );
  }
  
  return spinner;
};

export default LoadingSpinner;
