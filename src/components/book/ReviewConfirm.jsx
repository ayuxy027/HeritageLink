import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function ReviewConfirm({ formData, handlePrevious, isLastStep }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isSubmitted]);

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="p-6 space-y-4 rounded-lg shadow-inner bg-gray-50"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {Object.entries(formData).map(([key, value], index) => (
          <motion.div
            key={key}
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
            <span className="text-right">{Array.isArray(value) ? value.join(', ') : value.toString()}</span>
          </motion.div>
        ))}
      </motion.div>
      <div className="flex justify-between">
        <motion.button
          onClick={handlePrevious}
          className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Previous
        </motion.button>
        <motion.button
          onClick={handleSubmit}
          className="px-6 py-3 text-sm font-medium text-white border border-transparent rounded-md bg-proj hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Confirm Pre-booking
        </motion.button>
      </div>
      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed p-4 text-white bg-green-500 rounded-lg shadow-lg bottom-4 right-4"
        >
          Booking confirmed! Thank you for choosing our museum.
        </motion.div>
      )}
    </div>
  );
}