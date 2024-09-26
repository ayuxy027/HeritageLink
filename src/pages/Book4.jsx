"use client"

import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { BackgroundPattern } from '../components/shared/BackgroundPattern'

export default function Book4() {
  const [formData, setFormData] = useState({
    visitPurpose: '',
    interests: [],
    hearAboutUs: '',
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.state?.formData) {
      setFormData(prevData => ({ ...prevData, ...location.state.formData }))
    }
  }, [location.state])

  const validateForm = () => {
    const newErrors = {}
    if (formData.interests.length === 0) newErrors.interests = 'Please select at least one interest'
    if (!formData.hearAboutUs) newErrors.hearAboutUs = 'Please let us know how you heard about us'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      navigate('/book-5', { state: { formData } })
    }
  }

  const handlePrevious = () => {
    navigate('/book-3', { state: { formData } })
  }

  const interestOptions = [
    'Art', 'History', 'Science', 'Technology', 'Nature', 'Culture'
  ]

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-50 font-body">
      <BackgroundPattern />
      <motion.div 
        className="z-10 w-full max-w-xl p-8 bg-white shadow-xl rounded-2xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1 
          className="mb-6 text-4xl font-bold text-center text-transparent bg-proj bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          Preferences
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
            <label htmlFor="visitPurpose" className="block mb-2 text-sm font-medium text-gray-700">Visiting Purpose</label>
            <select
              id="visitPurpose"
              value={formData.visitPurpose}
              onChange={(e) => setFormData({ ...formData, visitPurpose: e.target.value })}
              className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-proj focus:border-proj"
            >
              <option value="">Select purpose</option>
              <option value="leisure">Leisure</option>
              <option value="educational">Educational Tour</option>
              <option value="group">Group Tour</option>
              <option value="other">Other</option>
            </select>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <label className="block mb-2 text-sm font-medium text-gray-700">Interests</label>
            <div className="grid grid-cols-3 gap-3">
              {interestOptions.map((interest) => (
                <motion.div
                  key={interest}
                  className={`flex items-center justify-center p-3 text-sm border rounded-xl cursor-pointer ${
                    formData.interests.includes(interest)
                      ? 'border-proj bg-proj bg-opacity-10 text-proj'
                      : 'border-gray-300 hover:border-proj'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const newInterests = formData.interests.includes(interest)
                      ? formData.interests.filter(i => i !== interest)
                      : [...formData.interests, interest]
                    setFormData({ ...formData, interests: newInterests })
                  }}
                >
                  <span>{interest}</span>
                </motion.div>
              ))}
            </div>
            {errors.interests && <p className="mt-2 text-sm text-red-500">{errors.interests}</p>}
          </motion.div>
          <motion.div variants={fadeInUp}>
            <label htmlFor="hearAboutUs" className="block mb-2 text-sm font-medium text-gray-700">How did you hear about us?</label>
            <select
              id="hearAboutUs"
              value={formData.hearAboutUs}
              onChange={(e) => setFormData({ ...formData, hearAboutUs: e.target.value })}
              className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-proj focus:border-proj"
            >
              <option value="">Select an option</option>
              <option value="social_media">Social Media</option>
              <option value="friend">Friend or Family</option>
              <option value="advertisement">Advertisement</option>
              <option value="search_engine">Search Engine</option>
              <option value="other">Other</option>
            </select>
            {errors.hearAboutUs && <p className="mt-2 text-sm text-red-500">{errors.hearAboutUs}</p>}
          </motion.div>
        </motion.div>
        <div className="flex justify-between mt-8">
          <motion.button 
            onClick={handlePrevious} 
            className="flex items-center justify-center px-6 py-3 text-sm font-medium transition duration-300 bg-white border-2 rounded-full text-proj border-proj hover:bg-proj hover:text-white focus:outline-none focus:ring-2 focus:ring-proj focus:ring-offset-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </motion.button>
          <motion.button 
            onClick={handleNext} 
            className="flex items-center justify-center px-6 py-3 text-sm font-medium text-white transition duration-300 rounded-full bg-proj hover:bg-proj-hover focus:outline-none focus:ring-2 focus:ring-proj focus:ring-offset-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}