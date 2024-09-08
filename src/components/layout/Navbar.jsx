import React, { useState, useEffect } from 'react';
import Button from '../shared/Button';

const navItems = [
  { name: 'Explore', link: '/explore' },
  { name: 'Events', link: '/events' },
  { name: 'Collections', link: '/collections' },
  { name: 'About', link: '/about' },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="container px-4 py-4 mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
              HeritageLink
            </span>
          </div>

          <nav className="hidden space-x-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="px-1 py-2 text-gray-700 transition-colors duration-300 hover:text-blue-600"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="items-center hidden space-x-4 lg:flex">
            <Button variant="secondary">Login</Button>
            <Button>Book Now</Button>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 transition-colors duration-300 hover:text-blue-600"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mt-4 bg-white rounded-lg shadow-lg lg:hidden">
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  className="px-4 py-3 text-gray-600 transition-colors duration-300 hover:text-blue-600 hover:bg-blue-50"
                >
                  {item.name}
                </a>
              ))}
            </nav>
            <div className="flex flex-col p-4 mt-4 space-y-2">
              <Button variant="secondary">Login</Button>
              <Button>Book Now</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;