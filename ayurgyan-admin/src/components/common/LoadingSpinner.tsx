import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  return (
    <div className={`loading-spinner ${className}`}>
      <div className={`spinner spinner-${size}`} />
    </div>
  );
};

export default LoadingSpinner;