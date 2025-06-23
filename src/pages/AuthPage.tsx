import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Mail, Lock, Eye, EyeOff, User, Compass, Camera, Ticket, Book, Globe, CalendarDays, Clock, Mouse, Headphones, Coffee, Palette, Microscope, Briefcase, Lightbulb, Glasses, Feather, Leaf, Star } from "lucide-react"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <section className="relative py-8 overflow-hidden sm:py-12 lg:py-2 bg-proj font-body">
      <BackgroundAnimation />
      <div className="relative flex flex-col items-center px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:flex-row">
        <motion.div
          className="w-full lg:w-1/2 lg:pr-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl font-bold leading-tight text-center text-white sm:text-5xl sm:leading-tight lg:leading-tight lg:text-6xl lg:text-left"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {isSignUp ? "Begin Your Exploration" : "Welcome Back, Explorer"}
          </motion.h1>
          <motion.p
            className="mt-4 text-xl text-center text-blue-100 sm:mt-6 lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover the world's most precious historical sites with HeritageLink.
            {isSignUp ? " Sign up now to start your adventure!" : " Sign in to continue your journey."}
          </motion.p>
          <motion.form
            className="mt-8 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {isSignUp && (
              <InputField
                id="name"
                type="text"
                label="Full Name"
                icon={<User className="text-blue-300" size={20} />}
              />
            )}
            <InputField
              id="email"
              type="email"
              label="Email Address"
              icon={<Mail className="text-blue-300" size={20} />}
            />
            <InputField
              id="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              icon={<Lock className="text-blue-300" size={20} />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 transition-colors hover:text-blue-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              }
            />
            <Button>
              {isSignUp ? "Start Your Adventure" : "Continue Your Journey"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.form>
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300/30" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-200 bg-proj">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <SocialButton icon="google" />
              <SocialButton icon="facebook" />
            </div>
          </motion.div>
          <motion.p
            className="mt-8 text-sm text-center text-gray-300 lg:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {isSignUp ? "Already an explorer?" : "New to HeritageLink?"}{" "}
            <button onClick={() => setIsSignUp(!isSignUp)} className="font-medium text-blue-300 transition-colors hover:text-blue-200">
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </motion.p>
        </motion.div>
        <AnimatePresence>
          {typeof window !== 'undefined' && window.innerWidth >= 1024 && (
            <motion.div
              key="animations"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:w-1/2 h-[500px] mt-1 lg:mt-0 relative"
            >
              <FloatingIcon Icon={Ticket} size={120} top="10%" left="50%" scale={[1, 1.1, 1]} rotate={[0, 5, -5, 0]} />
              <FloatingIcon Icon={CalendarDays} size={64} top="25%" left="25%" y={[0, -20, 0]} />
              <FloatingIcon Icon={Clock} size={64} top="75%" left="75%" y={[0, 20, 0]} />
              <FloatingIcon Icon={Mouse} size={48} top="66%" left="33%" x={[0, 30, 0]} y={[0, -30, 0]} />
              <FloatingIcon Icon={Globe} size={56} top="16%" left="75%" rotate={[0, 360]} duration={10} />
              <FloatingIcon Icon={Camera} size={52} top="83%" left="25%" scale={[1, 1.2, 1]} />
              <FloatingIcon Icon={Book} size={52} top="60%" left="10%" y={[0, 25, 0]} duration={3.5} />
              <FloatingIcon Icon={Compass} size={44} top="5%" left="60%" rotate={[0, 360]} duration={8} />
              <FloatingIcon Icon={Briefcase} size={48} top="85%" left="45%" scale={[1, 1.1, 1]} duration={3} />
              <FloatingIcon Icon={Lightbulb} size={40} top="20%" left="5%" y={[0, -15, 0]} duration={2.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <ParticleBackground />
    </section>
  )
}

interface InputFieldProps {
  id: string;
  type: string;
  label: string;
  icon: React.ReactNode;
  rightIcon?: React.ReactNode;
}

function InputField({ id, type, label, icon, rightIcon }: InputFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-200">
        {label}
      </label>
      <div className="relative rounded-lg shadow-sm">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {icon}
        </div>
        <input
          id={id}
          name={id}
          type={type}
          required
          className="block w-full py-3 pl-10 pr-10 text-white placeholder-gray-400 transition-colors border-gray-300 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  )
}

interface ButtonProps {
  children: React.ReactNode;
}

function Button({ children }: ButtonProps) {
  return (
    <motion.button
      className="flex items-center justify-center w-full px-6 py-3 text-base font-medium text-blue-900 transition-all duration-300 ease-in-out rounded-md bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

interface SocialButtonProps {
  icon: 'google' | 'facebook';
}

function SocialButton({ icon }: SocialButtonProps) {
  const iconPath = icon === 'google'
    ? "M20.64 12.2c0-.63-.06-1.25-.16-1.84H12v3.49h4.84c-.22 1.13-.86 2.08-1.83 2.72v2.26h2.96c1.73-1.59 2.72-3.93 2.72-6.63z M12 21c2.47 0 4.55-.82 6.06-2.22l-2.96-2.26c-.83.56-1.89.88-3.1.88-2.39 0-4.41-1.61-5.13-3.77H3.77v2.34C5.25 18.85 8.39 21 12 21z M6.87 13.63c-.19-.55-.3-1.14-.3-1.75s.11-1.2.3-1.75V7.79H3.77C3.29 9.07 3 10.5 3 12s.29 2.93.77 4.21l3.1-2.58z M12 6.38c1.35 0 2.56.46 3.51 1.37l2.62-2.62C16.65 3.67 14.47 3 12 3 8.39 3 5.25 5.15 3.77 8.15l3.1 2.58c.72-2.16 2.74-3.77 5.13-3.77z"
    : "M20.89 2H3.11A1.11 1.11 0 002 3.11v17.78A1.11 1.11 0 003.11 22h9.67v-7.73h-2.63v-3.04h2.63V9.08c0-2.61 1.59-4.03 3.92-4.03 1.11 0 2.07.08 2.35.12v2.72h-1.61c-1.26 0-1.51.6-1.51 1.48v1.94h3.02l-.39 3.04h-2.63V22h5.16A1.11 1.11 0 0022 20.89V3.11A1.11 1.11 0 0020.89 2z"

  return (
    <motion.button
      className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 ease-in-out bg-white rounded-md shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
        <path d={iconPath} />
      </svg>
      {icon === 'google' ? 'Google' : 'Facebook'}
    </motion.button>
  )
}

function FloatingIcon({ Icon, size, top, left, ...motionProps }) {
  return (
    <motion.div
      className="absolute text-white opacity-70"
      style={{ top, left }}
      animate={{
        y: [0, -10, 0],
        ...motionProps.animate
      }}
      transition={{
        duration: 5,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        repeat: Infinity,
        ...motionProps.transition
      }}
    >
      <Icon size={size} />
    </motion.div>
  )
}

function BackgroundAnimation() {
  return (
    <motion.div
      className="absolute inset-0 opacity-20"
      animate={{
        background: [
          "radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(200,200,255,0.3) 100%)",
          "radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,200,200,0.3) 100%)",
          "radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(200,255,200,0.3) 100%)",
        ],
      }}
      transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
    />
  )
}

function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full opacity-20"
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}