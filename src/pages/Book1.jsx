import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisitorInfo from '../components/booking/VisitorInfo';

const Book1 = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    attendees: 1,
    email: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (formData.attendees < 1) newErrors.attendees = 'At least one attendee is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate('/book-2', { state: { formData } });
    }
  };

  return (
    <div className="container max-w-2xl p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Visitor Information</h1>
      <VisitorInfo formData={formData} setFormData={setFormData} errors={errors} />
      <button 
        onClick={handleNext} 
        className="w-full px-4 py-2 mt-6 text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
};

export default Book1;