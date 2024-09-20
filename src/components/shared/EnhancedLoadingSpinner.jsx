import React from 'react';
import { motion } from 'framer-motion';

const EnhancedLoadingSpinner = () => {
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

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        className="flex space-x-2"
        variants={containerVariants}
        initial="start"
        animate="end"
      >
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className="w-3 h-3 bg-blue-500 rounded-full"
            variants={circleVariants}
            transition={circleTransition}
          />
        ))}
      </motion.div>
      <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
    </div>
  );
};

export default EnhancedLoadingSpinner;