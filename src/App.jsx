import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';

// Components
import Navbar from './components/layout/Navbar';
import Hero from './components/features/Hero';
import SearchSection from './components/features/SearchSection';
import LeadsTable from './components/features/LeadsTable';
import AiInsights from './components/features/AiInsights';

// Hooks & Utils
import { useLeads } from './hooks/useLeads';
import { exportLeads } from './utils/exportUtils';

// Styles
import './App.css';

function App() {
  const [keyword, setKeyword] = useState('');
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');
  const [viewMode, setViewMode] = useState('search'); // 'search' or 'shortlist'

  const {
    leads,
    loading,
    searched,
    shortlistedLeads,
    searchLeads,
    toggleShortlist,
    isShortlisted
  } = useLeads();

  const handleSearch = () => {
    if (!keyword) return;
    setViewMode('search');
    searchLeads(keyword, isLiveMode);
  };

  const handleExport = () => {
    const dataToExport = viewMode === 'shortlist' ? shortlistedLeads : leads;
    exportLeads(dataToExport, exportFormat, keyword, viewMode);
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'shortlist' ? 'search' : 'shortlist');
  };

  const currentLeads = viewMode === 'shortlist' ? shortlistedLeads : leads;

  return (
    <div className="min-h-screen app-container">
      <Navbar 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        shortlistCount={shortlistedLeads.length}
        onToggleShortlist={toggleViewMode}
      />

      <main className="main-content">
        <Hero isLiveMode={isLiveMode} />

        <SearchSection 
          keyword={keyword}
          setKeyword={setKeyword}
          onSearch={handleSearch}
          loading={loading}
          isLiveMode={isLiveMode}
          setIsLiveMode={setIsLiveMode}
        />

        <AnimatePresence>
          {(searched || viewMode === 'shortlist') && (
            <motion.section 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="results-section"
            >
              <div className="results-header">
                <h2 className="results-title">
                  {loading 
                    ? 'Scanning Discovery Engine...' 
                    : viewMode === 'shortlist'
                      ? `Shortlisted Leads (${shortlistedLeads.length})`
                      : `Found ${leads.length} Real-Time Leads for Trueview`
                  }
                </h2>
                {!loading && currentLeads.length > 0 && (
                  <div className="export-controls">
                    <select 
                      value={exportFormat} 
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="format-select"
                    >
                      <option value="csv">CSV (Excel)</option>
                      <option value="excel">Excel (.xlsx)</option>
                      <option value="pdf">PDF Document</option>
                      <option value="json">JSON (Data)</option>
                    </select>
                    <button onClick={handleExport} className="export-button">
                      <Download size={18} />
                      Export
                    </button>
                  </div>
                )}
              </div>

              {loading ? (
                <div className="loading-grid">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="skeleton-card">
                      <div className="skeleton-line w-3/4"></div>
                      <div className="skeleton-line w-1/2"></div>
                      <div className="skeleton-line w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="dashboard-grid">
                  {currentLeads.length > 0 && (
                    <AiInsights 
                      viewMode={viewMode}
                      keyword={keyword}
                      leadCount={currentLeads.length}
                      firstLead={currentLeads[0]}
                    />
                  )}

                  <LeadsTable 
                    leads={currentLeads}
                    toggleShortlist={toggleShortlist}
                    isShortlisted={isShortlisted}
                    viewMode={viewMode}
                  />
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <footer className="footer">
        <p>© 2026 Trueview Warner Pvt. Ltd.</p>
        <p style={{ fontSize: '0.7rem', marginTop: '0.5rem', opacity: 0.5 }}>
          Sources: Google Maps, JustDial, Business Directories, Public Web Records
        </p>
      </footer>
    </div>
  );
}

export default App;
