"use client"

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Mail, ChevronRight, User, Phone } from 'lucide-react'
import { BackgroundPattern } from '../components/shared/BackgroundPattern'
import '../styles/shared-input.css'

export default function Book1() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    attendees: 1,
    email: '',
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (formData.attendees < 1) newErrors.attendees = 'At least one attendee is required'
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      navigate('/book-2', { state: { formData } })
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  return (
    <div className="flex relative justify-center items-center py-12 min-h-screen bg-gray-50 font-body">
      <BackgroundPattern />
      <motion.div 
        className="z-10 p-8 w-full max-w-xl bg-white rounded-2xl shadow-xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1 
          className="mb-6 text-4xl font-bold text-center text-transparent bg-clip-text bg-proj"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          Visitor Information
        </motion.h1>
        <motion.div 
          className="space-y-6"
          initial="initial"
          animate="animate"
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.div variants={fadeInUp}>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
            <div className="relative">
              <input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="input-base input-with-icon"
              />
              <User className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
            </div>
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </motion.div>
          <motion.div variants={fadeInUp}>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
            <div className="flex">
              <select className="px-3 py-3 w-24 bg-white rounded-l-md border border-gray-300 focus:outline-none focus:ring-proj focus:border-proj">
                <option value="in">🇮🇳 +91</option>
                <option value="us">🇺🇸 +1</option>
                <option value="uk">🇬🇧 +44</option>
              </select>
              <div className="relative flex-1">
                <input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="py-3 pr-4 pl-10 w-full placeholder-gray-400 text-gray-900 rounded-r-md border border-gray-300 focus:ring-proj focus:border-proj"
                />
                <Phone className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
              </div>
            </div>
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
          </motion.div>
          <motion.div variants={fadeInUp}>
            <label htmlFor="attendees" className="block mb-2 text-sm font-medium text-gray-700">Number of Attendees</label>
            <div className="relative">
              <input
                id="attendees"
                type="number"
                min={1}
                max={10}
                value={formData.attendees}
                onChange={(e) => setFormData({ ...formData, attendees: parseInt(e.target.value) })}
                className="py-3 pr-4 pl-10 w-full placeholder-gray-400 text-gray-900 rounded-md border border-gray-300 focus:ring-proj focus:border-proj"
              />
              <Users className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
            </div>
            {errors.attendees && <p className="mt-1 text-xs text-red-500">{errors.attendees}</p>}
          </motion.div>
          <motion.div variants={fadeInUp}>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email Address (Optional)</label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className="py-3 pr-4 pl-10 w-full placeholder-gray-400 text-gray-900 rounded-md border border-gray-300 focus:ring-proj focus:border-proj"
              />
              <Mail className="absolute left-3 top-1/2 w-5 h-5 text-gray-400 transform -translate-y-1/2" />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </motion.div>
        </motion.div>
        <motion.button 
          onClick={handleNext} 
          className="flex justify-center items-center px-6 py-3 mt-8 w-full text-lg font-medium text-white rounded-full transition duration-300 bg-proj hover:bg-proj-hover focus:outline-none focus:ring-2 focus:ring-proj focus:ring-offset-2"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Next
          <ChevronRight className="ml-2 w-6 h-6" />
        </motion.button>
      </motion.div>
    </div>
  )
}