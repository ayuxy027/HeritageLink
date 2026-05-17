import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookingShell, bookingItemVariants } from '../components/booking/BookingShell';
import { useBooking } from '../context/BookingContext';

interface FormErrors {
  interests?: string;
  hearAboutUs?: string;
}

const interestOptions = ['Art', 'History', 'Science', 'Technology', 'Nature', 'Culture'];

export default function Book4(): React.JSX.Element {
  const { booking, updateBooking } = useBooking();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (booking.interests.length === 0) next.interests = 'Please select at least one interest';
    if (!booking.hearAboutUs) next.hearAboutUs = 'Please let us know how you heard about us';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleNext = () => {
    if (validate()) navigate('/book-5');
  };

  const toggleInterest = (interest: string) => {
    const newInterests = booking.interests.includes(interest)
      ? booking.interests.filter((i) => i !== interest)
      : [...booking.interests, interest];
    updateBooking({ interests: newInterests });
  };

  return (
    <BookingShell title="Preferences" onNext={handleNext} onPrev={() => navigate('/book-3')}>
      <motion.div variants={bookingItemVariants}>
        <label htmlFor="visitPurpose" className="block mb-2 text-sm font-medium text-gray-700">
          Visiting Purpose
        </label>
        <select
          id="visitPurpose"
          value={booking.visitPurpose}
          onChange={(e) => updateBooking({ visitPurpose: e.target.value })}
          className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-proj focus:border-proj"
        >
          <option value="">Select purpose</option>
          <option value="leisure">Leisure</option>
          <option value="educational">Educational Tour</option>
          <option value="group">Group Tour</option>
          <option value="other">Other</option>
        </select>
      </motion.div>

      <motion.div variants={bookingItemVariants}>
        <label className="block mb-2 text-sm font-medium text-gray-700">Interests</label>
        <div className="grid grid-cols-3 gap-3">
          {interestOptions.map((interest) => (
            <motion.button
              key={interest}
              type="button"
              aria-pressed={booking.interests.includes(interest)}
              className={`flex items-center justify-center p-3 text-sm border rounded-xl cursor-pointer ${
                booking.interests.includes(interest)
                  ? 'border-proj bg-proj bg-opacity-10 text-proj'
                  : 'border-gray-300 hover:border-proj'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleInterest(interest)}
            >
              <span>{interest}</span>
            </motion.button>
          ))}
        </div>
        {errors.interests && <p className="mt-2 text-sm text-red-500">{errors.interests}</p>}
      </motion.div>

      <motion.div variants={bookingItemVariants}>
        <label htmlFor="hearAboutUs" className="block mb-2 text-sm font-medium text-gray-700">
          How did you hear about us?
        </label>
        <select
          id="hearAboutUs"
          value={booking.hearAboutUs}
          onChange={(e) => updateBooking({ hearAboutUs: e.target.value })}
          className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-proj focus:border-proj"
        >
          <option value="">Select an option</option>
          <option value="social_media">Social Media</option>
          <option value="friend">Friend or Family</option>
          <option value="advertisement">Advertisement</option>
          <option value="search_engine">Search Engine</option>
          <option value="other">Other</option>
        </select>
        {errors.hearAboutUs && <p className="mt-2 text-sm text-red-500">{errors.hearAboutUs}</p>}
      </motion.div>
    </BookingShell>
  );
}
