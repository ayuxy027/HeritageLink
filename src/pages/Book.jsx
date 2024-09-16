import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import VisitorInfo from '../components/book/VisitorInfo';
import SlotBooking from '../components/book/SlotBooking';
import Amenities from '../components/book/Amenities';
import Preferences from '../components/book/Preferences';
import ReviewConfirm from '../components/book/ReviewConfirm';
import { BackgroundPattern } from '/src/components/shared/BackgroundPattern.jsx'

const steps = [
  { title: 'Visitor Info', component: VisitorInfo },
  { title: 'Slot Booking', component: SlotBooking },
  { title: 'Amenities', component: Amenities },
  { title: 'Preferences', component: Preferences },
  { title: 'Review & Confirm', component: ReviewConfirm },
];

export default function Book() {
  const { step } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const stepNumber = parseInt(step);
    if (isNaN(stepNumber) || stepNumber < 1 || stepNumber > steps.length) {
      navigate('/book-1', { replace: true });
    } else {
      setCurrentStep(stepNumber);
    }
  }, [step, navigate]);

  const handleNext = () => {
    if (currentStep < steps.length) {
      navigate(`/book-${currentStep + 1}`);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      navigate(`/book-${currentStep - 1}`);
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-12 overflow-hidden bg-gray-100 sm:px-6 lg:px-8">
      <BackgroundPattern />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-4xl mt-10"
      >
        <div className="overflow-hidden bg-white rounded-lg shadow-2xl">
          <div className="p-8 space-y-4">
            <motion.h1 
              className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-proj"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Museum Pre-Booking Form
            </motion.h1>
            <motion.p 
              className="text-center text-gray-600"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Embark on a journey through time and culture
            </motion.p>
          </div>
          <div className="p-8 space-y-8">
            <div className="relative w-full bg-gray-200 rounded-full h-2.5">
              <motion.div 
                className="absolute top-0 left-0 h-2.5 rounded-full bg-proj"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between mb-8">
              {steps.map((s, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-col items-center ${currentStep === index + 1 ? 'bg-proj text-transparent bg-clip-text' : 'text-gray-400'}`}
                  animate={{ scale: currentStep === index + 1 ? 1.1 : 1, y: currentStep === index + 1 ? -5 : 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className={`w-8 h-8 mb-2 rounded-full flex items-center justify-center ${currentStep === index + 1 ? 'bg-proj text-white' : 'bg-gray-200'}`}>
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium">{s.title}</span>
                </motion.div>
              ))}
            </div>
            <CurrentStepComponent 
              formData={formData} 
              setFormData={setFormData} 
              handleNext={handleNext} 
              handlePrevious={handlePrevious}
              isFirstStep={currentStep === 1}
              isLastStep={currentStep === steps.length}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}