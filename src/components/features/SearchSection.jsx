import React from 'react';
import { Search, Loader2, ArrowRight } from 'lucide-react';

const SearchSection = ({ 
  keyword, 
  setKeyword, 
  onSearch, 
  loading, 
  isLiveMode, 
  setIsLiveMode 
}) => {
  const suggestions = ['CCTV', 'Interactive Panel', 'Video Wall', 'TDS Meter'];

  return (
    <section className="search-section">
      <div className="search-card">
        <div className="search-input-wrapper">
          <Search className="search-icon" />
          <input 
            type="text" 
            placeholder="Product Keyword (CCTV, Panel, Video Wall...)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            className="search-input"
          />
        </div>
        <button 
          onClick={onSearch} 
          disabled={loading}
          className="generate-button"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              Generate Leads
              <ArrowRight className="btn-arrow" />
            </>
          )}
        </button>
      </div>
      
      <div className="search-footer">
        <div className="suggestions-row">
          <span className="suggestion-label">Try Trueview Products:</span>
          {suggestions.map((tag) => (
            <button 
              key={tag} 
              onClick={() => { setKeyword(tag); }}
              className="suggestion-tag"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="live-mode-toggle">
          <span className={`toggle-label ${isLiveMode ? 'active' : ''}`}>
            {isLiveMode ? 'Live Discovery Engine' : 'Verified Database'}
          </span>
          <div 
            className={`toggle-switch ${isLiveMode ? 'on' : ''}`}
            onClick={() => setIsLiveMode(!isLiveMode)}
          >
            <div className="switch-knob"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
