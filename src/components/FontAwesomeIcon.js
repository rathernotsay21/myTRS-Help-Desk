// This file is deprecated and has been replaced by the FAIcon component.
// Please use the FAIcon component instead.
// This file will be removed in a future update.

import React from 'react';
import FAIcon from './FAIcon';

export default function Icon({name, size = "1x", ...props}) {
  console.warn('FontAwesomeIcon is deprecated. Please use FAIcon component instead.');
  return <FAIcon name={name} size={size} {...props} />;
}