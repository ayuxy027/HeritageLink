import { createContext, useCallback, useState, useEffect, type ReactNode } from 'react';
import type { BookingState } from '../types';

const defaultState: BookingState = {
  name: '',
  phone: '',
  attendees: 1,
  email: '',
  timeSlot: '',
  amenities: [],
  visitPurpose: '',
  interests: [],
  hearAboutUs: '',
};

const STORAGE_KEY = 'hl-booking-v1';

function loadState(): BookingState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<BookingState>;
      return { ...defaultState, ...parsed };
    }
  } catch {
    // ignore parse errors
  }
  return { ...defaultState };
}

export interface BookingContextType {
  booking: BookingState;
  updateBooking: (updates: Partial<BookingState>) => void;
  resetBooking: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingState>(loadState);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(booking));
  }, [booking]);

  const updateBooking = useCallback((updates: Partial<BookingState>) => {
    setBooking((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetBooking = useCallback(() => {
    setBooking({ ...defaultState });
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <BookingContext.Provider value={{ booking, updateBooking, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
}
