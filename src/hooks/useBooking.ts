import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';
import type { BookingContextType } from '../context/BookingContext';

export function useBooking(): BookingContextType {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return ctx;
}
