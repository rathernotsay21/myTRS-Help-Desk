import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faGear,
  faFileInvoice,
  faQuestion,
  faArrowRight,
  faArrowLeft,
  faEnvelope,
  faPhone,
  faUser,
  faBuilding,
  faCalendarDays,
  faPeopleGroup
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';

// Map of icon names to their imported variables
const iconMap = {
  'circle-info': faCircleInfo,
  'gear': faGear,
  'file-invoice': faFileInvoice,
  'question': faQuestion,
  'arrow-right': faArrowRight,
  'arrow-left': faArrowLeft,
  'envelope': faEnvelope,
  'phone': faPhone,
  'user': faUser,
  'building': faBuilding,
  'calendar-days': faCalendarDays,
  'people-group': faPeopleGroup
};

/**
 * Enhanced FontAwesome Icon component
 * 
 * @param {string} name - Icon name from the available set
 * @param {string} size - Icon size (xs, sm, lg, 1x, 2x, etc.)
 * @param {string} color - Icon color
 * @param {boolean} fixedWidth - Whether the icon should have fixed width
 * @param {boolean} spin - Whether the icon should have a spinning animation
 * @param {boolean} pulse - Whether the icon should have a pulsing animation
 * @param {boolean} withText - Whether the icon is used alongside text (adds right margin)
 * @param {string} className - Additional CSS class names
 */
const FAIcon = ({
  name,
  size = "1x",
  color,
  fixedWidth = false,
  spin = false,
  pulse = false,
  withText = false,
  className,
  ...props
}) => {
  // Check if the requested icon exists in our map
  if (!iconMap[name]) {
    console.warn(`Icon "${name}" not found. Using "question" icon instead.`);
    name = 'question';
  }

  return (
    <span className={clsx(
      styles['icon-wrapper'],
      fixedWidth && styles['fixed-width'],
      withText && styles['with-text'],
      className
    )}>
      <FontAwesomeIcon 
        icon={iconMap[name]}
        size={size}
        style={color ? { color } : undefined}
        spin={spin}
        pulse={pulse}
        fixedWidth={fixedWidth}
        {...props}
      />
    </span>
  );
};

FAIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  fixedWidth: PropTypes.bool,
  spin: PropTypes.bool,
  pulse: PropTypes.bool,
  withText: PropTypes.bool,
  className: PropTypes.string
};

export default FAIcon;
