/**
 * This is a placeholder page to avoid Docusaurus errors.
 * The actual lazyComponents logic has been moved to utils/lazyComponents.js
 */

import React from 'react';
import { Redirect } from '@docusaurus/router';

// Simply redirect to the homepage
export default function LazyComponentsPlaceholder() {
  return <Redirect to="/" />;
}
