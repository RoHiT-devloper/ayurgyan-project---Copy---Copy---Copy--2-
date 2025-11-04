import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizeClass = `spinner-${size}`;

  return (
    <div className={`loading-spinner ${className}`}>
      <div className={`spinner ${sizeClass}`} />
    </div>
  );
};

export default LoadingSpinner;