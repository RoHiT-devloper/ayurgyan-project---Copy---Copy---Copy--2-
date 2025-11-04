import React from 'react';
import { Herb } from '../../types/herb';
import HerbCard from './HerbCard';
import './HerbGrid.css';

interface HerbGridProps {
  herbs: Herb[];
  loading?: boolean;
}

const HerbGrid: React.FC<HerbGridProps> = ({ herbs, loading = false }) => {
  if (loading) {
    return (
      <div className="herb-grid grid-loading">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-line short"></div>
            <div className="skeleton-line medium"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line" style={{ width: '70%' }}></div>
          </div>
        ))}
      </div>
    );
  }

  if (herbs.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🌿</div>
        <h3 className="empty-state-title">No herbs found</h3>
        <p className="empty-state-description">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="herb-grid">
      {herbs.map((herb) => (
        <HerbCard key={herb.id} herb={herb} />
      ))}
    </div>
  );
};

export default HerbGrid;