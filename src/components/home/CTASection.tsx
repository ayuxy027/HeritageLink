import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTicketAlt } from 'react-icons/fa';

const GlowingButton = (): React.JSX.Element => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/book');
  };

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="glow-button px-8 py-3 text-lg font-semibold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
    >
      <FaTicketAlt className="inline-block mr-2" aria-hidden="true" />
      Book Your Visit
    </motion.button>
  );
};

export default function CTASection(): React.JSX.Element {
  return (
    <section className="relative py-16 overflow-hidden bg-white">
      <div className="container relative z-10 px-4 mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 text-3xl font-bold text-transparent md:text-4xl bg-clip-text bg-proj"
        >
          Ready to Experience History?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 text-xl text-gray-600"
        >
          Book your tickets now and enjoy a seamless, queue-free visit to our museum.
        </motion.p>
        <GlowingButton />
      </div>
    </section>
  );
}
