import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

const amenities = [
  { name: 'Tour Guide', price: 200, icon: '🧑‍🏫' },
  { name: 'Wheelchair for Elderly', price: 50, icon: '👵' },
  { name: 'Audio Guide', price: 100, icon: '🎧' },
  { name: 'Photography Permit', price: 150, icon: '📷' },
  { name: 'Locker Service', price: 75, icon: '🔒' },
  { name: 'Café Voucher', price: 100, icon: '☕' },
];

export default function Amenities({ formData, setFormData, handleNext, handlePrevious }) {
  const calculateTotal = () => {
    const amenitiesTotal = (formData.amenities || []).reduce((total, amenity) =>
      total + (amenities.find(a => a.name === amenity)?.price || 0), 0);
    return amenitiesTotal + 100; // Adding 100 rupees booking fee
  };

  return (
    <div className="space-y-6">
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.3 }}>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              className={`flex items-center p-4 space-x-3 bg-white border-2 rounded-lg transition-colors duration-300 ${
                (formData.amenities || []).includes(amenity.name)
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <input
                type="checkbox"
                id={`amenity-${index}`}
                checked={(formData.amenities || []).includes(amenity.name)}
                onChange={(e) => {
                  const newAmenities = e.target.checked
                    ? [...(formData.amenities || []), amenity.name]
                    : (formData.amenities || []).filter(a => a !== amenity.name);
                  setFormData({ ...formData, amenities: newAmenities });
                }}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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
        Total: ₹{calculateTotal()} (including ₹100 booking fee)
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
          onClick={handleNext}
          className="px-6 py-3 text-sm font-medium text-white border border-transparent rounded-md bg-proj hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next
        </motion.button>
      </div>
    </div>
  );
}