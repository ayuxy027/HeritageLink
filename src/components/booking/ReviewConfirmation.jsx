import React from 'react';
import { motion } from 'framer-motion';
import { Edit2 } from 'lucide-react';

const ReviewConfirmation = ({ formData, calculateTotal, onEdit }) => {
  return (
    <div className="space-y-6">
      <motion.h3 
        className="text-2xl font-semibold text-center text-transparent bg-blue-600 bg-clip-text"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Booking Summary
      </motion.h3>
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
        <motion.div
          className="flex items-center justify-between pt-4 mt-4 text-lg font-bold border-t border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <span>Total:</span>
          <span className="text-blue-600">₹{calculateTotal()} (including ₹100 booking fee)</span>
        </motion.div>
      </motion.div>
      <motion.button
        onClick={() => onEdit(1)}
        className="w-full px-4 py-3 text-sm font-medium text-blue-600 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <Edit2 className="inline-block w-4 h-4 mr-2" /> Edit Booking
      </motion.button>
    </div>
  );
};

export default ReviewConfirmation;