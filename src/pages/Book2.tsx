import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { BookingShell } from '../components/booking/BookingShell';
import { bookingItemVariants } from '../components/booking/variants';
import { useBooking } from '../hooks/useBooking';

interface FormErrors {
  timeSlot?: string;
}

const timeSlots = [
  { time: '9 AM–11 AM', available: 5 },
  { time: '11 AM–1 PM', available: 3 },
  { time: '1 PM–3 PM', available: 0 },
  { time: '3 PM–5 PM', available: 7 },
  { time: '5 PM–7 PM', available: 2 },
];

export default function Book2(): React.JSX.Element {
  const { booking, updateBooking } = useBooking();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!booking.timeSlot) next.timeSlot = 'Please select a time slot';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleNext = () => {
    if (validate()) navigate('/book-3');
  };

  return (
    <BookingShell title="Select a Time Slot" onNext={handleNext} onPrev={() => navigate('/book-1')}>
      <motion.div variants={bookingItemVariants} className="grid grid-cols-2 gap-4">
        {timeSlots.map((slot, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`py-4 px-4 flex flex-col items-center justify-center rounded-xl border-2 transition-colors duration-300 ${
              booking.timeSlot === slot.time
                ? 'border-proj bg-proj bg-opacity-10 text-proj'
                : 'border-gray-300 bg-white hover:bg-gray-50'
            } ${slot.available === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={slot.available === 0}
            onClick={() => updateBooking({ timeSlot: slot.time })}
          >
            <Clock
              className={`w-6 h-6 mb-2 ${booking.timeSlot === slot.time ? 'text-proj' : 'text-gray-500'}`}
              aria-hidden="true"
            />
            <span className="text-sm font-medium">{slot.time}</span>
            <span className="mt-1 text-xs">{slot.available} spots left</span>
          </motion.button>
        ))}
      </motion.div>
      {errors.timeSlot && <p className="mt-2 text-sm text-red-500">{errors.timeSlot}</p>}
    </BookingShell>
  );
}
