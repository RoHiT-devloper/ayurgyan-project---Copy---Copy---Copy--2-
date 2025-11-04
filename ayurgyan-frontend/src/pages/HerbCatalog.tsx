import React, { useState, useEffect } from 'react';
import { Herb } from '../types/herb';
import { herbService } from '../services/herbService';
import HerbGrid from '../components/herb/HerbGrid';
import SearchFilters from '../components/herb/SearchFilters';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ApiDebugger from '../components/common/ApiDebugger';
import './HerbCatalog.css';

const HerbCatalog: React.FC = () => {
  const [herbs, setHerbs] = useState<Herb[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [safetyLevel, setSafetyLevel] = useState('');
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    loadHerbs();
  }, []);

  const loadHerbs = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading herbs...');
      
      const data = await herbService.getAllHerbs();
      console.log('Herbs loaded successfully:', data);
      setHerbs(data);
    } catch (error) {
      console.error('Error loading herbs:', error);
      setError('Failed to load herbs. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Searching herbs with query:', searchQuery, 'safetyLevel:', safetyLevel);
      
      const data = await herbService.searchHerbs({
        query: searchQuery,
        safetyLevel: safetyLevel || undefined
      });
      console.log('Search completed:', data);
      setHerbs(data);
    } catch (error) {
      console.error('Error searching herbs:', error);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setSafetyLevel('');
    loadHerbs();
  };

  return (
    <div className="catalog-container">
      {/* Header */}
      <div className="catalog-header">
        <h1 className="catalog-title">Herb Catalog</h1>
        <p className="catalog-description">
          Explore our comprehensive database of traditional medicinal herbs
        </p>
        <button 
          className="debug-toggle-btn"
          onClick={() => setShowDebug(!showDebug)}
        >
          {showDebug ? 'Hide' : 'Show'} API Debug
        </button>
      </div>

      {/* API Debugger */}
      {showDebug && <ApiDebugger />}

      {/* Search and Filters */}
      <SearchFilters
        query={searchQuery}
        safetyLevel={safetyLevel}
        onQueryChange={setSearchQuery}
        onSafetyLevelChange={setSafetyLevel}
        onSearch={handleSearch}
      />

      {/* Error Display */}
      {error && (
        <div className="error-message">
          <div className="error-icon">⚠️</div>
          <div className="error-content">
            <h3>Error Loading Herbs</h3>
            <p>{error}</p>
            <button onClick={loadHerbs} className="retry-btn">
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      <div>
        <div className="results-header">
          <h2 className="results-title">
            {loading ? 'Loading herbs...' : `${herbs.length} herbs found`}
          </h2>
          {!loading && herbs.length > 0 && (
            <button
              onClick={handleReset}
              className="reset-button"
            >
              Reset Filters
            </button>
          )}
        </div>

        {loading ? (
          <div className="loading-container">
            <LoadingSpinner size="lg" />
            <p>Loading herbs from database...</p>
          </div>
        ) : (
          <HerbGrid herbs={herbs} />
        )}
      </div>
    </div>
  );
};

export default HerbCatalog;