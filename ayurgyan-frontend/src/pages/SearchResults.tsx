import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Herb } from '../types/herb';
import { herbService } from '../services/herbService';
import SearchFilters from '../components/herb/SearchFilters';
import HerbGrid from '../components/herb/HerbGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import './SearchResults.css';

const SearchResults: React.FC = () => {
  const [herbs, setHerbs] = useState<Herb[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [safetyLevel, setSafetyLevel] = useState('');
  
  const location = useLocation();

  // Load all herbs when component mounts
  useEffect(() => {
    loadAllHerbs();
  }, []);

  // Handle initial search from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get('q');
    
    if (query) {
      setSearchQuery(query);
      handleSearch(query, '');
    }
  }, [location.search]);

  const loadAllHerbs = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading all herbs...');
      
      const allHerbs = await herbService.getAllHerbs();
      setHerbs(allHerbs);
      console.log('Loaded all herbs:', allHerbs.length);
      
    } catch (err: any) {
      setError('Failed to load herbs. Please try again.');
      console.error('Error loading herbs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string, safety: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Searching with query:', query, 'safety:', safety);

      const results = await herbService.searchHerbs({
        query: query.trim(),
        safetyLevel: safety
      });

      setHerbs(results);
      setSearchQuery(query);
      setSafetyLevel(safety);
      
    } catch (err: any) {
      setError('Failed to search herbs. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    loadAllHerbs();
    setSearchQuery('');
    setSafetyLevel('');
  };

  return (
    <div className="search-results-container">
      {/* Header */}
      <div className="search-results-header">
        <h1 className="search-results-title">Search Herbs</h1>
        <p className="search-results-description">
          Find herbs by name, scientific name, or description
        </p>
      </div>

      {/* Simple Search Filters */}
      <SearchFilters
        query={searchQuery}
        safetyLevel={safetyLevel}
        onQueryChange={setSearchQuery}
        onSafetyLevelChange={setSafetyLevel}
        onSearch={() => handleSearch(searchQuery, safetyLevel)}
      />

      {/* Results Section */}
      <div className="search-results-content">
        {loading && (
          <div className="loading-container">
            <LoadingSpinner size="lg" />
            <p>Loading herbs...</p>
          </div>
        )}

        {error && (
          <ErrorMessage
            type="error"
            title="Search Error"
            message={error}
            onRetry={loadAllHerbs}
          />
        )}

        {!loading && !error && (
          <>
            {/* Results Header */}
            <div className="results-header">
              <div className="results-info">
                <h2 className="results-title">
                  {herbs.length} herb{herbs.length !== 1 ? 's' : ''} found
                </h2>
                {searchQuery && (
                  <p className="results-summary">
                    Showing results for: <strong>"{searchQuery}"</strong>
                    {safetyLevel && ` with safety level: ${safetyLevel}`}
                  </p>
                )}
              </div>
              {(searchQuery || safetyLevel) && (
                <button
                  onClick={handleReset}
                  className="reset-search-btn"
                >
                  Show All Herbs
                </button>
              )}
            </div>

            {/* Results Grid */}
            {herbs.length > 0 ? (
              <HerbGrid herbs={herbs} />
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3 className="no-results-title">No herbs found</h3>
                <p className="no-results-description">
                  Try adjusting your search terms or browse all herbs.
                </p>
                <button
                  onClick={handleReset}
                  className="browse-all-btn"
                >
                  Browse All Herbs
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;