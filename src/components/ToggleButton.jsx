import React from 'react';
import { useTheme } from './ThemeContext';
import { motion } from 'framer-motion';

const ToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        cursor: 'pointer',
        background: theme === 'dark' ? '#ffffff' : '#000000',
        color: theme === 'dark' ? '#000000' : '#ffffff',
        border: 'none',
        borderRadius: '0.5rem',
      }}
    >
      Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </motion.button>
  );
};

export default ToggleButton;
