import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BackgroundPattern } from '../components/shared/BackgroundPattern';

const Book4 = () => {
  const [formData, setFormData] = useState({
    visitPurpose: '',
    ageGroup: '',
    interests: [],
    hearAboutUs: '',
    specialRequests: '',
    preVisitEmail: false,
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
    if (!formData.ageGroup) newErrors.ageGroup = 'Please select an age group';
    if (formData.interests.length === 0) newErrors.interests = 'Please select at least one interest';
    if (!formData.hearAboutUs) newErrors.hearAboutUs = 'Please let us know how you heard about us';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate('/book-5', { state: { formData } });
    }
  };

  const handlePrevious = () => {
    navigate('/book-3', { state: { formData } });
  };

  const interestOptions = [
    'Art', 'History', 'Science', 'Technology', 'Nature', 'Culture'
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
          Preferences
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
          <motion.div variants={fadeInUp}>
            <label htmlFor="visitPurpose" className="block text-sm font-medium text-gray-700">Visiting Purpose</label>
            <select
              id="visitPurpose"
              value={formData.visitPurpose}
              onChange={(e) => setFormData({ ...formData, visitPurpose: e.target.value })}
              className="block w-full px-3 py-2 mt-1 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-proj focus:border-proj"
            >
              <option value="">Select purpose</option>
              <option value="leisure">Leisure</option>
              <option value="educational">Educational Tour</option>
              <option value="group">Group Tour</option>
              <option value="other">Other</option>
            </select>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <label className="block text-sm font-medium text-gray-700">Age Group</label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {['Under 18', '18-30', '31-50', '51-65', 'Over 65'].map((age) => (
                <motion.div
                  key={age}
                  className={`flex items-center justify-center p-2 text-xs border rounded-md cursor-pointer ${
                    formData.ageGroup === age
                      ? 'border-proj bg-proj bg-opacity-10 text-proj'
                      : 'border-gray-300 hover:border-proj'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFormData({ ...formData, ageGroup: age })}
                >
                  <span>{age}</span>
                </motion.div>
              ))}
            </div>
            {errors.ageGroup && <p className="mt-1 text-xs text-red-500">{errors.ageGroup}</p>}
          </motion.div>
          <motion.div variants={fadeInUp}>
            <label className="block text-sm font-medium text-gray-700">Interests</label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {interestOptions.map((interest) => (
                <motion.div
                  key={interest}
                  className={`flex items-center justify-center p-2 text-xs border rounded-md cursor-pointer ${
                    formData.interests.includes(interest)
                      ? 'border-proj bg-proj bg-opacity-10 text-proj'
                      : 'border-gray-300 hover:border-proj'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const newInterests = formData.interests.includes(interest)
                      ? formData.interests.filter(i => i !== interest)
                      : [...formData.interests, interest]
                    setFormData({ ...formData, interests: newInterests })
                  }}
                >
                  <span>{interest}</span>
                </motion.div>
              ))}
            </div>
            {errors.interests && <p className="mt-1 text-xs text-red-500">{errors.interests}</p>}
          </motion.div>
          <motion.div variants={fadeInUp}>
            <label htmlFor="hearAboutUs" className="block text-sm font-medium text-gray-700">How did you hear about us?</label>
            <select
              id="hearAboutUs"
              value={formData.hearAboutUs}
              onChange={(e) => setFormData({ ...formData, hearAboutUs: e.target.value })}
              className="block w-full px-3 py-2 mt-1 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-proj focus:border-proj"
            >
              <option value="">Select an option</option>
              <option value="social_media">Social Media</option>
              <option value="friend">Friend or Family</option>
              <option value="advertisement">Advertisement</option>
              <option value="search_engine">Search Engine</option>
              <option value="other">Other</option>
            </select>
            {errors.hearAboutUs && <p className="mt-1 text-xs text-red-500">{errors.hearAboutUs}</p>}
          </motion.div>
          <motion.div variants={fadeInUp}>
            <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700">Special Requests/Accessibility Needs</label>
            <textarea
              id="specialRequests"
              rows={3}
              placeholder="Enter any special requests or accessibility needs"
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              className="block w-full px-3 py-2 mt-1 text-sm text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-proj focus:border-proj"
            />
          </motion.div>
          <motion.div variants={fadeInUp} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="preVisitEmail"
              checked={formData.preVisitEmail}
              onChange={(e) => setFormData({ ...formData, preVisitEmail: e.target.checked })}
              className="w-4 h-4 border-gray-300 rounded text-proj focus:ring-proj"
            />
            <label
              htmlFor="preVisitEmail"
              className="text-xs font-medium leading-none cursor-pointer"
            >
              Receive pre-visit email with tips and suggestions
            </label>
          </motion.div>
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

export default Book4;