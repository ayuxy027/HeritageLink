import React from 'react';
import { FaTicketAlt, FaCalendarAlt, FaLanguage, FaChartBar } from 'react-icons/fa';

const Footer = () => (
  <footer className="py-12 text-white bg-gradient-to-br from-blue-600 to-blue-700">
    <div className="container px-4 mx-auto">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        <div>
          <h3 className="mb-4 text-lg font-semibold">HeritageLink</h3>
          <ul className="space-y-2">
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-200">About Us</a></li>
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-200">Careers</a></li>
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-200">Press</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Visit</h3>
          <ul className="space-y-2">
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-200">Exhibitions</a></li>
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-200">Events</a></li>
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-200">Tours</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-200">FAQs</a></li>
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-200">Accessibility</a></li>
            <li><a href="#" className="transition-colors duration-300 hover:text-blue-200">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Connect</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-white transition-colors duration-300 hover:text-blue-200">
              <FaTicketAlt className="w-6 h-6" />
            </a>
            <a href="#" className="text-white transition-colors duration-300 hover:text-blue-200">
              <FaCalendarAlt className="w-6 h-6" />
            </a>
            <a href="#" className="text-white transition-colors duration-300 hover:text-blue-200">
              <FaLanguage className="w-6 h-6" />
            </a>
            <a href="#" className="text-white transition-colors duration-300 hover:text-blue-200">
              <FaChartBar className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="pt-8 mt-12 text-center border-t border-blue-400">
        <p>&copy; 2024 HeritageLink. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;