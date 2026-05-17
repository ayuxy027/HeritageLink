import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Phone, Users, Mail } from 'lucide-react';
import { BookingShell, bookingItemVariants } from '../components/booking/BookingShell';
import { useBooking } from '../context/BookingContext';
import '../styles/shared-input.css';

interface FormErrors {
  name?: string;
  phone?: string;
  attendees?: string;
  email?: string;
}

export default function Book1(): React.JSX.Element {
  const { booking, updateBooking } = useBooking();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!booking.name.trim()) next.name = 'Name is required';
    if (!booking.phone.trim()) next.phone = 'Phone number is required';
    if (booking.attendees < 1) next.attendees = 'At least one attendee is required';
    if (booking.email && !/\S+@\S+\.\S+/.test(booking.email)) next.email = 'Invalid email format';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleNext = () => {
    if (validate()) navigate('/book-2');
  };

  return (
    <BookingShell title="Visitor Information" onNext={handleNext}>
      <motion.div variants={bookingItemVariants}>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
          Name
        </label>
        <div className="relative">
          <input
            id="name"
            value={booking.name}
            onChange={(e) => updateBooking({ name: e.target.value })}
            placeholder="Enter your name"
            className="input-base input-with-icon"
          />
          <User className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 -translate-y-1/2" aria-hidden="true" />
        </div>
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </motion.div>

      <motion.div variants={bookingItemVariants}>
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <div className="flex">
          <select aria-label="Country code" className="px-3 py-3 w-24 bg-white rounded-l-md border border-gray-300 focus:outline-none focus:ring-proj focus:border-proj">
            <option value="in">🇮🇳 +91</option>
            <option value="us">🇺🇸 +1</option>
            <option value="uk">🇬🇧 +44</option>
          </select>
          <div className="relative flex-1">
            <input
              id="phone"
              value={booking.phone}
              onChange={(e) => updateBooking({ phone: e.target.value })}
              placeholder="Enter phone number"
              className="py-3 pr-4 pl-10 w-full placeholder-gray-400 text-gray-900 rounded-r-md border border-gray-300 focus:ring-proj focus:border-proj"
            />
            <Phone className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 -translate-y-1/2" aria-hidden="true" />
          </div>
        </div>
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
      </motion.div>

      <motion.div variants={bookingItemVariants}>
        <label htmlFor="attendees" className="block mb-2 text-sm font-medium text-gray-700">
          Number of Attendees
        </label>
        <div className="relative">
          <input
            id="attendees"
            type="number"
            min={1}
            max={10}
            value={booking.attendees}
            onChange={(e) => updateBooking({ attendees: parseInt(e.target.value) || 1 })}
            className="py-3 pr-4 pl-10 w-full placeholder-gray-400 text-gray-900 rounded-md border border-gray-300 focus:ring-proj focus:border-proj"
          />
          <Users className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 -translate-y-1/2" aria-hidden="true" />
        </div>
        {errors.attendees && <p className="mt-1 text-xs text-red-500">{errors.attendees}</p>}
      </motion.div>

      <motion.div variants={bookingItemVariants}>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
          Email Address (Optional)
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            value={booking.email}
            onChange={(e) => updateBooking({ email: e.target.value })}
            placeholder="Enter your email"
            className="py-3 pr-4 pl-10 w-full placeholder-gray-400 text-gray-900 rounded-md border border-gray-300 focus:ring-proj focus:border-proj"
          />
          <Mail className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 -translate-y-1/2" aria-hidden="true" />
        </div>
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </motion.div>
    </BookingShell>
  );
}
