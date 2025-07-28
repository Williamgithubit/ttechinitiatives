import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.userId.trim() || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      // Here you would typically make an API call to your backend
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // On successful login, you might want to:
      // 1. Save the authentication token
      // 2. Update the auth context
      // 3. Redirect to the dashboard or home page
      navigate('/');
      
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#e6e9ff] p-4">
      <motion.div 
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#000054] to-[#1a1a6e] p-6 text-center">
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-blue-100 mt-1">Sign in to access your account</p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          {/* User ID Field */}
          <div className="mb-6">
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
              User ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#000054] focus:ring focus:ring-[#000054]/20 p-2.5 text-sm"
                placeholder="Enter your user ID"
                autoComplete="username"
                required
              />
            </div>
          </div>
          
          {/* Password Field */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs text-[#000054] hover:text-[#E32845] transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#000054] focus:ring focus:ring-[#000054]/20 p-2.5 text-sm"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>
          </div>
          
          {/* Remember Me & Submit */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#000054] focus:ring-[#000054] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#000054] hover:bg-[#E32845] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000054] transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              'Signing in...'
            ) : (
              <>
                Sign In
                <FaArrowRight className="ml-2" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;