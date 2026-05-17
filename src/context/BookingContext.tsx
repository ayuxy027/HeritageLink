import { createContext, useCallback, useContext, useState, useEffect, type ReactNode } from 'react';
import type { BookingState } from '../types/booking';

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

// eslint-disable-next-line react-refresh/only-export-components
export function useBooking(): BookingContextType {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return ctx;
}
