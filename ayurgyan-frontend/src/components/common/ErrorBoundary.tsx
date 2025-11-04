import React from 'react';
import { RefreshCw, Home } from 'lucide-react';
import './ErrorBoundary.css';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  navigateToHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />;
      }

      return (
        <div className="error-boundary">
          <div className="error-icon">⚠️</div>
          <h1 className="error-title">Something went wrong</h1>
          <p className="error-description">
            We apologize for the inconvenience. Please try refreshing the page or 
            return to the homepage.
          </p>
          
          <div className="error-actions">
            <button 
              className="btn-retry"
              onClick={this.resetError}
            >
              <RefreshCw size={16} style={{ marginRight: '0.5rem' }} />
              Try Again
            </button>
            <button 
              className="btn-home"
              onClick={this.navigateToHome}
            >
              <Home size={16} style={{ marginRight: '0.5rem' }} />
              Go Home
            </button>
          </div>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className="error-details">
              <details>
                <summary className="error-details-summary">Error Details (Development)</summary>
                <div className="error-details-content">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </div>
              </details>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;