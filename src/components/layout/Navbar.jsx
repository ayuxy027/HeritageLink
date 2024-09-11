import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: 'Explore', link: '/explore' },
  { name: 'Events', link: '/events' },
  { name: 'Collections', link: '/collections' },
  { name: 'About', link: '/about' },
]

export default function Component() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm font-body">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <motion.a
              href="/"
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h1 className="text-xl font-bold text-transparent transition duration-500 ease-in-out bg-clip-text bg-proj hover:bg-proj-hover sm:text-2xl lg:text-3xl">
                HeritageLink
              </h1>
            </motion.a>
          </div>
          
          {/* Desktop Navigation Items */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            {navItems.map((item) => (
              <NavItem key={item.name} href={item.link} text={item.name} />
            ))}
          </div>
          
          {/* Login, Book Now buttons and Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <NavButton href="/login" text="Login" />
            <NavButton href="/book" text="Book Now" />
            <motion.button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 ml-4 text-gray-400 rounded-md sm:hidden hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="sm:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <MobileNavItem key={item.name} href={item.link} text={item.name} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// Desktop Navigation Item Component
function NavItem({ href, text }) {
  return (
    <motion.a
      href={href}
      className="px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900"
      whileHover={{ backgroundColor: 'rgba(43, 108, 176, 0.1)', scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {text}
    </motion.a>
  )
}

// Mobile Navigation Item Component
function MobileNavItem({ href, text }) {
  return (
    <motion.a
      href={href}
      className="block px-3 py-2 text-lg font-medium text-gray-700 rounded-md hover:text-gray-900"
      whileHover={{ backgroundColor: 'rgba(43, 108, 176, 0.1)', scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {text}
    </motion.a>
  )
}

// Navigation Button Component
function NavButton({ href, text }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.button
        className="px-4 py-2 text-sm font-medium text-white rounded-md bg-proj hover:bg-proj-hover focus:outline-none focus:ring-4 focus:ring-blue-300 active:ring-blue-500 focus:ring-opacity-50"
        whileHover={{ boxShadow: '0 0 15px rgba(43, 108, 176, 0.5)' }}
      >
        {text}
      </motion.button>
    </motion.a>
  )
}

