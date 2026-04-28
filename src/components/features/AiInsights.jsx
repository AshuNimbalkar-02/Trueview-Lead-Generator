import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const AiInsights = ({ viewMode, keyword, leadCount, firstLead }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="ai-insights-panel"
    >
      <div className="panel-header">
        <Sparkles className="icon-gold" size={20} />
        <h3>AI Sales Strategist</h3>
      </div>
      <p className="panel-content">
        {viewMode === 'shortlist' ? (
          <>
            You have <strong>{leadCount}</strong> high-priority leads in your shortlist. 
            I recommend initiating contact with <strong>{firstLead?.company}</strong> first based on procurement patterns.
          </>
        ) : (
          <>
            Based on the target keyword <strong>"{keyword}"</strong>, I recommend focusing on 
            Value-Added Resellers (VARs) in the {firstLead?.location.split(',')[0]} region.
            These leads have been filtered for <strong>Procurement Readiness</strong>.
          </>
        )}
      </p>
      <div className="panel-meta">
        <div className="meta-item">
          <span className="meta-label">Match Score</span>
          <span className="meta-value">98%</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">{viewMode === 'shortlist' ? 'Follow-up Status' : 'Priority level'}</span>
          <span className={viewMode === 'shortlist' ? 'meta-value' : 'meta-high'}>
            {viewMode === 'shortlist' ? 'Action Required' : 'High'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default AiInsights;
