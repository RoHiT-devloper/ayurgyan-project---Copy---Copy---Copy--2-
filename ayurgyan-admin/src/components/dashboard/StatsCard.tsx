import React from 'react';
import { LucideIcon } from 'lucide-react';
import './StatsCard.css';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'yellow' | 'red';
  description?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  color = 'blue',
  description 
}) => {
  return (
    <div className={`stats-card stats-card-${color}`}>
      <div className="stats-card-content">
        <div className="stats-card-info">
          <h3 className="stats-card-title">{title}</h3>
          <p className="stats-card-value">{value}</p>
          {description && (
            <p className="stats-card-description">{description}</p>
          )}
        </div>
        
        <div className="stats-card-icon">
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;