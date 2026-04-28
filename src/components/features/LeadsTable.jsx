import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Phone, Mail, MapPin, Star, MessageCircle, ExternalLink } from 'lucide-react';

const LeadsTable = ({ leads, toggleShortlist, isShortlisted, viewMode }) => {
  if (leads.length === 0) {
    return (
      <div className="no-leads-container">
        {viewMode === 'shortlist' 
          ? "No leads shortlisted yet. Start searching and star some leads!" 
          : "No leads found for this search. Try another keyword."}
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="leads-table">
        <thead>
          <tr>
            <th>Potential Client</th>
            <th>Procurement Phone</th>
            <th>Decision Maker Email</th>
            <th>Location</th>
            <th>Source</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, idx) => (
            <motion.tr 
              key={lead.id || `${lead.company}-${idx}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <td className="company-cell">
                <div className="company-info-wrapper">
                  <Building2 size={16} className="cell-icon" />
                  <span className="company-name-text">{lead.company}</span>
                  {isShortlisted(lead) && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="shortlist-badge"
                    >
                      Shortlisted
                    </motion.span>
                  )}
                </div>
              </td>
              <td>
                <Phone size={16} className="cell-icon" />
                {lead.phone}
              </td>
              <td className="email-cell">
                <Mail size={16} className="cell-icon" />
                {lead.email}
              </td>
              <td>
                <MapPin size={16} className="cell-icon" />
                {lead.location}
              </td>
              <td>
                <span className={`source-badge ${lead.source?.toLowerCase().replace(/\s+/g, '-')}`}>
                  {lead.source}
                </span>
              </td>
              <td>
                <div className="row-actions">
                  <button 
                    onClick={() => toggleShortlist(lead)}
                    className={`action-btn shortlist-btn ${isShortlisted(lead) ? 'active' : ''}`}
                    title={isShortlisted(lead) ? "Remove from Shortlist" : "Add to Shortlist"}
                  >
                    {isShortlisted(lead) ? <Star size={16} fill="currentColor" /> : <Star size={16} />}
                  </button>
                  <a 
                    href={`https://wa.me/${lead.phone.replace(/\D/g,'')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-btn wa-btn"
                    title="Message on WhatsApp"
                  >
                    <MessageCircle size={18} />
                  </a>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.company + ' ' + lead.location)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-btn map-btn"
                    title="View on Google Maps"
                  >
                    <MapPin size={18} />
                  </a>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;
