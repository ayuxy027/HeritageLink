import React, { useEffect } from "react"
import QRCode from "react-qr-code"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { BackgroundPattern } from '../components/shared/BackgroundPattern'
import { ChevronLeft } from 'lucide-react'

const QrCodePage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const bookingDetails = location.state

  useEffect(() => {
    if (!bookingDetails) {
      navigate('/', { replace: true })
    }
  }, [bookingDetails, navigate])

  if (!bookingDetails) {
    return null
  }

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
          Your Booking QR Code
        </motion.h1>
        <motion.div 
          className="flex flex-col items-center justify-center space-y-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="p-4 bg-white shadow-inner rounded-xl">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={JSON.stringify(bookingDetails)}
              viewBox={`0 0 256 256`}
            />
          </div>
          <p className="text-lg text-center text-gray-600">
            Scan this QR code to access your booking details.
          </p>
          <div className="w-full p-4 space-y-2 text-sm text-gray-600 bg-gray-100 rounded-lg">
            <p><span className="font-medium">Booking Reference:</span> #{bookingDetails.bookingId || 'N/A'}</p>
            <p><span className="font-medium">Name:</span> {bookingDetails.name}</p>
            <p><span className="font-medium">Date:</span> {bookingDetails.date}</p>
            <p><span className="font-medium">Time Slot:</span> {bookingDetails.timeSlot}</p>
            <p><span className="font-medium">Guests:</span> {bookingDetails.guests}</p>
            <p><span className="font-medium">Amenities:</span> {bookingDetails.amenities ? bookingDetails.amenities.join(', ') : 'None'}</p>
            <p><span className="font-medium">Total:</span> ₹{bookingDetails.total}</p>
          </div>
        </motion.div>
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center justify-center w-full px-6 py-3 mt-8 text-sm font-medium text-white transition duration-300 rounded-full bg-proj hover:bg-proj-hover focus:outline-none focus:ring-2 focus:ring-proj focus:ring-offset-2"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Home
        </motion.button>
      </motion.div>
    </div>
  )
}

export default QrCodePage