import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#E32845] ${className}`}>
      {children}
    </div>
  );
};

export default Card;