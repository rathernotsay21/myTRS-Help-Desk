import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from '@docusaurus/Link';
import styles from './styles.module.css';

/**
 * Button component that can render as a button or a link
 *
 * @param {string} variant - Button variant (primary, secondary, outline-primary, outline-secondary, text)
 * @param {string} size - Button size (sm, md, lg)
 * @param {string} href - URL to navigate to (renders as Link if provided)
 * @param {boolean} fullWidth - Whether the button should take full width
 * @param {boolean} fixedWidth - Whether the button should have a fixed width (220px)
 * @param {boolean} isLoading - Whether to show loading indicator
 * @param {ReactNode} children - Button content
 * @param {ReactNode} iconLeft - Icon to display on the left side
 * @param {ReactNode} iconRight - Icon to display on the right side
 * @param {string} className - Additional CSS class names
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  href,
  fullWidth = false,
  fixedWidth = false,
  isLoading = false,
  children,
  iconLeft,
  iconRight,
  className,
  ...props
}) => {
  // Combine class names
  const buttonClasses = clsx(
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles['full-width'],
    fixedWidth && styles['fixed-width'],
    isLoading && styles.loading,
    props.disabled && styles.disabled,
    className
  );

  // Button content with optional icons
  const buttonContent = (
    <>
      {iconLeft && <span className={styles['icon-left']}>{iconLeft}</span>}
      {children}
      {iconRight && <span className={styles['icon-right']}>{iconRight}</span>}
    </>
  );

  // Render as link if href is provided
  if (href) {
    return (
      <Link
        href={href}
        className={buttonClasses}
        {...props}
      >
        {buttonContent}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button
      className={buttonClasses}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {buttonContent}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline-primary', 'outline-secondary', 'text']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  href: PropTypes.string,
  fullWidth: PropTypes.bool,
  fixedWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  iconLeft: PropTypes.node,
  iconRight: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string
};

export default Button;
