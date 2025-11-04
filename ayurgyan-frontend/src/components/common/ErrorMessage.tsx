import React from 'react';
import { AlertTriangle, Info, XCircle, RefreshCw } from 'lucide-react';
import './ErrorMessage.css';

export type ErrorType = 'error' | 'warning' | 'info';

interface ErrorMessageProps {
  type?: ErrorType;
  title?: string;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  showIcon?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  type = 'error',
  title,
  message,
  onRetry,
  onDismiss,
  showIcon = true
}) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <AlertTriangle size={20} />;
      case 'info':
        return <Info size={20} />;
      default:
        return <XCircle size={20} />;
    }
  };

  const getDefaultTitle = () => {
    switch (type) {
      case 'warning':
        return 'Warning';
      case 'info':
        return 'Information';
      default:
        return 'Error';
    }
  };

  return (
    <div className={`error-message ${type}`}>
      <div className="error-header">
        {showIcon && <span className="error-icon">{getIcon()}</span>}
        <h4 className="error-title">{title || getDefaultTitle()}</h4>
      </div>
      <p className="error-description">{message}</p>
      {(onRetry || onDismiss) && (
        <div className="error-actions">
          {onRetry && (
            <button className="btn-error-action" onClick={onRetry}>
              <RefreshCw size={14} style={{ marginRight: '0.25rem' }} />
              Retry
            </button>
          )}
          {onDismiss && (
            <button className="btn-error-action" onClick={onDismiss}>
              Dismiss
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;