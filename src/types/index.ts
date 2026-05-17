// Common types for the HeritageLink application

export interface MuseumItem {
  id: string;
  type: 'exhibition' | 'collection' | 'workshop' | 'event' | 'tour';
  title: string;
  description: string;
  image: string;
  location: string;
  category: string;
  price: number;
  availability?: string;
  time?: string;
  duration?: string;
  ageGroup?: string;
  capacity?: number;
  instructor?: string;
  date?: string;
}

export interface Exhibition extends MuseumItem {
  type: 'exhibition';
  availability: string;
  time: string;
}

export interface Collection extends MuseumItem {
  type: 'collection';
}

export interface Workshop extends MuseumItem {
  type: 'workshop' | 'tour';
  duration: string;
  ageGroup: string;
  capacity: number;
  instructor: string;
}

export interface Event extends MuseumItem {
  type: 'event';
  date: string;
  time: string;
}

export interface Tour extends MuseumItem {
  type: 'tour';
  duration: string;
}

export interface MuseumData {
  exhibitions: Exhibition[];
  collections: Collection[];
  workshops: Workshop[];
  events: Event[];
  tours: Tour[];
}

// Navigation and UI types
export interface NavigationItem {
  name: string;
  href: string;
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: Date | null;
  tickets: number;
  specialRequests?: string;
}

// Component props types
import type { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface LoadingSpinnerProps {
  fullScreen?: boolean;
  color?: 'primary' | 'secondary' | 'indigo' | 'blue';
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

// Chat bot types
export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Search types
export interface SearchResult {
  id: string;
  title: string;
  type: string;
  location: string;
  category: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Route params
export interface RouteParams {
  [key: string]: string | undefined;
}

// Booking step types
export interface Book1FormData {
  name: string;
  phone: string;
  attendees: number;
  email: string;
}

export interface Book1Errors {
  name?: string;
  phone?: string;
  attendees?: string;
  email?: string;
}

export interface Book2FormData {
  timeSlot: string;
}

export interface Book2Errors {
  timeSlot?: string;
}

export interface Book4FormData {
  visitPurpose: string;
  interests: string[];
  hearAboutUs: string;
}

export interface Book4Errors {
  interests?: string;
  hearAboutUs?: string;
}

export interface Book5FormData {
  amenities?: string[];
}

export interface QrCodeOptions {
  weekday: 'long' | 'short' | 'narrow';
  day: 'numeric' | '2-digit';
  month: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit';
  year: 'numeric' | '2-digit';
}

export interface CustomButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export interface AmenityItem {
  name: string;
  price: number;
  icon: string;
}

export interface BookingState {
  name: string;
  phone: string;
  attendees: number;
  email: string;
  timeSlot: string;
  amenities: string[];
  visitPurpose: string;
  interests: string[];
  hearAboutUs: string;
}
