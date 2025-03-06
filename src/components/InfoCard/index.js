import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

// InfoSection component for each section of the card
const InfoSection = ({ title, content, listItems, contactInfo }) => {
  return (
    <div className={styles['info-section']}>
      <h2 className={styles['info-title']}>{title}</h2>
      
      {content && content.map((paragraph, index) => (
        <p key={index} className={styles['info-content']}>{paragraph}</p>
      ))}
      
      {listItems && listItems.length > 0 && (
        <ul className={styles['info-list']}>
          {listItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      
      {contactInfo && (
        <p className={styles['info-content']}>
          {contactInfo.text}
          <a href={contactInfo.link} className={styles['contact-link']}> {contactInfo.linkText}</a>.
        </p>
      )}
    </div>
  );
};

InfoSection.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.string),
  listItems: PropTypes.arrayOf(PropTypes.string),
  contactInfo: PropTypes.shape({
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired
  })
};

// Main InfoCard component
const InfoCard = ({ sections }) => {
  return (
    <div className={styles['info-card']}>
      {sections.map((section, index) => (
        <InfoSection
          key={index}
          title={section.title}
          content={section.content}
          listItems={section.listItems}
          contactInfo={section.contactInfo}
        />
      ))}
    </div>
  );
};

InfoCard.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.arrayOf(PropTypes.string),
      listItems: PropTypes.arrayOf(PropTypes.string),
      contactInfo: PropTypes.shape({
        text: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        linkText: PropTypes.string.isRequired
      })
    })
  ).isRequired
};

export default InfoCard;
