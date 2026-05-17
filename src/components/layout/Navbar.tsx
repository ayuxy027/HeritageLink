import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Explore', link: '/explore' },
  { name: 'Events', link: '/events' },
  { name: 'FAQ', link: '/faq' },
  { name: 'Contact', link: '/contact' },
];

interface NavItemProps {
  to: string;
  text: string;
  index: number;
  isActive: boolean;
}

function NavItem({ to, text, index, isActive }: NavItemProps) {
  return (
    <motion.div
      className={`px-3 py-2 text-base font-medium rounded-md ${
        isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-300'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
    >
      <Link to={to}>{text}</Link>
    </motion.div>
  );
}

interface MobileNavItemProps {
  to: string;
  text: string;
  isActive: boolean;
}

function MobileNavItem({ to, text, isActive }: MobileNavItemProps) {
  return (
    <motion.div
      className="block overflow-hidden rounded-md"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to={to} className="block">
        <motion.div
          className={`px-3 py-2 text-base font-medium transition-all duration-300 ease-in-out ${
            isActive ? 'text-yellow-400 bg-indigo-800/50' : 'text-white hover:bg-indigo-800/50'
          }`}
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          {text}
        </motion.div>
      </Link>
    </motion.div>
  );
}

interface NavLinkProps {
  href: string;
  text: string;
  variant?: 'primary' | 'secondary';
}

function NavLink({ href, text, variant = 'secondary' }: NavLinkProps) {
  const baseClasses =
    'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500';
  const variantClasses =
    variant === 'primary'
      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900'
      : 'bg-white/10 hover:bg-white/20 text-white';

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        to={href}
        className={`${baseClasses} ${variantClasses}`}
      >
        {text}
      </Link>
    </motion.div>
  );
}

interface MobileNavLinkProps {
  to: string;
  text: string;
  variant?: 'primary' | 'secondary';
}

function MobileNavLink({ to, text, variant = 'secondary' }: MobileNavLinkProps) {
  const baseClasses = 'block w-full px-4 py-2 text-sm font-medium text-center rounded-md focus:outline-none';
  const variantClasses =
    variant === 'primary'
      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900'
      : 'bg-white/10 text-white';

  return (
    <Link to={to} className={`${baseClasses} ${variantClasses}`}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        {text}
      </motion.div>
    </Link>
  );
}

export default function Navbar(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="h-20" />
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 font-body transition-colors duration-300 ease-in-out ${
          isScrolled ? 'shadow-md backdrop-blur-sm bg-indigo-900/90' : 'bg-proj'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <motion.div
                className="flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/">
                  <motion.h1
                    className="text-xl font-bold text-white sm:text-2xl lg:text-3xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    HeritageLink
                  </motion.h1>
                </Link>
              </motion.div>
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
              {navItems.map((item, index) => (
                <NavItem
                  key={item.name}
                  to={item.link}
                  text={item.name}
                  index={index}
                  isActive={location.pathname === item.link}
                />
              ))}
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <NavLink href="/login" text="Login" />
              <NavLink href="/book" text="Book Now" variant="primary" />
              <motion.button
                onClick={toggleMenu}
                type="button"
                className="inline-flex justify-center items-center p-2 ml-4 text-white rounded-md sm:hidden hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
                {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
              </motion.button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              className="border-t border-indigo-700 shadow-lg backdrop-blur-lg sm:hidden bg-indigo-900/95"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <MobileNavItem
                    key={item.name}
                    to={item.link}
                    text={item.name}
                    isActive={location.pathname === item.link}
                  />
                ))}
                <div className="grid grid-cols-2 gap-2 pt-2 mt-2 border-t border-indigo-700">
                  <MobileNavLink to="/login" text="Login" variant="secondary" />
                  <MobileNavLink to="/book" text="Book Now" variant="primary" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
