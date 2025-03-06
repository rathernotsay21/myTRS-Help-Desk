import React from 'react';
import styles from './styles.module.css';

const ClientCard = ({ text }) => {
  return (
    <div className={styles['client-card']}>
      <div className={styles['client-text']}>
        {text}
      </div>
    </div>
  );
};

export default ClientCard;
