import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Amenities from '../components/booking/Amenities';

const Book3 = () => {
  const [formData, setFormData] = useState({
    amenities: [],
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.formData) {
      setFormData(prevData => ({ ...prevData, ...location.state.formData }));
    }
  }, [location.state]);

  const calculateTotal = () => {
    const amenitiesTotal = formData.amenities.reduce((total, amenity) => {
      const amenityPrice = amenities.find(a => a.name === amenity)?.price || 0;
      return total + amenityPrice;
    }, 0);
    return amenitiesTotal + 100; // Adding 100 rupees booking fee
  };

  const handleNext = () => {
    navigate('/book-4', { state: { formData } });
  };

  const handlePrevious = () => {
    navigate('/book-2', { state: { formData } });
  };

  return (
    <div className="container max-w-2xl p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Amenities</h1>
      <Amenities formData={formData} setFormData={setFormData} calculateTotal={calculateTotal} />
      <div className="flex justify-between mt-6">
        <button 
          onClick={handlePrevious} 
          className="px-4 py-2 text-gray-800 transition duration-300 bg-gray-300 rounded-md hover:bg-gray-400"
        >
          Previous
        </button>
        <button 
          onClick={handleNext} 
          className="px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Book3;

const amenities = [
  { name: 'Tour Guide', price: 200, icon: '🧑‍🏫' },
  { name: 'Wheelchair for Elderly', price: 50, icon: '👵' },
  { name: 'Audio Guide', price: 100, icon: '🎧' },
  { name: 'Photography Permit', price: 150, icon: '📷' },
  { name: 'Locker Service', price: 75, icon: '🔒' },
  { name: 'Café Voucher', price: 100, icon: '☕' },
];