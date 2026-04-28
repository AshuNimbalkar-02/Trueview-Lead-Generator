import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ isLiveMode }) => {
  return (
    <header className="hero-section">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="badge"
        >
          Internal Sales Tool
        </motion.div>
        {isLiveMode && (
          <motion.div 
            initial={{ opacity: 0, opacity: 0 }}
            animate={{ opacity: 1, opacity: 1 }}
            className="live-indicator"
          >
            <div className="live-dot"></div>
            Real-Time Lead Discovery Active
          </motion.div>
        )}
      </div>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hero-title"
      >
        Trueview Strategic <br />
        <span className="text-gradient">Lead Generation</span>
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="hero-subtitle"
      >
        Finding high-value procurement leads for Trueview CCTV, Interactive Panels, and Display Solutions.
      </motion.p>
    </header>
  );
};

export default Hero;
