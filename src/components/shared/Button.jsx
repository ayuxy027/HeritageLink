import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Button({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md',
  icon, 
  iconPosition = 'right',
  href,
  isExternal = false,
  isDisabled = false,
  isLoading = false,
  loadingText = 'Loading...',
  ...props 
}) {
  // Button sizes
  const sizeClasses = {
    sm: "px-4 py-1 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-lg",
    xl: "px-10 py-4 text-xl"
  };
  
  // Button variants
  const variantClasses = {
    primary: "text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500",
    secondary: "text-blue-600 bg-white border-2 border-blue-600 hover:bg-blue-50 focus:ring-blue-400",
    success: "text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:ring-green-500",
    danger: "text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:ring-red-500",
    warning: "text-gray-800 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 focus:ring-yellow-500",
    info: "text-white bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 focus:ring-indigo-500",
    light: "text-gray-800 bg-gray-100 hover:bg-gray-200 focus:ring-gray-400",
    dark: "text-white bg-gray-800 hover:bg-gray-900 focus:ring-gray-600",
    link: "text-blue-600 bg-transparent hover:underline focus:ring-blue-400 px-2 py-1",
    custom: "",
  };
  
  const baseClasses = "font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const selectedSize = sizeClasses[size] || sizeClasses.md;
  const selectedVariant = variantClasses[variant] || variantClasses.primary;
  
  const disabledClasses = isDisabled ? "opacity-50 cursor-not-allowed hover:scale-100" : "";
  
  const buttonContent = (
    <span className="relative z-10 flex items-center justify-center">
      {isLoading ? (
        <>
          <svg className="w-5 h-5 mr-2 -ml-1 text-current animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {loadingText}
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
        </>
      )}
    </span>
  );
  
  // Use motion component for animations
  const MotionComponent = motion.button;
  
  // If href is provided, render as Link
  if (href) {
    if (isExternal) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses} ${selectedSize} ${selectedVariant} ${disabledClasses} ${className}`}
          whileHover={!isDisabled && { scale: 1.05 }}
          whileTap={!isDisabled && { scale: 0.95 }}
          {...props}
        >
          {buttonContent}
        </motion.a>
      );
    }
    
    return (
      <motion.div
        whileHover={!isDisabled && { scale: 1.05 }}
        whileTap={!isDisabled && { scale: 0.95 }}
      >
        <Link
          to={href}
          className={`${baseClasses} ${selectedSize} ${selectedVariant} ${disabledClasses} ${className} inline-block`}
          {...props}
        >
          {buttonContent}
        </Link>
      </motion.div>
    );
  }
  
  // Regular button
  return (
    <MotionComponent
      className={`${baseClasses} ${selectedSize} ${selectedVariant} ${disabledClasses} ${className}`}
      disabled={isDisabled || isLoading}
      whileHover={!isDisabled && !isLoading && { scale: 1.05 }}
      whileTap={!isDisabled && !isLoading && { scale: 0.95 }}
      {...props}
    >
      {buttonContent}
    </MotionComponent>
  );
}

export default Button;