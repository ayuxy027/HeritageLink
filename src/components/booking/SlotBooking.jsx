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

const SlotBooking = ({ formData, setFormData, errors }) => {
  return (
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
  );
};

export default SlotBooking;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 }
};