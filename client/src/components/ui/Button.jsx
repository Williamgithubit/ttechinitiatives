import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  className = ''
}) => {
  const baseClasses = 'font-medium transition-colors duration-200 focus:outline-none';
  
  const variants = {
    primary: 'bg-[#000054] text-white hover:bg-[#1a1a6e]',
    secondary: 'bg-[#E32845] text-white hover:bg-[#c41e38]',
    outline: 'bg-transparent text-[#000054] hover:bg-gray-50 border border-[#000054]',
    danger: 'bg-red-600 text-white hover:bg-red-700'
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

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;