import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import UserFavorites from '../components/user/UserFavorites';

const UserFavoritesPage: React.FC = () => {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <UserFavorites
        favorites={favorites}
        onRemoveFavorite={removeFavorite}
        onClearFavorites={clearFavorites}
      />
    </div>
  );
};

export default UserFavoritesPage;