// src/components/ErrorBoundary/index.js
import React from 'react';

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
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || (
        <div style={{ 
          padding: '20px', 
          margin: '20px', 
          border: '1px solid #f56565', 
          borderRadius: '5px',
          backgroundColor: '#fff5f5'
        }}>
          <h2 style={{ color: '#c53030' }}>Something went wrong</h2>
          <p>The component could not be loaded. Please try refreshing the page.</p>
          {this.state.error && (
            <details style={{ whiteSpace: 'pre-wrap' }}>
              <summary>Error details</summary>
              {this.state.error.toString()}
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;