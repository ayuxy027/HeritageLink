import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import toast, { Toaster } from 'react-hot-toast';
import { BookingShell } from '../components/booking/BookingShell';
import { bookingItemVariants } from '../components/booking/variants';
import { useBooking } from '../hooks/useBooking';
import { amenities, BASE_BOOKING_FEE } from '../data/data';

function generateBookingId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 9; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function Book5(): React.JSX.Element {
  const { booking } = useBooking();
  const navigate = useNavigate();

  const calculateTotal = () => {
    const amenitiesTotal = booking.amenities.reduce((total: number, amenity: string) => {
      const item = amenities.find((a) => a.name === amenity);
      return total + (item?.price ?? 0);
    }, 0);
    return amenitiesTotal + BASE_BOOKING_FEE;
  };

  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  };

  const handleSubmit = () => {
    triggerConfetti();
    toast.success('Booking confirmed! Generating your QR code...', {
      duration: 3000,
      icon: '🎉',
    });
    setTimeout(() => {
      const bookingDetails = {
        ...booking,
        bookingId: generateBookingId(),
        total: calculateTotal(),
      };
      navigate('/qr-code', { state: bookingDetails });
    }, 5000);
  };

  const handleEdit = (step: number) => {
    navigate(`/book-${step}`);
  };

  return (
    <BookingShell
      title="Review and Confirm"
      onNext={handleSubmit}
      onPrev={() => navigate('/book-4')}
      nextLabel="Confirm Booking"
    >
      <Toaster position="top-center" reverseOrder={false} />
      <motion.div
        className="p-6 space-y-4 bg-gray-50 rounded-xl shadow-inner"
        variants={bookingItemVariants}
      >
        {Object.entries(booking).map(([key, value]) => {
          if (!value || (Array.isArray(value) && value.length === 0)) return null;
          return (
            <motion.div
              key={key}
              className="flex justify-between items-center text-sm"
              variants={bookingItemVariants}
            >
              <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
              <span className="text-right">{Array.isArray(value) ? value.join(', ') : String(value)}</span>
            </motion.div>
          );
        })}
        <motion.div
          className="flex justify-between items-center pt-4 mt-4 text-xl font-bold border-t border-gray-200"
          variants={bookingItemVariants}
        >
          <span>Total:</span>
          <span className="text-proj">
            ₹{calculateTotal()} (including ₹{BASE_BOOKING_FEE} booking fee)
          </span>
        </motion.div>
      </motion.div>
      <motion.button
        type="button"
        onClick={() => handleEdit(1)}
        className="px-4 py-3 w-full text-sm font-medium bg-opacity-10 rounded-xl text-proj bg-proj hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-proj"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        variants={bookingItemVariants}
      >
        <Edit2 className="inline-block mr-2 w-4 h-4" aria-hidden="true" /> Edit Booking
      </motion.button>
    </BookingShell>
  );
}
