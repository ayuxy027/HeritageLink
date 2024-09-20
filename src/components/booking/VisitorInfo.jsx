import React from 'react';
import { motion } from 'framer-motion';
import { Users, Info } from 'lucide-react';

const VisitorInfo = ({ formData, setFormData, errors }) => {
  return (
    <div className="space-y-6">
      <motion.div variants={fadeInUp}>
        <label htmlFor="name" className="block text-lg font-medium">Name</label>
        <input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your name"
          className="block w-full px-4 py-3 mt-1 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </motion.div>
      <motion.div variants={fadeInUp}>
        <label htmlFor="phone" className="block text-lg font-medium">Phone Number</label>
        <div className="flex mt-1">
          <select className="block w-[180px] px-4 py-3 bg-white border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="in">🇮🇳 +91 (India)</option>
            <option value="us">🇺🇸 +1 (USA)</option>
            <option value="uk">🇬🇧 +44 (UK)</option>
          </select>
          <input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Enter phone number"
            className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 shadow-sm rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
      </motion.div>
      <motion.div variants={fadeInUp}>
        <label htmlFor="attendees" className="block text-lg font-medium">Number of Attendees</label>
        <div className="relative mt-1">
          <input
            id="attendees"
            type="number"
            min={1}
            max={10}
            value={formData.attendees}
            onChange={(e) => setFormData({ ...formData, attendees: parseInt(e.target.value) })}
            className="block w-full px-4 py-3 pr-10 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Users className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        {errors.attendees && <p className="mt-1 text-sm text-red-500">{errors.attendees}</p>}
      </motion.div>
      <motion.div variants={fadeInUp}>
        <label htmlFor="email" className="block text-lg font-medium">Email Address (Optional)</label>
        <div className="relative mt-1">
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter your email"
            className="block w-full px-4 py-3 pr-10 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Info className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VisitorInfo;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 }
};