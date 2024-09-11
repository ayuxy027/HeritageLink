import React from 'react';
import Button from '../shared/Button';
import { FaTicketAlt } from 'react-icons/fa';

const CTASection = () => {
  return (
    <section className="py-20 text-white bg-gradient-to-bl from-blue-600 to-blue-700">
      <div className="container px-4 mx-auto text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Ready to Experience History?
        </h2>
        <p className="mb-8 text-xl">
          Book your tickets now and enjoy a seamless, queue-free visit to our museum.
        </p>
        <Button className="px-8 py-3 text-lg font-semibold text-white transition-all duration-300 transform rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600">
          <FaTicketAlt className="inline-block mr-2" /> Book Your Visit
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
