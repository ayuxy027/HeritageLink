import React from 'react';
import { motion } from 'framer-motion';

const interestOptions = [
  'Art', 'History', 'Science', 'Technology', 'Nature', 'Culture'
];

export default function Preferences({ formData, setFormData, handleNext, handlePrevious }) {
  return (
    <div className="space-y-6">
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.3 }}>
        <label htmlFor="visitPurpose" className="block text-lg font-medium">Visiting Purpose</label>
        <select
          id="visitPurpose"
          value={formData.visitPurpose || ''}
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
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.4 }}>
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
      </motion.div>
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.5 }}>
        <label className="block text-lg font-medium">Interests</label>
        <div className="grid grid-cols-3 gap-3 mt-2">
          {interestOptions.map((interest) => (
            <motion.div
              key={interest}
              className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer ${
                (formData.interests || []).includes(interest)
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const newInterests = (formData.interests || []).includes(interest)
                  ? (formData.interests || []).filter(i => i !== interest)
                  : [...(formData.interests || []), interest];
                setFormData({ ...formData, interests: newInterests });
              }}
            >
              <span className="text-sm font-medium">{interest}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.6 }}>
        <label htmlFor="hearAboutUs" className="block text-lg font-medium">How did you hear about us?</label>
        <select
          id="hearAboutUs"
          value={formData.hearAboutUs || ''}
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
      </motion.div>
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.7 }}>
        <label htmlFor="specialRequests" className="block text-lg font-medium">Special Requests/Accessibility Needs</label>
        <textarea
          id="specialRequests"
          rows={3}
          placeholder="Enter any special requests or accessibility needs"
          value={formData.specialRequests || ''}
          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
          className="block w-full px-4 py-3 mt-1 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </motion.div>
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.8 }} className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="preVisitEmail"
          checked={formData.preVisitEmail || false}
          onChange={(e) => setFormData({ ...formData, preVisitEmail: e.target.checked })}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label
          htmlFor="preVisitEmail"
          className="text-sm font-medium leading-none cursor-pointer"
        >
          Receive pre-visit email with tips and suggestions
        </label>
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