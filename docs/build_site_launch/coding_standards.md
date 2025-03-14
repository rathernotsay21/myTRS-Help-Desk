---
sidebar_position: 4
title: Coding Standards
---

# Coding Standards

This document outlines the coding standards and best practices for the myTRS-Help-Desk project. Following these guidelines ensures consistency across the codebase and makes it easier for team members to collaborate.

## Component Structure

All React components should follow a standardized structure:

```
ComponentName/
  ├── index.js            # Main component file
  └── styles.module.css   # CSS Module for component styles
```

## Naming Conventions

* **Component Files**: Use camelCase for component directories and files (e.g., `ButtonGroup`, `CardList`)
* **CSS Classes**: Use kebab-case for CSS class names (e.g., `button-primary`, `card-header`)
* **Documentation Files**: Use snake_case for documentation files to maintain consistency with existing patterns (e.g., `coding_standards.md`, `getting_started.md`)

## CSS Modules

* Use CSS Modules for component-specific styles
* Keep CSS classes specific to the component
* Use the established CSS variables for consistent styling:

```css
.my-component {
  color: var(--my-trs-text);
  padding: var(--my-trs-space-md);
  margin-bottom: var(--my-trs-space-lg);
  border-radius: var(--my-trs-border-radius-md);
  box-shadow: var(--my-trs-shadow-md);
}
```

## React Components

* Use functional components with hooks for new components
* Add PropTypes for all component props
* Use destructuring for props
* Add JSDoc comments for component documentation

Example:

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

/** * Button component with various variants and sizes
* * @param {string} variant - Button variant (primary, secondary, etc.)
* @param {string} size - Button size (sm, md, lg)
* @param {ReactNode} children - Button content
 */
const Button = ({ 
  variant = 'primary',
  size = 'md',
  children,
  ...props
}) => {
  return (
    <button 
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  children: PropTypes.node.isRequired
};

export default Button;
```

## Accessibility

* Use semantic HTML elements whenever possible
* Include proper ARIA attributes for interactive elements
* Ensure sufficient color contrast
* Make sure all interactive elements have keyboard support
* Include focus styles for all interactive elements

## Documentation

* Document all components with JSDoc comments
* Include examples of how to use the component
* Document all props with their types and default values

## Reusable Components

Use the established reusable components for consistency:

* **Button**: For all buttons and links that look like buttons
* **Card**: For card-style containers
* **Section**: For section layouts
* **Icon**: For Font Awesome icons
* **Image**: For responsive images with lazy loading

## Linting and Formatting

Run linting and formatting before committing:

```bash
# Run ESLint
npm run lint

# Run Prettier
npm run format
```
