import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Add all solid icons to the library
library.add(fas);

/**
 * Standardized Icon component that uses FontAwesome
 * 
 * @param {string} name - The icon name (e.g., 'phone', 'envelope', etc.)
 * @param {string} size - The size of the icon (xs, sm, lg, 2x, etc.)
 * @param {string} color - The color of the icon (can be any valid CSS color)
 * @param {string} className - Additional CSS classes to apply
 */
const Icon = ({ 
  name, 
  size = 'lg', 
  color = 'inherit', 
  className = '',
  ...props 
}) => {
  // Handle both array format ['fas', 'phone'] and string format 'phone'
  const iconDef = name.includes(' ') ? name.split(' ') : ['fas', name];
  
  return (
    <FontAwesomeIcon 
      icon={iconDef}
      size={size}
      style={{ color }}
      className={className}
      {...props}
    />
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default Icon;
