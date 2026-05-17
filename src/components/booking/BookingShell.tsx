import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BackgroundPattern } from '../shared/BackgroundPattern';
import type { ReactNode } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const bookingContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// eslint-disable-next-line react-refresh/only-export-components
export const bookingItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

interface BookingShellProps {
  title: string;
  children: ReactNode;
  onNext: () => void;
  onPrev?: () => void;
  nextLabel?: string;
  disableNext?: boolean;
}

export function BookingShell({
  title,
  children,
  onNext,
  onPrev,
  nextLabel = 'Next',
  disableNext = false,
}: BookingShellProps) {
  return (
    <div className="relative flex items-center justify-center min-h-screen py-12 bg-gray-50 font-body">
      <BackgroundPattern />
      <motion.div
        className="z-10 w-full max-w-xl p-8 bg-white shadow-xl rounded-2xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.h1
          className="mb-6 text-4xl font-bold text-center text-transparent bg-clip-text bg-proj"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
        >
          {title}
        </motion.h1>
        <motion.div
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={bookingContainerVariants}
        >
          {children}
        </motion.div>
        <div className="flex justify-between mt-8">
          {onPrev && (
            <motion.button
              type="button"
              onClick={onPrev}
              className="flex items-center justify-center px-6 py-3 text-sm font-medium transition duration-300 bg-white border-2 rounded-full text-proj border-proj hover:bg-proj hover:text-white focus:outline-none focus:ring-2 focus:ring-proj focus:ring-offset-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <ChevronLeft className="w-5 h-5 mr-2" aria-hidden="true" />
              Previous
            </motion.button>
          )}
          <motion.button
            type="button"
            onClick={onNext}
            disabled={disableNext}
            className={`flex items-center justify-center px-6 py-3 text-sm font-medium text-white transition duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-proj focus:ring-offset-2 ${
              onPrev ? '' : 'ml-auto'
            } ${disableNext ? 'bg-gray-400 cursor-not-allowed' : 'bg-proj hover:bg-proj-hover'}`}
            whileHover={!disableNext ? { scale: 1.03 } : undefined}
            whileTap={!disableNext ? { scale: 0.97 } : undefined}
          >
            {nextLabel}
            <ChevronRight className="w-5 h-5 ml-2" aria-hidden="true" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
