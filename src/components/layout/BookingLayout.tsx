import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BookingProvider } from '../../context/BookingContext';

const steps = [
  { number: 1, title: 'Visitor Info' },
  { number: 2, title: 'Slot Booking' },
  { number: 3, title: 'Amenities' },
  { number: 4, title: 'Preferences' },
  { number: 5, title: 'Review & Confirm' },
];

const BookingLayout = (): React.JSX.Element => {
  const location = useLocation();
  const stepMatch = location.pathname.match(/book-(\d)/);
  const stepString = stepMatch?.[1];
  const currentStep = stepString ? parseInt(stepString, 10) : 1;

  return (
    <BookingProvider>
      <div className="container px-4 py-8 mx-auto">
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex flex-col items-center ${
                  currentStep === step.number ? 'text-proj' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    currentStep === step.number ? 'bg-proj text-white' : 'bg-gray-200'
                  }`}
                >
                  {step.number}
                </div>
                <span className="mt-2 text-sm">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="relative w-full h-2 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-2 transition-all duration-300 ease-in-out rounded-full bg-proj"
              style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
            />
          </div>
        </div>
        <Outlet />
      </div>
    </BookingProvider>
  );
};

export default BookingLayout;
