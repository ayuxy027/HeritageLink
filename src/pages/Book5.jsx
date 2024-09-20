import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReviewConfirmation from '../components/booking/ReviewConfirmation';

const Book5 = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.formData) {
      setFormData(location.state.formData);
    }
  }, [location.state]);

  const calculateTotal = () => {
    const amenitiesTotal = formData.amenities.reduce((total, amenity) => {
      const amenityPrice = amenities.find(a => a.name === amenity)?.price || 0;
      return total + amenityPrice;
    }, 0);
    return amenitiesTotal + 100; // Adding 100 rupees booking fee
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Booking submitted:', formData);
    // For now, we'll just show an alert
    alert('Booking confirmed! Thank you for choosing our museum.');
    // Navigate to home or a confirmation page
    navigate('/');
  };

  const handlePrevious = () => {
    navigate('/book-4', { state: { formData } });
  };

  const handleEdit = (step) => {
    navigate(`/book-${step}`, { state: { formData } });
  };

  return (
    <div className="container max-w-2xl p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Review and Confirm</h1>
      <ReviewConfirmation formData={formData} calculateTotal={calculateTotal} onEdit={handleEdit} />
      <div className="flex justify-between mt-6">
        <button 
          onClick={handlePrevious} 
          className="px-4 py-2 text-gray-800 transition duration-300 bg-gray-300 rounded-md hover:bg-gray-400"
        >
          Previous
        </button>
        <button 
          onClick={handleSubmit} 
          className="px-4 py-2 text-white transition duration-300 bg-green-600 rounded-md hover:bg-green-700"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default Book5;

const amenities = [
  { name: 'Tour Guide', price: 200, icon: '🧑‍🏫' },
  { name: 'Wheelchair for Elderly', price: 50, icon: '👵' },
  { name: 'Audio Guide', price: 100, icon: '🎧' },
  { name: 'Photography Permit', price: 150, icon: '📷' },
  { name: 'Locker Service', price: 75, icon: '🔒' },
  { name: 'Café Voucher', price: 100, icon: '☕' },
];