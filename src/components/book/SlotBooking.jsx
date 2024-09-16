import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const timeSlots = [
  { time: '9 AM–11 AM', available: 5 },
  { time: '11 AM–1 PM', available: 3 },
  { time: '1 PM–3 PM', available: 0 },
  { time: '3 PM–5 PM', available: 7 },
  { time: '5 PM–7 PM', available: 2 },
];

export default function SlotBooking({ formData, setFormData, handleNext, handlePrevious }) {
  return (
    <div className="space-y-6">
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.3 }}>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {timeSlots.map((slot, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`h-24 w-full flex flex-col items-center justify-center rounded-lg border-2 ${
                formData.timeSlot === slot.time
                  ? 'border-blue-600 bg-proj text-white'
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