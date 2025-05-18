import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundPattern = ({ 
  opacity = 0.1, 
  colors = { from: 'blue-100', to: 'purple-100' }, 
  strokeColor = '4A5568',
  pattern = 'grid',  // grid, dots, waves, honeycomb
  animated = false,
  className = '',
}) => {
  // Pattern configurations
  const patterns = {
    grid: (
      <pattern id="grid-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="none" stroke={`#${strokeColor}`} strokeWidth="1" />
      </pattern>
    ),
    dots: (
      <pattern id="dots-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="2" fill={`#${strokeColor}`} />
      </pattern>
    ),
    waves: (
      <pattern id="waves-pattern" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
        <path d="M0 10 Q 12.5 0, 25 10 Q 37.5 20, 50 10 Q 62.5 0, 75 10 Q 87.5 20, 100 10" fill="none" stroke={`#${strokeColor}`} strokeWidth="1" />
      </pattern>
    ),
    honeycomb: (
      <pattern id="honeycomb-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M20 0 L40 10 L40 30 L20 40 L0 30 L0 10 Z" fill="none" stroke={`#${strokeColor}`} strokeWidth="1" />
      </pattern>
    ),
  };

  const selectedPattern = patterns[pattern] || patterns.grid;
  const patternId = `${pattern}-pattern`;

  return (
    <div className={`absolute inset-0 z-0 ${className}`} style={{ opacity }}>
      <div className={`absolute inset-0 bg-gradient-to-br from-${colors.from} to-${colors.to}`} />
      
      {animated ? (
        <motion.svg 
          className="absolute inset-0 w-full h-full" 
          xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: 0.7 }}
          animate={{ 
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.02, 1],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {selectedPattern}
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#${patternId})`} />
        </motion.svg>
      ) : (
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {selectedPattern}
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
      )}
    </div>
  );
};

export default BackgroundPattern;