import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  as = 'button',
  to = '',
  ...props
}) => {
  const baseClasses = 'font-medium transition-colors duration-200 focus:outline-none inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-[#000054] text-white hover:bg-[#E32845]',
    secondary: 'bg-[#E32845] text-white hover:bg-[#c41e38]',
    outline: 'bg-transparent text-[#000054] hover:bg-gray-50 border border-[#000054]',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    custom: 'bg-white text-[#000054] hover:bg-gray-50 border border-[#000054]'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  if (as === 'link') {
    return (
      <Link
        to={to}
        className={classes}
        onClick={onClick}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;