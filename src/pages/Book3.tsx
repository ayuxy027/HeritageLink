import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BookingShell } from '../components/booking/BookingShell';
import { bookingItemVariants } from '../components/booking/variants';
import { useBooking } from '../hooks/useBooking';
import { amenities, BASE_BOOKING_FEE } from '../data/data';

export default function Book3(): React.JSX.Element {
  const { booking, updateBooking } = useBooking();
  const navigate = useNavigate();

  const calculateTotal = () => {
    const amenitiesTotal = booking.amenities.reduce((total: number, amenity: string) => {
      const item = amenities.find((a) => a.name === amenity);
      return total + (item?.price ?? 0);
    }, 0);
    return amenitiesTotal + BASE_BOOKING_FEE;
  };

  const toggleAmenity = (name: string) => {
    const newAmenities = booking.amenities.includes(name)
      ? booking.amenities.filter((a) => a !== name)
      : [...booking.amenities, name];
    updateBooking({ amenities: newAmenities });
  };

  return (
    <BookingShell title="Amenities" onNext={() => navigate('/book-4')} onPrev={() => navigate('/book-2')}>
      <motion.div variants={bookingItemVariants} className="grid grid-cols-2 gap-4">
        {amenities.map((amenity) => (
          <motion.div
            key={amenity.name}
            className={`flex items-center p-4 space-x-3 bg-white border-2 rounded-xl transition-colors duration-300 ${
              booking.amenities.includes(amenity.name)
                ? 'border-proj bg-proj bg-opacity-10'
                : 'border-gray-200 hover:border-proj'
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="checkbox"
              id={`amenity-${amenity.name}`}
              checked={booking.amenities.includes(amenity.name)}
              onChange={() => toggleAmenity(amenity.name)}
              className="w-5 h-5 border-gray-300 rounded text-proj focus:ring-proj"
            />
            <label htmlFor={`amenity-${amenity.name}`} className="flex-1 text-sm cursor-pointer">
              <div className="flex items-center">
                <span className="mr-2 text-2xl">{amenity.icon}</span>
                <span className="font-medium">{amenity.name}</span>
              </div>
              <span className="block mt-1 text-sm text-gray-500">₹{amenity.price}</span>
            </label>
            <Info className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="mt-8 text-2xl font-bold text-center text-transparent bg-proj bg-clip-text"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        variants={bookingItemVariants}
      >
        Total: ₹{calculateTotal()} (including ₹{BASE_BOOKING_FEE} booking fee)
      </motion.div>
    </BookingShell>
  );
}
