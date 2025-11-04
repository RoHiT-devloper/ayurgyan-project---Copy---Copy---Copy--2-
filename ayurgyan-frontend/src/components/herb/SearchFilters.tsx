import React from 'react';
import { Search, Filter } from 'lucide-react';
import { SAFETY_LEVELS } from '../../utils/constants';
import './SearchFilters.css';

interface SearchFiltersProps {
  query: string;
  safetyLevel: string;
  onQueryChange: (query: string) => void;
  onSafetyLevelChange: (level: string) => void;
  onSearch: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  query,
  safetyLevel,
  onQueryChange,
  onSafetyLevelChange,
  onSearch,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="search-filters">
      <form onSubmit={handleSubmit} className="search-form">
        {/* Search Input */}
        <div className="search-input-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search herbs by name, scientific name, or description..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-input"
          />
        </div>

        {/* Simple Filters */}
        <div className="filters-row">
          {/* Safety Level Filter */}
          <div className="filter-group">
            <label className="filter-label">Safety Level</label>
            <select
              value={safetyLevel}
              onChange={(e) => onSafetyLevelChange(e.target.value)}
              className="filter-select"
            >
              <option value="">All Levels</option>
              {Object.entries(SAFETY_LEVELS).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="search-button"
          >
            <Filter size={16} style={{ marginRight: '0.5rem' }} />
            Search
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={() => {
              onQueryChange('');
              onSafetyLevelChange('');
              onSearch();
            }}
            className="reset-button"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;