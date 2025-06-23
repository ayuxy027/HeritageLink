"use client"

import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Edit2, ChevronLeft, ChevronRight } from 'lucide-react'
import { BackgroundPattern } from '../components/shared/BackgroundPattern'
import confetti from 'canvas-confetti'
import toast, { Toaster } from 'react-hot-toast'

export default function Book5() {
  interface FormData {
    amenities?: string[];
  }

  const [formData, setFormData] = useState<FormData>({})
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.state?.formData) {
      setFormData(location.state.formData)
    }
  }, [location.state])

  const amenities = [
    { name: 'Tour Guide', price: 200, icon: '🧑‍🏫' },
    { name: 'Wheelchair for Elderly', price: 50, icon: '👵' },
    { name: 'Audio Guide', price: 100, icon: '🎧' },
    { name: 'Photography Permit', price: 150, icon: '📷' },
    { name: 'Locker Service', price: 75, icon: '🔒' },
    { name: 'Café Voucher', price: 100, icon: '☕' },
  ]

  const calculateTotal = () => {
    const amenitiesSelected = formData.amenities || []
    const amenitiesTotal = amenitiesSelected.reduce((total, amenity) => {
      const amenityPrice = amenities.find(a => a.name === amenity)?.price || 0
      return total + amenityPrice
    }, 0)
    return amenitiesTotal + 100
  }

  const triggerConfetti = () => {
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }))
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }))
    }, 250)
  }

  const handleSubmit = () => {
    console.log('Booking submitted:', formData)
    triggerConfetti()
    toast.success('Booking confirmed! Generating your QR code...', {
      duration: 3000,
      icon: '🎉',
    })
    setTimeout(() => {
      const bookingDetails = {
        ...formData,
        bookingId: Math.random().toString(36).substr(2, 9),
        total: calculateTotal()
      }
      navigate('/qr-code', { state: bookingDetails })
    }, 5000)
  }

  const handlePrevious = () => {
    navigate('/book-4', { state: { formData } })
  }

  const handleEdit = (step) => {
    navigate(`/book-${step}`, { state: { formData } })
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }

  return (
    <div className="flex relative justify-center items-center py-12 min-h-screen bg-gray-50 font-body">
      <BackgroundPattern />
      <Toaster position="top-center" reverseOrder={false} />
      <motion.div
        className="z-10 p-8 w-full max-w-xl bg-white rounded-2xl shadow-xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="mb-8 text-4xl font-bold text-center text-transparent bg-clip-text bg-proj"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          Review and Confirm
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
          <motion.div
            className="p-6 space-y-4 bg-gray-50 rounded-xl shadow-inner"
            variants={fadeInUp}
          >
            {Object.entries(formData).map(([key, value], index) => (
              <motion.div
                key={key}
                className="flex justify-between items-center text-sm"
                variants={fadeInUp}
              >
                <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                <span className="text-right">{Array.isArray(value) ? value.join(', ') : value.toString()}</span>
              </motion.div>
            ))}
            <motion.div
              className="flex justify-between items-center pt-4 mt-4 text-xl font-bold border-t border-gray-200"
              variants={fadeInUp}
            >
              <span>Total:</span>
              <span className="text-proj">₹{calculateTotal()} (including ₹100 booking fee)</span>
            </motion.div>
          </motion.div>
          <motion.button
            onClick={() => handleEdit(1)}
            className="px-4 py-3 w-full text-sm font-medium bg-opacity-10 rounded-xl text-proj bg-proj hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-proj"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Edit2 className="inline-block mr-2 w-4 h-4" /> Edit Booking
          </motion.button>
        </motion.div>
        <div className="flex justify-between mt-8">
          <motion.button
            onClick={handlePrevious}
            className="flex justify-center items-center px-6 py-3 text-sm font-medium bg-white rounded-full border-2 transition duration-300 text-proj border-proj hover:bg-proj hover:text-white focus:outline-none focus:ring-2 focus:ring-proj focus:ring-offset-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <ChevronLeft className="mr-2 w-5 h-5" />
            Previous
          </motion.button>
          <motion.button
            onClick={handleSubmit}
            className="flex justify-center items-center px-6 py-3 text-sm font-medium text-white rounded-full transition duration-300 bg-proj hover:bg-proj-hover focus:outline-none focus:ring-2 focus:ring-proj focus:ring-offset-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Confirm Booking
            <ChevronRight className="ml-2 w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}