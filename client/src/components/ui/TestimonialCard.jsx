import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const TestimonialCard = ({ name, role, content, image, icon, className = '' }) => {
  return (
    <div className={`bg-white p-5 sm:p-6 lg:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col group h-full ${className}`}>
      {/* Quote icon */}
      <div className="text-[#E32845] text-3xl sm:text-4xl mb-3 sm:mb-4 opacity-20 group-hover:opacity-30 transition-opacity">
        <FaQuoteLeft />
      </div>
      
      {/* Testimonial content */}
      <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 flex-1 relative pl-4 sm:pl-6">
        <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#E32845] to-[#000054] rounded-full"></span>
        {content}
      </p>
      
      {/* Author info */}
      <div className="flex items-center pt-3 sm:pt-4 border-t border-gray-100">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white shadow-md"
            loading="lazy"
          />
          {icon && (
            <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-md">
              {React.cloneElement(icon, {
                className: `${icon.props.className} text-base sm:text-lg`
              })}
            </div>
          )}
        </div>
        <div className="ml-3 sm:ml-4">
          <h4 className="font-semibold text-[#000054] text-base sm:text-lg">{name}</h4>
          <p className="text-xs sm:text-sm text-[#E32845] font-medium">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;