// src/components/ErrorBoundary/index.js
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

/**
 * Error Boundary component to catch JavaScript errors in child components
 * and display a fallback UI instead of crashing the entire application
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    
    // Log to analytics or error reporting service if available
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided, otherwise show default error message
      return this.props.fallback || (
        <div className={styles['error-container']} role="alert" aria-live="assertive">
          <h2 className={styles['error-title']}>{this.props.title || 'Something went wrong'}</h2>
          <p className={styles['error-message']}>
            {this.props.message || 'The component could not be loaded. Please try refreshing the page.'}
          </p>
          {this.state.error && (
            <details className={styles['error-details']}>
              <summary>Error details</summary>
              {this.state.error.toString()}
            </details>
          )}
          {this.props.showReset && (
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="button button--primary"
            >
              Try again
            </button>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
  title: PropTypes.string,
  message: PropTypes.string,
  showReset: PropTypes.bool,
  onError: PropTypes.func
};

export default ErrorBoundary;