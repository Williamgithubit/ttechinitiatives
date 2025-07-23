import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import logo from "../assets/TTI-Logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Events', path: '/events' },
    { name: 'Volunteer', path: '/volunteer' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-gradient-to-r from-[#000054] to-[#1a1a6e] fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="T-Tech Initiatives Logo" className="h-10 w-auto" />
          </Link>
          
          <nav className="hidden md:block flex-grow">
            <div className="flex justify-center items-center space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-[#E32845] hover:bg-gray-50 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
          
          <div className="hidden md:block">
            <Link 
              to="/login"
              className="inline-block bg-[#000054] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#E32845] cursor-pointer transition-colors duration-200"
            >
              <div className="flex items-center justify-center">
                <FiLogIn className="mr-2" />
                Login
              </div>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#E32845] bg-gray-50"
            >
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#E32845] hover:bg-gray-50"
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-2">
              <Link 
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full bg-[#000054] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#E32845] text-center"
              >
                <div className="flex items-center justify-center">
                  <FiLogIn className="mr-2" />
                  Login
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;