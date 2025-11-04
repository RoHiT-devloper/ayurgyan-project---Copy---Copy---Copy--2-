import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  const cardClass = hover ? 'card card-hover' : 'card';
  
  return (
    <div className={`${cardClass} ${className}`}>
      {children}
    </div>
  );
};

export default Card;