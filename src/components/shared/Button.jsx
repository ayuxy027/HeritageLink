import React from 'react';

function Button({ children, className, variant = 'primary', icon, ...props }) {
  const baseClasses = "px-6 py-2 text-base font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = variant === 'primary'
    ? "text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500"
    : "text-blue-600 bg-white border-2 border-blue-600 hover:bg-blue-50 focus:ring-blue-400";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center">
        {children}
        {icon && <span className="ml-2">{icon}</span>}
      </span>
    </button>
  );
}

export default Button;