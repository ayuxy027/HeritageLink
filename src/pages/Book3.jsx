import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

const Book3 = () => {
  const [formData, setFormData] = useState({
    amenities: [],
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.formData) {
      setFormData(prevData => ({ ...prevData, ...location.state.formData }));
    }
  }, [location.state]);

  const amenities = [
    { name: 'Tour Guide', price: 100, icon: '🧑‍🏫' },
    { name: 'Wheelchair for Elderly', price: 20, icon: '👵' },
    { name: 'Audio Guide', price: 30, icon: '🎧' },
    { name: 'Photography Permit', price: 20, icon: '📷' },
    { name: 'Locker Service', price: 20, icon: '🔒' },
    { name: 'Café Voucher', price: 80, icon: '☕' },
  ];

  const calculateTotal = () => {
    const amenitiesTotal = formData.amenities.reduce((total, amenity) => {
      const amenityPrice = amenities.find(a => a.name === amenity)?.price || 0;
      return total + amenityPrice;
    }, 0);
    return amenitiesTotal + 20; // Adding 20 rupees booking fee
  };

  const handleNext = () => {
    navigate('/book-4', { state: { formData } });
  };

  const handlePrevious = () => {
    navigate('/book-2', { state: { formData } });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="container max-w-2xl p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Amenities</h1>
      <div className="space-y-6">
        <motion.div variants={fadeInUp}>
          <label className="block text-lg font-medium">Select Additional Services & Amenities</label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                className={`flex items-center p-4 space-x-3 bg-white border-2 rounded-lg transition-colors duration-300 ${
                  formData.amenities.includes(amenity.name)
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="checkbox"
                  id={`amenity-${index}`}
                  checked={formData.amenities.includes(amenity.name)}
                  onChange={(e) => {
                    const newAmenities = e.target.checked
                      ? [...formData.amenities, amenity.name]
                      : formData.amenities.filter(a => a !== amenity.name)
                    setFormData({ ...formData, amenities: newAmenities })
                  }}
                  className="w-5 h-5 text-transparent border-gray-300 rounded bg-proj bg-clip-border focus:ring-blue-500"
                />
                <label
                  htmlFor={`amenity-${index}`}
                  className="flex-1 cursor-pointer"
                >
                  <div className="flex items-center">
                    <span className="mr-2 text-2xl">{amenity.icon}</span>
                    <span className="font-medium">{amenity.name}</span>
                  </div>
                  <span className="block mt-1 text-sm text-gray-500">₹{amenity.price}</span>
                </label>
                <Info className="w-5 h-5 text-gray-400" />
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="mt-6 text-xl font-bold text-center text-transparent bg-proj bg-clip-text"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          Total: ₹{calculateTotal()} (including ₹20 booking fee)
        </motion.div>
      </div>
      <div className="flex justify-between mt-6">
        <button 
          onClick={handlePrevious} 
          className="px-4 py-2 text-gray-800 transition duration-300 bg-gray-300 rounded-md hover:bg-gray-400"
        >
          Previous
        </button>
        <button 
          onClick={handleNext} 
          className="px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Book3;