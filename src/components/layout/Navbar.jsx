import React from 'react';
import { Sparkles, Users } from 'lucide-react';

const Navbar = ({ viewMode, setViewMode, shortlistCount, onToggleShortlist }) => {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="logo-section">
          <div className="logo-icon">
            <Sparkles className="icon-purple" />
          </div>
          <span className="logo-text">Trueview <span className="text-gradient">Lead Portal</span></span>
        </div>
        <div className="nav-meta">
          <button 
            onClick={onToggleShortlist}
            className={`shortlist-toggle-btn ${viewMode === 'shortlist' ? 'active' : ''}`}
          >
            <Users size={18} />
            <span>Shortlist ({shortlistCount})</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
