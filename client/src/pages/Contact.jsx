import React, { useState } from 'react';
import Card from '../components/ui/Card';
import FormInput from '../components/ui/FormInput';
import Button from '../components/ui/Button';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { HiMail, HiPhone } from 'react-icons/hi';
import { IoMdTime } from 'react-icons/io';
import { BsGlobe } from 'react-icons/bs';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // In a real app, this would make an API call
    alert('Form submitted successfully! We will contact you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or want to get involved? Reach out to us—we'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div className="space-y-6">
              {[
                { 
                  title: 'Address', 
                  content: 'TTI Central Office\nMonrovia, Liberia',
                  icon: <FaMapMarkerAlt className="text-2xl text-[#E32845] mt-1 flex-shrink-0" />
                },
                { 
                  title: 'Email', 
                  content: 'info@ttechinitiatives.org',
                  icon: <HiMail className="text-2xl text-[#E32845] mt-1 flex-shrink-0" />
                },
                { 
                  title: 'Phone', 
                  content: '+231 XXX XXXX',
                  icon: <HiPhone className="text-2xl text-[#E32845] mt-1 flex-shrink-0" />
                }
              ].map((contact, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    {contact.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-[#000054]">{contact.title}</h3>
                    <p className="text-gray-600 whitespace-pre-line mt-1">{contact.content}</p>
                  </div>
                </div>
              ))}
              
              <div className="flex items-start mt-2">
                <div className="flex-shrink-0">
                  <BsGlobe className="text-2xl text-[#E32845] mt-1" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-[#000054]">Connect With Us</h3>
                  <div className="flex space-x-4 mt-2">
                    <a href="#" className="text-[#000054] hover:text-[#E32845] transition-colors duration-200">
                      <FaFacebook className="text-2xl" />
                    </a>
                    <a href="#" className="text-[#000054] hover:text-[#E32845] transition-colors duration-200">
                      <FaTwitter className="text-2xl" />
                    </a>
                    <a href="#" className="text-[#000054] hover:text-[#E32845] transition-colors duration-200">
                      <FaLinkedin className="text-2xl" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-[#000054] text-white rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <IoMdTime className="text-2xl text-[#E32845] mr-2" />
                <h3 className="text-xl font-semibold">Office Hours</h3>
              </div>
              <div className="space-y-2 text-gray-200">
                <p className="flex items-center">
                  <span className="inline-block w-32">Monday - Friday:</span>
                  <span>8:00 AM - 5:00 PM</span>
                </p>
                <p className="flex items-center">
                  <span className="inline-block w-32">Saturday:</span>
                  <span>9:00 AM - 1:00 PM</span>
                </p>
                <p className="flex items-center">
                  <span className="inline-block w-32">Sunday:</span>
                  <span>Closed</span>
                </p>
              </div>
            </div>
          </div>

          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput
                  label="Full Name"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                />
                
                <FormInput
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none`}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="volunteer">Volunteer Opportunity</option>
                    <option value="partnership">Partnership Proposal</option>
                    <option value="donation">Donation Information</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none`}
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>
                
                <Button type="submit" fullWidth size="lg">
                  Send Message
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;