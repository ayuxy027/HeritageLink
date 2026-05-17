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
