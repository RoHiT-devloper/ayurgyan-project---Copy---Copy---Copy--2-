import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Herb } from '../types/herb';
import { useAnalytics } from '../hooks/useAnalytics';

interface FavoritesContextType {
  favorites: Herb[];
  addFavorite: (herb: Herb) => void;
  removeFavorite: (herbId: number) => void;
  clearFavorites: () => void;
  isFavorite: (herbId: number) => boolean;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Herb[]>([]);
  const { trackFavorite } = useAnalytics();

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('ayurgyan-favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('ayurgyan-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (herb: Herb) => {
    setFavorites(prev => {
      if (prev.find(f => f.id === herb.id)) {
        return prev; // Already in favorites
      }
      trackFavorite(herb.id, herb.name, 'add');
      return [...prev, herb];
    });
  };

  const removeFavorite = (herbId: number) => {
    setFavorites(prev => {
      const herb = prev.find(f => f.id === herbId);
      if (herb) {
        trackFavorite(herbId, herb.name, 'remove');
      }
      return prev.filter(herb => herb.id !== herbId);
    });
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const isFavorite = (herbId: number) => {
    return favorites.some(herb => herb.id === herbId);
  };

  const value: FavoritesContextType = {
    favorites,
    addFavorite,
    removeFavorite,
    clearFavorites,
    isFavorite,
    favoritesCount: favorites.length
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};