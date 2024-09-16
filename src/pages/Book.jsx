import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { ChevronLeft, ChevronRight, Edit2, Info, Users, Clock } from 'lucide-react'

const timeSlots = [
  { time: '9 AM–11 AM', available: 5 },
  { time: '11 AM–1 PM', available: 3 },
  { time: '1 PM–3 PM', available: 0 },
  { time: '3 PM–5 PM', available: 7 },
  { time: '5 PM–7 PM', available: 2 },
]

const amenities = [
  { name: 'Tour Guide', price: 200, icon: '🧑‍🏫' },
  { name: 'Wheelchair for Elderly', price: 50, icon: '👵' },
  { name: 'Audio Guide', price: 100, icon: '🎧' },
  { name: 'Photography Permit', price: 150, icon: '📷' },
  { name: 'Locker Service', price: 75, icon: '🔒' },
  { name: 'Café Voucher', price: 100, icon: '☕' },
]

const interestOptions = [
  'Art', 'History', 'Science', 'Technology', 'Nature', 'Culture'
]

const initialFormData = {
  name: '',
  phone: '',
  attendees: 1,
  email: '',
  timeSlot: '',
  amenities: [],
  visitPurpose: '',
  specialRequests: '',
  preVisitEmail: false,
  ageGroup: '',
  interests: [],
  hearAboutUs: ''
}

const BackgroundPattern = () => (
  <div className="absolute inset-0 z-0 opacity-10">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100" />
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="none" stroke="#4A5568" strokeWidth="1" />
      </pattern>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
    </svg>
  </div>
)

export default function MuseumBooking() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (isSubmitted) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [isSubmitted])

  const validateStep = (currentStep) => {
    const newErrors = {}

    if (currentStep === 1) {
      if (!formData.name) newErrors.name = 'Name is required'
      if (!formData.phone) newErrors.phone = 'Phone number is required'
      if (formData.attendees < 1) newErrors.attendees = 'At least one attendee is required'
      const selectedSlot = timeSlots.find(slot => slot.time === formData.timeSlot)
      if (selectedSlot && formData.attendees > selectedSlot.available) {
        newErrors.attendees = `We don't have enough space for ${formData.attendees} attendees in this slot`
      }
    } else if (currentStep === 2) {
      if (!formData.timeSlot) newErrors.timeSlot = 'Please select a time slot'
    } else if (currentStep === 4) {
      if (!formData.ageGroup) newErrors.ageGroup = 'Please select an age group'
      if (formData.interests.length === 0) newErrors.interests = 'Please select at least one interest'
      if (!formData.hearAboutUs) newErrors.hearAboutUs = 'Please let us know how you heard about us'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    setStep(step - 1)
  }

  const handleSubmit = () => {
    if (validateStep(5)) {
      console.log('Form submitted:', formData)
      setIsSubmitted(true)
    }
  }

  const calculateTotal = () => {
    const amenitiesTotal = formData.amenities.reduce((total, amenity) => {
      const amenityPrice = amenities.find(a => a.name === amenity)?.price || 0
      return total + amenityPrice
    }, 0)
    return amenitiesTotal + 100 // Adding 100 rupees booking fee
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-12 overflow-hidden bg-gray-100 sm:px-6 lg:px-8">
      <BackgroundPattern />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-4xl"
      >
        <div className="overflow-hidden bg-white rounded-lg shadow-2xl">
          <div className="p-8 space-y-4">
            <motion.h1 
              className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-proj"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Museum Pre-Booking Form
            </motion.h1>
            <motion.p 
              className="text-center text-gray-600"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Embark on a journey through time and culture
            </motion.p>
          </div>
          <div className="p-8 space-y-8">
            <div className="relative w-full bg-gray-200 rounded-full h-2.5">
              <motion.div 
                className="absolute top-0 left-0 h-2.5 rounded-full bg-proj"
                style={{ width: `${(step / 5) * 100}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${(step / 5) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between mb-8">
              {['Visitor Info', 'Slot Booking', 'Amenities', 'Preferences', 'Review & Confirm'].map((label, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-col items-center ${step === index + 1 ? 'bg-proj text-transparent bg-clip-text' : 'text-gray-400'}`}
                  animate={{ scale: step === index + 1 ? 1.1 : 1, y: step === index + 1 ? -5 : 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className={`w-8 h-8 mb-2 rounded-full flex items-center justify-center ${step === index + 1 ? 'bg-proj text-white' : 'bg-gray-200'}`}>
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium">{label}</span>
                </motion.div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fadeInUp}
                className="min-h-[400px] space-y-6"
              >
                {step === 1 && (
                  <div className="space-y-6">
                    <motion.div variants={fadeInUp}>
                      <label htmlFor="name" className="block text-lg font-medium">Name</label>
                      <input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        className="block w-full px-4 py-3 mt-1 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <label htmlFor="phone" className="block text-lg font-medium">Phone Number</label>
                      <div className="flex mt-1">
                        <select className="block w-[180px] px-4 py-3 bg-white border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option value="in">🇮🇳 +91 (India)</option>
                          <option value="us">🇺🇸 +1 (USA)</option>
                          <option value="uk">🇬🇧 +44 (UK)</option>
                        </select>
                        <input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Enter phone number"
                          className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 shadow-sm rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <label htmlFor="attendees" className="block text-lg font-medium">Number of Attendees</label>
                      <div className="relative mt-1">
                        <input
                          id="attendees"
                          type="number"
                          min={1}
                          max={10}
                          value={formData.attendees}
                          onChange={(e) => setFormData({ ...formData, attendees: parseInt(e.target.value) })}
                          className="block w-full px-4 py-3 pr-10 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <Users className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      {errors.attendees && <p className="mt-1 text-sm text-red-500">{errors.attendees}</p>}
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <label htmlFor="email" className="block text-lg font-medium">Email Address (Optional)</label>
                      <div className="relative mt-1">
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Enter your email"
                          className="block w-full px-4 py-3 pr-10 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <Info className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <motion.div variants={fadeInUp}>
                      <label className="block text-lg font-medium">Select a Time Slot</label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        {timeSlots.map((slot, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`h-24 w-full flex flex-col items-center justify-center rounded-lg border-2 ${
                              formData.timeSlot === slot.time
                                ? 'border-blue-600 bg-proj text-white'
                                : 'border-gray-300 bg-white hover:bg-gray-50'
                            } ${slot.available === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            disabled={slot.available === 0}
                            onClick={() => setFormData({ ...formData, timeSlot: slot.time })}
                          >
                            <Clock className="w-6 h-6 mb-2" />
                            <span className="text-lg font-medium">{slot.time}</span>
                            <span className="mt-1 text-sm">{slot.available} spots left</span>
                            </motion.button>
                        ))}
                      </div>
                      {errors.timeSlot && <p className="mt-2 text-sm text-red-500">{errors.timeSlot}</p>}
                    </motion.div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <motion.div variants={fadeInUp}>
                      <label className="block text-lg font-medium">Select Additional Services & Amenities</label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        {amenities.map((amenity, index) => (
                          <motion.div
                            key={index}
                            className={`flex items-center p-4 space-x-3 bg-white border-2 rounded-lg transition-colors duration-300 ${
                              formData.amenities.includes(amenity.name)
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <input
                              type="checkbox"
                              id={`amenity-${index}`}
                              checked={formData.amenities.includes(amenity.name)}
                              onChange={(e) => {
                                const newAmenities = e.target.checked
                                  ? [...formData.amenities, amenity.name]
                                  : formData.amenities.filter(a => a !== amenity.name)
                                setFormData({ ...formData, amenities: newAmenities })
                              }}
                              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label
                              htmlFor={`amenity-${index}`}
                              className="flex-1 cursor-pointer"
                            >
                              <div className="flex items-center">
                                <span className="mr-2 text-2xl">{amenity.icon}</span>
                                <span className="font-medium">{amenity.name}</span>
                              </div>
                              <span className="block mt-1 text-sm text-gray-500">₹{amenity.price}</span>
                            </label>
                            <Info className="w-5 h-5 text-gray-400" />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                    <motion.div
                      className="mt-6 text-xl font-bold text-center text-transparent bg-proj bg-clip-text"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    >
                      Total: ₹{calculateTotal()} (including ₹100 booking fee)
                    </motion.div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <motion.div variants={fadeInUp}>
                      <label htmlFor="visitPurpose" className="block text-lg font-medium">Visiting Purpose</label>
                      <select
                        id="visitPurpose"
                        value={formData.visitPurpose}
                        onChange={(e) => setFormData({ ...formData, visitPurpose: e.target.value })}
                        className="block w-full px-4 py-3 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select purpose</option>
                        <option value="leisure">Leisure</option>
                        <option value="educational">Educational Tour</option>
                        <option value="group">Group Tour</option>
                        <option value="other">Other</option>
                      </select>
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <label className="block text-lg font-medium">Age Group</label>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        {['Under 18', '18-30', '31-50', '51-65', 'Over 65'].map((age) => (
                          <motion.div
                            key={age}
                            className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer ${
                              formData.ageGroup === age
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-300 hover:border-blue-300'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFormData({ ...formData, ageGroup: age })}
                          >
                            <span className="text-sm font-medium">{age}</span>
                          </motion.div>
                        ))}
                      </div>
                      {errors.ageGroup && <p className="mt-1 text-sm text-red-500">{errors.ageGroup}</p>}
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <label className="block text-lg font-medium">Interests</label>
                      <div className="grid grid-cols-3 gap-3 mt-2">
                        {interestOptions.map((interest) => (
                          <motion.div
                            key={interest}
                            className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer ${
                              formData.interests.includes(interest)
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-300 hover:border-blue-300'
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
                            <span className="text-sm font-medium">{interest}</span>
                          </motion.div>
                        ))}
                      </div>
                      {errors.interests && <p className="mt-1 text-sm text-red-500">{errors.interests}</p>}
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <label htmlFor="hearAboutUs" className="block text-lg font-medium">How did you hear about us?</label>
                      <select
                        id="hearAboutUs"
                        value={formData.hearAboutUs}
                        onChange={(e) => setFormData({ ...formData, hearAboutUs: e.target.value })}
                        className="block w-full px-4 py-3 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select an option</option>
                        <option value="social_media">Social Media</option>
                        <option value="friend">Friend or Family</option>
                        <option value="advertisement">Advertisement</option>
                        <option value="search_engine">Search Engine</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.hearAboutUs && <p className="mt-1 text-sm text-red-500">{errors.hearAboutUs}</p>}
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                      <label htmlFor="specialRequests" className="block text-lg font-medium">Special Requests/Accessibility Needs</label>
                      <textarea
                        id="specialRequests"
                        rows={3}
                        placeholder="Enter any special requests or accessibility needs"
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                        className="block w-full px-4 py-3 mt-1 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </motion.div>
                    <motion.div variants={fadeInUp} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="preVisitEmail"
                        checked={formData.preVisitEmail}
                        onChange={(e) => setFormData({ ...formData, preVisitEmail: e.target.checked })}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="preVisitEmail"
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        Receive pre-visit email with tips and suggestions
                      </label>
                    </motion.div>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-6">
                    <motion.h3 
                      className="text-2xl font-semibold text-center text-transparent bg-proj bg-clip-text"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      Booking Summary
                    </motion.h3>
                    <motion.div 
                      className="p-6 space-y-4 rounded-lg shadow-inner bg-gray-50"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {Object.entries(formData).map(([key, value], index) => (
                        <motion.div
                          key={key}
                          className="flex items-center justify-between"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <span className="text-right">{Array.isArray(value) ? value.join(', ') : value.toString()}</span>
                        </motion.div>
                      ))}
                      <motion.div
                        className="flex items-center justify-between pt-4 mt-4 text-lg font-bold border-t border-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                      >
                        <span>Total:</span>
                        <span className="text-blue-600">₹{calculateTotal()} (including ₹100 booking fee)</span>
                      </motion.div>
                    </motion.div>
                    <motion.button
                      onClick={() => setStep(1)}
                      className="w-full px-4 py-3 text-sm font-medium text-blue-600 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Edit2 className="inline-block w-4 h-4 mr-2" /> Edit Booking
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-between px-8 py-4 bg-gray-50">
            {step > 1 && (
              <motion.button
                onClick={handlePrevious}
                className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="inline-block w-4 h-4 mr-2" /> Previous
              </motion.button>
            )}
            {step < 5 ? (
              <motion.button
                onClick={handleNext}
                className={`${step === 1 ? "ml-auto" : ""} px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-proj hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next <ChevronRight className="inline-block w-4 h-4 ml-2" />
              </motion.button>
            ) : (
              <motion.button
                onClick={handleSubmit}
                className="px-6 py-3 ml-auto text-sm font-medium text-white border border-transparent rounded-md bg-proj hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Confirm Pre-booking
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-sm text-center text-gray-600"
      >
        <p>Your data is securely handled in accordance with our privacy policy.</p>
      </motion.div>
      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed p-4 text-white bg-green-500 rounded-lg shadow-lg bottom-4 right-4"
        >
          Booking confirmed! Thank you for choosing our museum.
        </motion.div>
      )}
    </div>
  )
}