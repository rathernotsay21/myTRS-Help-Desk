import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

/**
 * Simple card component for displaying client types
 *
 * @param {string} text - The text to display in the card
 */
const ClientCard = ({ text }) => {
  return (
    <div className={styles['client-card']}>
      <div className={styles['client-text']}>
        {text}
      </div>
    </div>
  );
};

ClientCard.propTypes = {
  text: PropTypes.string.isRequired
};

export default ClientCard;
