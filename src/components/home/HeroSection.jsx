import React, { useState, useEffect, useCallback } from 'react';
import Button from '../shared/Button';
import { FaArrowRight, FaCalendarAlt } from 'react-icons/fa';

const HeroSection = () => {
  const dynamicWords = ["Blazing-Fast", "AI-Powered", "Hassle-Free"];
  const [dynamicText, setDynamicText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleTyping = useCallback(() => {
    const currentWord = dynamicWords[wordIndex];
    const shouldDelete = isDeleting && dynamicText === '';
    const shouldChangeWord = !isDeleting && dynamicText === currentWord;

    if (shouldDelete) {
      setIsDeleting(false);
      setWordIndex((prevIndex) => (prevIndex + 1) % dynamicWords.length);
    } else if (shouldChangeWord) {
      setIsDeleting(true);
    } else {
      setDynamicText(prevText =>
        isDeleting ? currentWord.slice(0, prevText.length - 1) : currentWord.slice(0, prevText.length + 1)
      );
    }
  }, [dynamicText, isDeleting, wordIndex, dynamicWords]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleTyping();
    }, isDeleting ? 150 : 250);

    return () => clearTimeout(timer);
  }, [handleTyping, isDeleting]);

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-b from-gray-50 to-white sm:py-24 lg:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute right-0 w-1/2 h-full text-gray-100 transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>
        <svg className="absolute left-0 w-1/4 h-full transform -translate-x-1/2 text-blue-50" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <circle cx="50" cy="50" r="50" />
        </svg>
        <svg className="absolute top-0 w-1/4 left-1/4 h-1/4 text-yellow-50" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="0,0 100,0 50,100" />
        </svg>
      </div>
      <div className="relative max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 sm:text-4xl sm:leading-tight lg:leading-tight lg:text-5xl font-pj">
            Experience History with, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
              {dynamicText}
              <span className="cursor" aria-hidden="true"></span>
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">Bookings</span>
          </h1>
          <p className="max-w-xl mx-auto mt-4 text-lg text-gray-600 sm:mt-6 font-inter lg:mx-0">
            Transform museum visits with our chat powered ticketing chatbot,
            <br />
            Skip the queues and enjoy seamless booking.
          </p>
          <div className="flex flex-col items-center justify-center mt-8 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <Button className="w-full sm:w-auto">
              Book Tickets
              <FaArrowRight className="ml-2" />
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto">
              View Slots
              <FaCalendarAlt className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;