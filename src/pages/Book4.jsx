import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="container max-w-2xl p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Preferences</h1>
      <div className="space-y-6">
        <motion.div variants={fadeInUp}>
          <label htmlFor="visitPurpose" className="block text-lg font-medium">Visiting Purpose</label>
          <select
            id="visitPurpose"
            value={formData.visitPurpose}
            onChange={(e) => setFormData({ ...formData, visitPurpose: e.target.value })}
            className="block w-full px-4 py-3 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select purpose</option>
            <option value="leisure">Leisure</option>
            <option value="educational">Educational Tour</option>
            <option value="group">Group Tour</option>
            <option value="other">Other</option>
          </select>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <label className="block text-lg font-medium">Age Group</label>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {['Under 18', '18-30', '31-50', '51-65', 'Over 65'].map((age) => (
              <motion.div
                key={age}
                className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer ${
                  formData.ageGroup === age
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFormData({ ...formData, ageGroup: age })}
              >
                <span className="text-sm font-medium">{age}</span>
              </motion.div>
            ))}
          </div>
          {errors.ageGroup && <p className="mt-1 text-sm text-red-500">{errors.ageGroup}</p>}
        </motion.div>
        <motion.div variants={fadeInUp}>
          <label className="block text-lg font-medium">Interests</label>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {interestOptions.map((interest) => (
              <motion.div
                key={interest}
                className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer ${
                  formData.interests.includes(interest)
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-300'
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
                <span className="text-sm font-medium">{interest}</span>
              </motion.div>
            ))}
          </div>
          {errors.interests && <p className="mt-1 text-sm text-red-500">{errors.interests}</p>}
        </motion.div>
        <motion.div variants={fadeInUp}>
          <label htmlFor="hearAboutUs" className="block text-lg font-medium">How did you hear about us?</label>
          <select
            id="hearAboutUs"
            value={formData.hearAboutUs}
            onChange={(e) => setFormData({ ...formData, hearAboutUs: e.target.value })}
            className="block w-full px-4 py-3 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select an option</option>
            <option value="social_media">Social Media</option>
            <option value="friend">Friend or Family</option>
            <option value="advertisement">Advertisement</option>
            <option value="search_engine">Search Engine</option>
            <option value="other">Other</option>
          </select>
          {errors.hearAboutUs && <p className="mt-1 text-sm text-red-500">{errors.hearAboutUs}</p>}
        </motion.div>
        <motion.div variants={fadeInUp}>
          <label htmlFor="specialRequests" className="block text-lg font-medium">Special Requests/Accessibility Needs</label>
          <textarea
            id="specialRequests"
            rows={3}
            placeholder="Enter any special requests or accessibility needs"
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            className="block w-full px-4 py-3 mt-1 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </motion.div>
        <motion.div variants={fadeInUp} className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="preVisitEmail"
            checked={formData.preVisitEmail}
            onChange={(e) => setFormData({ ...formData, preVisitEmail: e.target.checked })}
            className="w-5 h-5 text-transparent border-gray-300 rounded bg-proj bg-clip-text focus:ring-blue-500"
          />
          <label
            htmlFor="preVisitEmail"
            className="text-sm font-medium leading-none cursor-pointer"
          >
            Receive pre-visit email with tips and suggestions
          </label>
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

export default Book4;