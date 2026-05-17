import type { AmenityItem } from '../types/booking';

export const amenities: AmenityItem[] = [
  { name: 'Tour Guide', price: 200, icon: '🧑‍🏫' },
  { name: 'Wheelchair for Elderly', price: 50, icon: '👵' },
  { name: 'Audio Guide', price: 100, icon: '🎧' },
  { name: 'Photography Permit', price: 150, icon: '📷' },
  { name: 'Locker Service', price: 75, icon: '🔒' },
  { name: 'Café Voucher', price: 100, icon: '☕' },
];

export const BASE_BOOKING_FEE = 100;
