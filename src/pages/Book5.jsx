import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit2 } from 'lucide-react';

const Book5 = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.formData) {
      setFormData(location.state.formData);
    }
  }, [location.state]);

  const amenities = [
    { name: 'Tour Guide', price: 200, icon: '🧑‍🏫' },
    { name: 'Wheelchair for Elderly', price: 50, icon: '👵' },
    { name: 'Audio Guide', price: 100, icon: '🎧' },
    { name: 'Photography Permit', price: 150, icon: '📷' },
    { name: 'Locker Service', price: 75, icon: '🔒' },
    { name: 'Café Voucher', price: 100, icon: '☕' },
  ];

  const calculateTotal = () => {
    const amenitiesSelected = formData.amenities || [];
    const amenitiesTotal = amenitiesSelected.reduce((total, amenity) => {
      const amenityPrice = amenities.find(a => a.name === amenity)?.price || 0;
      return total + amenityPrice;
    }, 0);
    return amenitiesTotal + 100; // Adding 100 rupees booking fee
  };

  const handleSubmit = () => {
    console.log('Booking submitted:', formData);
    alert('Booking confirmed! Thank you for choosing our museum.');
    navigate('/');
  };

  const handlePrevious = () => {
    navigate('/book-4', { state: { formData } });
  };

  const handleEdit = (step) => {
    navigate(`/book-${step}`, { state: { formData } });
  };

  return (
    <div className="container max-w-2xl p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Review and Confirm</h1>
      <div className="space-y-6">
        <motion.h3 
          className="text-2xl font-semibold text-center text-transparent bg-proj bg-clip-text"
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
          onClick={() => handleEdit(1)}
          className="w-full px-4 py-3 text-sm font-medium text-transparent bg-blue-100 border border-transparent rounded-md bg-proj bg-clip-text hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Edit2 className="inline-block w-4 h-4 mr-2" /> Edit Booking
        </motion.button>
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 text-gray-800 transition duration-300 bg-gray-300 rounded-md hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 text-white transition duration-300 rounded-md bg-proj hover:bg-blue-600"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default Book5;