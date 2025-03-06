import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './styles.module.css';

/**
 * Card component for displaying content in a contained, styled box
 *
 * @param {ReactNode} children - Card content
 * @param {string} title - Card title
 * @param {string} subtitle - Card subtitle
 * @param {string} imageSrc - URL for the card image
 * @param {string} imageAlt - Alt text for the card image
 * @param {string} imagePosition - Position of the image (top, bottom)
 * @param {ReactNode} footer - Footer content
 * @param {string} variant - Card variant (primary, secondary, success, info, warning, danger)
 * @param {boolean} isHoverable - Whether the card should have hover effects
 * @param {string} borderPosition - Position of the colored border (left, top, none)
 * @param {function} onClick - Click handler
 * @param {string} className - Additional CSS class names
 */
const Card = ({
  children,
  title,
  subtitle,
  imageSrc,
  imageAlt = '',
  imagePosition = 'top',
  footer,
  variant = 'primary',
  isHoverable = true,
  borderPosition = 'none',
  onClick,
  className,
  ...props
}) => {
  // Determine card classes
  const cardClasses = clsx(
    styles.card,
    isHoverable && styles['card-hover'],
    borderPosition === 'left' && styles['card-border-left'],
    borderPosition === 'top' && styles['card-border-top'],
    variant && styles[variant],
    className
  );

  // Render image if provided
  const renderImage = () => {
    if (!imageSrc) return null;
    
    return (
      <img 
        src={imageSrc}
        alt={imageAlt}
        className={clsx(
          styles['card-image'],
          imagePosition === 'top' ? styles['card-image-top'] : styles['card-image-bottom']
        )}
        loading="lazy"
      />
    );
  };

  return (
    <div 
      className={cardClasses}
      onClick={onClick}
      {...props}
    >
      {imagePosition === 'top' && renderImage()}
      
      {(title || subtitle) && (
        <div className={styles['card-header']}>
          {title && <h3 className={styles['card-title']}>{title}</h3>}
          {subtitle && <div className={styles['card-subtitle']}>{subtitle}</div>}
        </div>
      )}
      
      <div className={styles['card-body']}>
        {typeof children === 'string' ? (
          <p className={styles['card-text']}>{children}</p>
        ) : (
          children
        )}
      </div>
      
      {footer && (
        <div className={styles['card-footer']}>
          {footer}
        </div>
      )}
      
      {imagePosition === 'bottom' && renderImage()}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  imagePosition: PropTypes.oneOf(['top', 'bottom']),
  footer: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'info', 'warning', 'danger']),
  isHoverable: PropTypes.bool,
  borderPosition: PropTypes.oneOf(['none', 'left', 'top']),
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default Card;
