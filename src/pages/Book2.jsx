import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const Book2 = () => {
  const [formData, setFormData] = useState({
    timeSlot: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.formData) {
      setFormData(prevData => ({ ...prevData, ...location.state.formData }));
    }
  }, [location.state]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.timeSlot) newErrors.timeSlot = 'Please select a time slot';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate('/book-3', { state: { formData } });
    }
  };

  const handlePrevious = () => {
    navigate('/book-1', { state: { formData } });
  };

  const timeSlots = [
    { time: '9 AM–11 AM', available: 5 },
    { time: '11 AM–1 PM', available: 3 },
    { time: '1 PM–3 PM', available: 0 },
    { time: '3 PM–5 PM', available: 7 },
    { time: '5 PM–7 PM', available: 2 },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="container max-w-2xl p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Slot Booking</h1>
      <div className="space-y-6">
        <motion.div variants={fadeInUp}>
          <label className="block text-lg font-medium">Select a Time Slot</label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {timeSlots.map((slot, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`h-24 w-full flex flex-col items-center justify-center rounded-lg border-2 ${
                  formData.timeSlot === slot.time
                    ? 'border-blue-600 bg-blue-100 text-blue-800'
                    : 'border-gray-300 bg-white hover:bg-gray-50'
                } ${slot.available === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={slot.available === 0}
                onClick={() => setFormData({ ...formData, timeSlot: slot.time })}
              >
                <Clock className="w-6 h-6 mb-2" />
                <span className="text-lg font-medium">{slot.time}</span>
                <span className="mt-1 text-sm">{slot.available} spots left</span>
              </motion.button>
            ))}
          </div>
          {errors.timeSlot && <p className="mt-2 text-sm text-red-500">{errors.timeSlot}</p>}
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

export default Book2;