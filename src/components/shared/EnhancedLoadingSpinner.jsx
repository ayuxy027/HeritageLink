import React from 'react';
import { motion } from 'framer-motion';

const EnhancedLoadingSpinner = ({ 
  size = 'md', 
  color = 'blue', 
  text = 'Loading...', 
  fullScreen = true,
  className = '',
}) => {
  // Size variations
  const sizeMap = {
    sm: { dot: 'w-2 h-2', spacing: 'space-x-1.5' },
    md: { dot: 'w-3 h-3', spacing: 'space-x-2' },
    lg: { dot: 'w-4 h-4', spacing: 'space-x-3' },
  };

  // Color variations
  const colorMap = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    indigo: 'bg-indigo-500',
    primary: 'bg-yellow-400',
  };

  const dotSize = sizeMap[size]?.dot || sizeMap.md.dot;
  const dotSpacing = sizeMap[size]?.spacing || sizeMap.md.spacing;
  const dotColor = colorMap[color] || colorMap.blue;

  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const circleVariants = {
    start: {
      y: '0%',
    },
    end: {
      y: '100%',
    },
  };

  const circleTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: 'easeInOut',
  };

  const containerClass = fullScreen 
    ? "flex flex-col items-center justify-center h-screen bg-gray-100" 
    : "flex flex-col items-center py-8";

  return (
    <div className={`${containerClass} ${className}`}>
      <motion.div
        className={`flex ${dotSpacing}`}
        variants={containerVariants}
        initial="start"
        animate="end"
      >
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className={`${dotSize} ${dotColor} rounded-full`}
            variants={circleVariants}
            transition={{
              ...circleTransition,
              delay: index * 0.1
            }}
          />
        ))}
      </motion.div>
      {text && <p className="mt-4 text-lg font-semibold text-gray-700">{text}</p>}
    </div>
  );
};

export default EnhancedLoadingSpinner;