import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Mail, ChevronRight, User, Phone } from 'lucide-react';
import { BackgroundPattern } from '../components/shared/BackgroundPattern';

const Book1 = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    attendees: 1,
    email: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (formData.attendees < 1) newErrors.attendees = 'At least one attendee is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate('/book-2', { state: { formData } });
    }
  };

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
    <div className="relative flex items-center justify-center min-h-screen py-12 bg-gray-50 font-body">
      <BackgroundPattern />
      <motion.div 
        className="z-10 w-full max-w-2xl p-12 bg-white rounded-lg shadow-lg"
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
          Visitor Information
        </motion.h1>
        <motion.div 
          className="space-y-6"
          initial="initial"
          animate="animate"
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.div variants={fadeInUp}>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
            <div className="relative">
              <input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <User className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            </div>
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </motion.div>
          <motion.div variants={fadeInUp}>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
            <div className="flex">
              <select className="w-24 px-3 py-3 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="in">🇮🇳 +91</option>
                <option value="us">🇺🇸 +1</option>
                <option value="uk">🇬🇧 +44</option>
              </select>
              <div className="relative flex-1">
                <input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="w-full py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-r-md focus:ring-blue-500 focus:border-blue-500"
                />
                <Phone className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              </div>
            </div>
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
          </motion.div>
          <motion.div variants={fadeInUp}>
            <label htmlFor="attendees" className="block mb-2 text-sm font-medium text-gray-700">Number of Attendees</label>
            <div className="relative">
              <input
                id="attendees"
                type="number"
                min={1}
                max={10}
                value={formData.attendees}
                onChange={(e) => setFormData({ ...formData, attendees: parseInt(e.target.value) })}
                className="w-full py-3 pl-10 pr-12 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <Users className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            </div>
            {errors.attendees && <p className="mt-1 text-xs text-red-500">{errors.attendees}</p>}
          </motion.div>
          <motion.div variants={fadeInUp}>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email Address (Optional)</label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className="w-full py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            </div>
          </motion.div>
        </motion.div>
        <motion.button 
          onClick={handleNext} 
          className="flex items-center justify-center w-full px-6 py-3 mt-8 text-lg font-medium text-white transition duration-300 rounded-2xl bg-proj hover:bg-proj-hover focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          variants={scaleIn}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Next
          <ChevronRight className="w-6 h-6 ml-2" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Book1;