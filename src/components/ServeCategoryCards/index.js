import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import clsx from 'clsx';

/**
 * Component to display categorized client types in cards
 */
const ServeCategoryCards = () => {
  // Category definitions with their respective client types
  const categories = [
    {
      title: 'Events & Sports',
      color: 'blue',
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
      items: [
        'Visitor Bureaus',
        'Destination Management',
        'Tour Operators'
      ]
    },
    {
      title: 'Corporate & Healthcare',
      color: 'orange',
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
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{category.title}</h3>
            <ul className={styles.itemList}>
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex} className={styles.listItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServeCategoryCards;