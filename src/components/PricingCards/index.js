// src/components/PricingCards/index.js
import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import clsx from 'clsx';

// Icon components for each plan type (copied from SolutionBlock)
const StandardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles['pricing-svg-icon']}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ExtendedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles['pricing-svg-icon']}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const CustomIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles['pricing-svg-icon']}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);

export default function PricingCards() {
  const pricingPlans = [
    {
      name: 'Standard',
      iconComponent: StandardIcon,
      color: 'blue',
      accentColor: '#2563eb',
      iconBackground: '#9FC1FD',
      description: 'Up to 500 volunteers',
      buttonColor: '#0056b3'
    },
    {
      name: 'Extended',
      iconComponent: ExtendedIcon,
      color: 'green',
      accentColor: '#16a34a',
      iconBackground: '#86efac',
      description: 'Up to 2,000 volunteers',
      buttonColor: '#16a34a'
    },
    {
      name: 'Custom',
      iconComponent: CustomIcon,
      color: 'orange',
      accentColor: '#ea580c',
      iconBackground: '#fdba74',
      description: 'Up to 10,000 volunteers',
      buttonColor: '#ea580c'
    }
  ];

  return (
    <div className={styles['pricing-cards-container']}>
      <div className="container">
        <div className={styles['pricing-cards-grid']}>
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={clsx(
                styles['pricing-card'],
                styles[`card-${plan.color}`]
              )}
            >
              <div 
                className={styles['card-accent']}
                style={{ backgroundColor: plan.accentColor }}
              ></div>
              <div className={styles['pricing-card-content']}>
                <div className={styles['pricing-card-header']}>
                  <div 
                    className={styles['pricing-icon-wrapper']}
                    style={{ backgroundColor: plan.iconBackground }}
                  >
                    <plan.iconComponent />
                  </div>
                  <h3 className={styles['pricing-card-title']}>{plan.name}</h3>
                  <p className={styles['pricing-card-description']}>{plan.description}</p>
                </div>
                
                <div className={styles['pricing-divider']}></div>
                
                <div className={styles['pricing-button-container']}>
                  <Link
                    to="/contact"
                    className={styles['pricing-cta-button']}
                    style={{ backgroundColor: plan.buttonColor, paddingLeft: '16px', paddingRight: '16px' }}
                  >
                    Request Demo
                  </Link>
                </div>
                
                <div className={styles['pricing-features-link']}>
                  <Link 
                    to="/features" 
                    className={styles['pricing-features-text']}
                    style={plan.name !== 'Standard' ? { color: plan.buttonColor } : {}}
                  >
                    See all Features <span className={styles['pricing-arrow']}>↓</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}