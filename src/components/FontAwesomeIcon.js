import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faGear,
  faFileInvoice,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons';

// Map of icon names to their imported variables
const iconMap = {
  'circle-info': faCircleInfo,
  'gear': faGear,
  'file-invoice': faFileInvoice,
  'question': faQuestion
};

export default function Icon({name, size = "1x", ...props}) {
  // Use the mapped icon directly
  return <FontAwesomeIcon icon={iconMap[name]} size={size} {...props} />;
}