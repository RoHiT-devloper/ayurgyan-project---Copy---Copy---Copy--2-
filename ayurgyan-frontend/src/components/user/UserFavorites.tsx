import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Trash2, Search, Scale } from 'lucide-react';
import { Herb } from '../../types/herb';
import { getSafetyLevelInfo } from '../../utils/helpers';
import './UserFavorites.css';

interface UserFavoritesProps {
  favorites: Herb[];
  onRemoveFavorite: (herbId: number) => void;
  onClearFavorites: () => void;
  onCompareHerbs?: (herbIds: number[]) => void;
}

const UserFavorites: React.FC<UserFavoritesProps> = ({
  favorites,
  onRemoveFavorite,
  onClearFavorites,
  onCompareHerbs
}) => {
  const navigate = useNavigate();

  const handleRemoveFavorite = (herbId: number) => {
    onRemoveFavorite(herbId);
  };

  const handleCompare = (herbId: number) => {
    if (onCompareHerbs) {
      onCompareHerbs([herbId]);
    }
  };

  const handleBrowseHerbs = () => {
    navigate('/herbs');
  };

  const handleViewDetails = (herbId: number) => {
    navigate(`/herbs/${herbId}`);
  };

  if (favorites.length === 0) {
    return (
      <div className="empty-favorites">
        <div className="empty-favorites-icon">💚</div>
        <h3 className="empty-favorites-title">No Favorites Yet</h3>
        <p className="empty-favorites-description">
          Start exploring herbs and add your favorites to this list for quick access.
        </p>
        <button 
          className="btn-browse-herbs"
          onClick={handleBrowseHerbs}
        >
          <Search size={16} style={{ marginRight: '0.5rem' }} />
          Browse Herbs
        </button>
      </div>
    );
  }

  return (
    <div className="favorites-section">
      <div className="favorites-header">
        <h2 className="favorites-title">
          My Favorite Herbs ({favorites.length})
        </h2>
        <div className="favorites-actions">
          {onCompareHerbs && (
            <button 
              className="btn-compare"
              onClick={() => onCompareHerbs(favorites.map(f => f.id))}
            >
              <Scale size={14} style={{ marginRight: '0.25rem' }} />
              Compare All
            </button>
          )}
          <button 
            className="btn-clear-favorites"
            onClick={onClearFavorites}
          >
            <Trash2 size={16} style={{ marginRight: '0.5rem' }} />
            Clear All
          </button>
        </div>
      </div>

      <div className="favorites-grid">
        {favorites.map(herb => {
          const safetyInfo = getSafetyLevelInfo(herb.safetyLevel);
          
          return (
            <div key={herb.id} className="favorite-card">
              <div className="favorite-card-header">
                <h3 className="favorite-card-title">{herb.name}</h3>
                <button
                  className="remove-favorite-btn"
                  onClick={() => handleRemoveFavorite(herb.id)}
                  title="Remove from favorites"
                >
                  <Heart size={18} fill="currentColor" />
                </button>
              </div>
              
              <div className="favorite-card-content">
                {herb.scientificName && (
                  <p className="favorite-scientific-name">{herb.scientificName}</p>
                )}
                <p className="favorite-description">{herb.description}</p>
              </div>
              
              <div className="favorite-card-footer">
                <span className={`favorite-safety-badge badge-${safetyInfo.color}`}>
                  {safetyInfo.label}
                </span>
                <div className="favorite-actions">
                  {onCompareHerbs && (
                    <button 
                      className="btn-compare"
                      onClick={() => handleCompare(herb.id)}
                    >
                      <Scale size={14} />
                    </button>
                  )}
                  <button 
                    className="view-details-link"
                    onClick={() => handleViewDetails(herb.id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserFavorites;