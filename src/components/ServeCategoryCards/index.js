import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import clsx from 'clsx';

// Icon components for category cards
const EventsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={styles.categoryIcon}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
  </svg>
);

const DestinationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.categoryIcon}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CorporateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.categoryIcon}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

/**
 * Component to display categorized client types in cards
 */
const ServeCategoryCards = () => {
  // Category definitions with their respective client types and icons
  const categories = [
    {
      title: 'Events & Sports',
      color: 'blue',
      icon: <EventsIcon />,
      items: [
        'Local Organizing Committees',
        'Sports Commissions',
        'Event Management',
        'Sports & Event Rights Holders',
        'Governing Bodies'
      ]
    },
    {
      title: 'Destination & Tourism',
      color: 'green',
      icon: <DestinationIcon />,
      items: [
        'Visitor Bureaus',
        'Destination Management',
        'Tour Operators'
      ]
    },
    {
      title: 'Corporate & Healthcare',
      color: 'orange',
      icon: <CorporateIcon />,
      items: [
        'Fortune 500 Businesses',
        'Healthcare Organizations',
        'Medical Organizations',
        'Event Sponsors'
      ]
    }
  ];

  return (
    <div className={styles.cardsContainer}>
      {categories.map((category, index) => (
        <div key={index} className={clsx(
          styles.card,
          styles[`card-${category.color}`]
        )}>
          <div className={styles.cardAccent}></div>
          <div className={styles.cardContent} style={{ position: 'relative', minHeight: '100%' }}>
            <h3 className={styles.cardTitle}>{category.title}</h3>
            <ul className={styles.itemList}>
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex} className={styles.listItem}>
                  {item}
                </li>
              ))}
            </ul>
            <div 
              className={styles.iconWatermark} 
              style={{ 
                position: 'absolute', 
                bottom: '0.5rem', 
                right: '0.5rem', 
                left: 'auto',
                opacity: '0.1',
                zIndex: '1' 
              }}
            >
              {category.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServeCategoryCards;