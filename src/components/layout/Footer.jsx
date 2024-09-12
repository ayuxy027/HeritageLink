'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

const socialIcons = [
  { Icon: FaFacebookF, href: '#', label: 'Facebook' },
  { Icon: FaTwitter, href: '#', label: 'Twitter' },
  { Icon: FaInstagram, href: '#', label: 'Instagram' },
  { Icon: FaYoutube, href: '#', label: 'YouTube' },
]

const footerLinks = [
  {
    title: 'HeritageLink',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Our Mission', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Virtual Tours', href: '#' },
      { label: 'Exhibitions', href: '#' },
      { label: 'Collections', href: '#' },
      { label: 'Educational Resources', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Donate', href: '#' },
      { label: 'Membership', href: '#' },
      { label: 'Volunteer', href: '#' },
      { label: 'Corporate Partnerships', href: '#' },
    ],
  },
]

const Meteor = ({ size, duration, delay }) => (
  <motion.div
    className={`absolute bg-white rounded-full shadow-lg`}
    style={{
      width: size,
      height: size,
      boxShadow: `0 0 ${size * 2}px ${size / 2}px rgba(255,255,255,0.5)`,
    }}
    initial={{ top: '-5%', left: '105%' }}
    animate={{
      top: '105%',
      left: '-5%',
      transition: { duration, delay, repeat: Infinity, repeatDelay: 3 },
    }}
  />
)

const Star = ({ top, left, size }) => (
  <div
    className="absolute bg-white rounded-full animate-twinkle"
    style={{
      top: `${top}%`,
      left: `${left}%`,
      width: size,
      height: size,
    }}
  />
)

const FooterLink = ({ href, children }) => (
  <motion.a
    href={href}
    className="inline-block text-lg transition-colors duration-300 hover:text-blue-300"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.a>
)

export default function Footer() {
  return (
    <footer className="relative py-16 overflow-hidden text-white bg-proj">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <Star key={i} top={Math.random() * 100} left={Math.random() * 100} size={Math.random() * 2 + 1} />
        ))}
      </div>
      <Meteor size={2} duration={2} delay={0} />
      <Meteor size={1} duration={1.5} delay={1} />
      <Meteor size={3} duration={2.5} delay={2} />
      <div className="container relative z-10 px-4 mx-auto">
        <div className="grid gap-12 mb-16 md:grid-cols-2 lg:grid-cols-4">
          {footerLinks.map((column, index) => (
            <div key={index} className="space-y-6">
              <h3 className="text-2xl font-bold">{column.title}</h3>
              <ul className="space-y-4">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Connect</h3>
            <div className="flex flex-wrap gap-4">
              {socialIcons.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  className="p-3 text-2xl transition-colors duration-300 rounded-full hover:bg-white hover:text-blue-600"
                  aria-label={label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        <motion.div
          className="pt-8 text-center border-t border-blue-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-lg">&copy; 2024 HeritageLink. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}