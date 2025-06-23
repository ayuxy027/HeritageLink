import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BackgroundPattern } from '../components/shared/BackgroundPattern';
import { ChevronLeft, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';
import styled, { keyframes } from 'styled-components';

const shine = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const ShineButton = styled(motion.button)`
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: ${shine} 2s infinite;
  }
`;

const formatBookingDetailsForQR = (details) => {
    return `Booking Ref: #${details.bookingId || 'N/A'}
Name: ${details.name || 'N/A'}
Date: ${formatDate(details.date) || 'N/A'}
Time: ${details.timeSlot || 'N/A'}
Guests: ${details.guests || 'N/A'}
Amenities: ${details.amenities ? details.amenities.join(', ') : 'None'}
Total: ₹${details.total || 'N/A'}`;
};

const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return 'Invalid Date';

    const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);

    const day = date.getDate();
    const suffix = (day % 10 === 1 && day !== 11) ? 'st' :
        (day % 10 === 2 && day !== 12) ? 'nd' :
            (day % 10 === 3 && day !== 13) ? 'rd' : 'th';

    return formattedDate.replace(/\d+/, day + suffix);
};

const QrCodePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingDetails = location.state;
    const qrCodeRef = useRef(null);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        if (!bookingDetails) {
            navigate('/', { replace: true });
        }
    }, [bookingDetails, navigate]);

    const handleDownload = async () => {
        if (qrCodeRef.current) {
            setIsDownloading(true);
            try {
                const canvas = await html2canvas(qrCodeRef.current);
                const dataUrl = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `booking-qr-${bookingDetails.bookingId || 'ticket'}.png`;
                link.click();

                // Trigger confetti effect
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            } catch (error) {
                console.error('Error downloading QR code:', error);
                alert('Failed to download QR code. Please try again.');
            } finally {
                setIsDownloading(false);
            }
        }
    };

    if (!bookingDetails) {
        return null;
    }

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" }
    };

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
                    <div ref={qrCodeRef} className="p-4 bg-white shadow-inner rounded-xl">
                        <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={formatBookingDetailsForQR(bookingDetails)}
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                    <p className="text-lg text-center text-gray-600">
                        Scan this QR code to access your booking details.
                    </p>
                    <div className="w-full p-4 space-y-2 text-sm text-gray-600 bg-gray-100 rounded-lg">
                        <p><span className="font-medium">Booking Reference:</span> #{bookingDetails.bookingId || 'N/A'}</p>
                        <p><span className="font-medium">Name:</span> {bookingDetails.name || 'N/A'}</p>
                        <p><span className="font-medium">Date:</span> {formatDate(bookingDetails.date)}</p>
                        <p><span className="font-medium">Time Slot:</span> {bookingDetails.timeSlot || 'N/A'}</p>
                        <p><span className="font-medium">Guests:</span> {bookingDetails.guests || 'N/A'}</p>
                        <p><span className="font-medium">Amenities:</span> {bookingDetails.amenities ? bookingDetails.amenities.join(', ') : 'None'}</p>
                        <p><span className="font-medium">Total:</span> ₹{bookingDetails.total || 'N/A'}</p>
                    </div>
                </motion.div>
                <div className="flex flex-col gap-4 mt-8 sm:flex-row">
                    <motion.button
                        onClick={() => navigate('/')}
                        className="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-white transition duration-300 rounded-full bg-proj hover:bg-proj-hover focus:outline-none focus:ring-2 focus:ring-proj focus:ring-offset-2"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <ChevronLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </motion.button>
                    <ShineButton
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-white transition duration-300 bg-green-600 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <Download className="w-5 h-5 mr-2" />
                        Download QR Code
                    </ShineButton>
                </div>
            </motion.div>
        </div>
    );
};

export default QrCodePage;