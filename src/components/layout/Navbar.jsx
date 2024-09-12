'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: 'Explore', link: '/explore' },
  { name: 'Events', link: '/events' },
  { name: 'Collections', link: '/collections' },
  { name: 'About', link: '/about' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 font-body transition-colors duration-300 ease-in-out ${
        isScrolled ? 'bg-blue-900/90 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <motion.a
              href="/"
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.h1 
                className="text-xl font-bold text-white sm:text-2xl lg:text-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                HeritageLink
              </motion.h1>
            </motion.a>
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            {navItems.map((item, index) => (
              <NavItem key={item.name} href={item.link} text={item.name} index={index} />
            ))}
          </div>

          {/* Login, Book Now buttons and Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <NavButton href="/login" text="Login" />
            <NavButton href="/book" text="Book Now" variant="primary" />
            <motion.button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 ml-4 text-white rounded-md sm:hidden hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
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
      <motion.div
        className={`sm:hidden overflow-hidden ${isScrolled ? 'bg-blue-900/90 backdrop-blur-sm' : 'bg-transparent'}`}
        initial={{ height: 0 }}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <MobileNavItem key={item.name} href={item.link} text={item.name} />
          ))}
        </div>
      </motion.div>
    </motion.nav>
  )
}

function NavItem({ href, text, index }) {
  return (
    <motion.a
      href={href}
      className="px-3 py-2 text-base font-medium text-white rounded-md hover:text-yellow-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
    >
      {text}
    </motion.a>
  )
}

function MobileNavItem({ href, text }) {
  return (
    <motion.a
      href={href}
      className="block px-3 py-2 text-base font-medium text-white rounded-md hover:text-yellow-300"
      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {text}
    </motion.a>
  )
}

function NavButton({ href, text, variant = "secondary" }) {
  const baseClasses = "px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
  const variantClasses = variant === "primary"
    ? "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900"
    : "bg-white/10 hover:bg-white/20 text-white"

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.button
        className={`${baseClasses} ${variantClasses}`}
        whileHover={{ boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}
      >
        {text}
      </motion.button>
    </motion.a>
  )
}