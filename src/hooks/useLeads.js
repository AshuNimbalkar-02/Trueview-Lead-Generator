import { useState, useCallback, useEffect } from 'react';
import { leadService } from '../services/leadService';

export const useLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [shortlistedLeads, setShortlistedLeads] = useState(() => {
    const saved = localStorage.getItem('trueview_shortlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('trueview_shortlist', JSON.stringify(shortlistedLeads));
  }, [shortlistedLeads]);

  const searchLeads = useCallback(async (keyword, isLiveMode = false) => {
    if (!keyword) return;
    
    setLoading(true);
    setSearched(true);
    setLeads([]); // Clear for real-time effect

    try {
      if (isLiveMode) {
        const results = await leadService.fetchLeads(keyword, true);
        
        // Stream effect for real-time feel
        for (let i = 0; i < results.length; i++) {
          await new Promise(r => setTimeout(r, 300));
          setLeads(prev => [...prev, results[i]]);
        }
      } else {
        const results = await leadService.fetchLeads(keyword, false);
        setLeads(results);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleShortlist = useCallback((lead) => {
    setShortlistedLeads(prev => {
      const exists = prev.some(l => l.id === lead.id || (l.company === lead.company && l.location === lead.location));
      if (exists) {
        return prev.filter(l => !(l.id === lead.id || (l.company === lead.company && l.location === lead.location)));
      }
      return [...prev, { ...lead, shortlistedAt: new Date().toISOString() }];
    });
  }, []);

  const isShortlisted = useCallback((lead) => {
    return shortlistedLeads.some(l => l.id === lead.id || (l.company === lead.company && l.location === lead.location));
  }, [shortlistedLeads]);

  return {
    leads,
    loading,
    searched,
    shortlistedLeads,
    searchLeads,
    toggleShortlist,
    isShortlisted
  };
};
