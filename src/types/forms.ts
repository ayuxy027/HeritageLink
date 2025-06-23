// Form type definitions for booking pages

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

import React from 'react';

export interface CustomButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
} 