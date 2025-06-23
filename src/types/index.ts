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
import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
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