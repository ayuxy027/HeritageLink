import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { BackgroundPattern } from '../components/shared/BackgroundPattern';

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
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease: "easeOut" }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-50 font-body">
      <BackgroundPattern />
      <motion.div 
        className="z-10 w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1 
          className="mb-6 text-3xl font-bold text-center text-transparent bg-proj bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          Select a Time Slot
        </motion.h1>
        <motion.div 
          className="space-y-4"
          initial="initial"
          animate="animate"
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
            {timeSlots.map((slot, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`py-4 px-2 flex flex-col items-center justify-center rounded-lg border-2 ${
                  formData.timeSlot === slot.time
                    ? 'border-proj bg-proj bg-opacity-10 text-proj'
                    : 'border-gray-300 bg-white hover:bg-gray-50'
                } ${slot.available === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={slot.available === 0}
                onClick={() => setFormData({ ...formData, timeSlot: slot.time })}
              >
                <Clock className={`w-5 h-5 mb-1 ${formData.timeSlot === slot.time ? 'text-proj' : 'text-gray-500'}`} />
                <span className="text-sm font-medium">{slot.time}</span>
                <span className="mt-1 text-xs">{slot.available} spots left</span>
              </motion.button>
            ))}
          </motion.div>
          {errors.timeSlot && <p className="mt-2 text-sm text-red-500">{errors.timeSlot}</p>}
        </motion.div>
        <div className="flex justify-between mt-6">
          <motion.button 
            onClick={handlePrevious} 
            className="flex items-center justify-center px-4 py-2 text-sm font-medium transition duration-300 bg-white border-2 rounded-lg text-proj border-proj hover:bg-proj hover:text-white focus:outline-none focus:ring-2 focus:ring-proj focus:ring-offset-2"
            variants={scaleIn}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </motion.button>
          <motion.button 
            onClick={handleNext} 
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition duration-300 rounded-lg bg-proj hover:bg-proj-hover focus:outline-none focus:ring-2 focus:ring-proj focus:ring-offset-2"
            variants={scaleIn}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Book2;