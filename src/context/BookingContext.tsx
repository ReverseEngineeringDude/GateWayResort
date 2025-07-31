import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  state: string;
  place: string;
  members: number;
  rooms: number;
  roomType: 'AC' | 'Non-AC';
  checkIn: string;
  checkOut: string;
  timestamp: string;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>([
    // Sample data for demonstration
    {
      id: '1',
      name: 'John Doe',
      phone: '+91 98765 43210',
      email: 'john@example.com',
      state: 'Kerala',
      place: 'Kochi',
      members: 4,
      rooms: 2,
      roomType: 'AC',
      checkIn: '2024-01-15',
      checkOut: '2024-01-18',
      timestamp: '2024-01-10T10:00:00Z',
    },
    {
      id: '2',
      name: 'Jane Smith',
      phone: '+91 98765 43211',
      email: 'jane@example.com',
      state: 'Tamil Nadu',
      place: 'Chennai',
      members: 2,
      rooms: 1,
      roomType: 'Non-AC',
      checkIn: '2024-01-20',
      checkOut: '2024-01-22',
      timestamp: '2024-01-12T14:30:00Z',
    },
    {
      id: '3',
      name: 'Raj Patel',
      phone: '+91 98765 43212',
      email: 'raj@example.com',
      state: 'Gujarat',
      place: 'Ahmedabad',
      members: 6,
      rooms: 3,
      roomType: 'AC',
      checkIn: '2024-01-25',
      checkOut: '2024-01-28',
      timestamp: '2024-01-14T09:15:00Z',
    },
  ]);

  const addBooking = (booking: Booking) => {
    setBookings(prev => [...prev, booking]);
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};