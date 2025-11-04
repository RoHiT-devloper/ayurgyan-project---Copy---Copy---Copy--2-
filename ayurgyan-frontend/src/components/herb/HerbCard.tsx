import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Herb } from '../../types/herb';
import { getSafetyLevelInfo } from '../../utils/helpers';
import { useFavorites } from '../../context/FavoritesContext';
import './HerbCard.css';

interface HerbCardProps {
  herb: Herb;
}

const HerbCard: React.FC<HerbCardProps> = ({ herb }) => {
  const safetyInfo = getSafetyLevelInfo(herb.safetyLevel);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite(herb.id)) {
      removeFavorite(herb.id);
    } else {
      addFavorite(herb);
    }
  };

  return (
    <div className="herb-card">
      <div className="herb-card-content">
        {/* Header */}
        <div className="herb-card-header">
          <h3 className="herb-name">{herb.name}</h3>
          <div className="herb-card-actions">
            <span className={`badge badge-${safetyInfo.color}`}>
              {safetyInfo.label}
            </span>
            <button
              className={`favorite-btn ${isFavorite(herb.id) ? 'active' : ''}`}
              onClick={handleFavoriteClick}
              title={isFavorite(herb.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart size={18} fill={isFavorite(herb.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Scientific Name */}
        {herb.scientificName && (
          <p className="herb-scientific-name">{herb.scientificName}</p>
        )}

        {/* Description */}
        <p className="herb-description">{herb.description}</p>

        {/* Stats */}
        <div className="herb-stats">
          <span>
            {herb.medicinalUses.length} medicinal use{herb.medicinalUses.length !== 1 ? 's' : ''}
          </span>
          <span>
            {herb.scientificStudies.length} study{herb.scientificStudies.length !== 1 ? 'ies' : ''}
          </span>
        </div>

        {/* Action */}
        <Link
          to={`/herbs/${herb.id}`}
          className="herb-action btn btn-primary"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default HerbCard;