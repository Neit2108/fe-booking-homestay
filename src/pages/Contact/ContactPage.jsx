import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaTwitter, FaInstagram, FaFacebook, FaPlus } from 'react-icons/fa';
import Navbar from "../../components/Navbar/Navbar";
import Input from '../../components/Input/Input';
import axios from 'axios';

const FormInput = ({ label, id, name, type = 'text', value, placeholder, required = false, onChange }) => (
  <div className="flex-1">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-3 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
      placeholder={placeholder}
    />
  </div>
);

const ContactPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    customSubject: '',
    message: ''
  });
  
  // Loading and response states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResponse, setSubmitResponse] = useState({
    success: false,
    message: '',
    visible: false
  });
  const [showCustomSubject, setShowCustomSubject] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle radio button selection
  const handleSubjectChange = (subject) => {
    if (subject === 'custom') {
      setShowCustomSubject(true);
      setFormData(prevData => ({
        ...prevData,
        subject: 'custom'
      }));
    } else {
      setShowCustomSubject(false);
      setFormData(prevData => ({
        ...prevData,
        subject,
        customSubject: ''
      }));
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResponse({ success: false, message: '', visible: false });
    
    try {
      // Format data according to your ContactRequest model
      const contactRequest = {
        SenderName: `${formData.firstName} ${formData.lastName}`,
        SenderEmail: formData.email,
        SenderPhone: formData.phone,
        Title: formData.subject === 'custom' ? formData.customSubject : formData.subject,
        Message: formData.message
      };
      
      // Make API call with axios
      const response = await axios.post('https://localhost:7284/contacts/add-contact', contactRequest);
      
      // Handle successful response
      setSubmitResponse({
        success: true,
        message: 'Your message has been sent successfully!',
        visible: true
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        customSubject: '',
        message: ''
      });
      setShowCustomSubject(false);
    } catch (error) {
      // Handle error
      setSubmitResponse({
        success: false,
        message: error.response?.data?.message || 'Failed to send message. Please try again later.',
        visible: true
      });
    } finally {
      setIsSubmitting(false);
      
      // Hide response message after 5 seconds
      setTimeout(() => {
        setSubmitResponse(prev => ({ ...prev, visible: false }));
      }, 5000);
    }
  };

  // Subjects for radio buttons
  const subjects = ['Hỗ trợ đặt phòng', 'Thanh toán', 'Nơi ở', 'Đi lại'];

  // Reusable Components
  const SocialButton = ({ icon, href = "#" }) => (
    <a 
      href={href} 
      className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center transition-colors hover:bg-blue-600"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );

  const ContactInfoItem = ({ icon, text }) => (
    <div className="flex items-center mb-6">
      <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center mr-4">
        {icon}
      </div>
      <span className="text-sm md:text-base">{text}</span>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Insert your Navbar component */}
      <Navbar />
      
      {/* Main Content - With top padding for navbar */}
      <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-4rem)]">
        {/* Left Panel - Contact Information */}
        <div className="w-full md:w-1/3 bg-blue-900 text-white p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute right-0 bottom-0 w-64 h-64 rounded-full bg-blue-800 opacity-20 transform translate-x-1/3 translate-y-1/3"></div>
          <div className="absolute right-10 top-40 w-32 h-32 rounded-full bg-blue-700 opacity-20"></div>
          <div className="absolute left-10 top-10 w-20 h-20 rounded-full bg-blue-700 opacity-10"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4">Thông tin liên hệ</h2>
            <p className="text-blue-200 mb-8">Trò chuyện trực tiếp với chúng tôi!</p>
            
            <div>
              <ContactInfoItem 
                icon={<FaPhone className="text-blue-300" />} 
                text="0934765123" 
              />
              
              <ContactInfoItem 
                icon={<FaEnvelope className="text-blue-300" />} 
                text="homiesstay@gmail.com" 
              />
              
              <ContactInfoItem 
                icon={<FaMapMarkerAlt className="text-blue-300" />} 
                text="235 Hoàng Quốc Việt" 
              />
            </div>
          </div>
          
          {/* Social Media Links */}
          <div className="flex mt-10 space-x-4 relative z-10">
            <SocialButton icon={<FaTwitter className="text-white" />} href='https://x.com/'/>
            <SocialButton icon={<FaInstagram className="text-white" />} href='https://www.instagram.com/' />
            <SocialButton icon={<FaFacebook className="text-white" />} href='https://www.facebook.com/' />
          </div>
        </div>
        
        {/* Right Panel - Contact Form */}
        <div className="w-full md:w-2/3 p-8 bg-white shadow-inner">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            {/* Response Message */}
            {submitResponse.visible && (
              <div className={`mb-6 p-4 rounded-lg shadow-sm ${
                submitResponse.success 
                  ? 'bg-green-50 text-green-800 border-l-4 border-green-500' 
                  : 'bg-red-50 text-red-800 border-l-4 border-red-500'
              }`}>
                {submitResponse.message}
              </div>
            )}
            
            {/* Name Fields */}
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <FormInput
                label="Tên"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="A"
                required
              />
              
              
              <FormInput
                label="Họ và tên đệm"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Nguyễn Văn"
                required
              />

            </div>
            
            {/* Email and Phone */}
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <FormInput
                label="Email"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
              />
              
              <FormInput
                label="Số điện thoại"
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="012 3456 789"
              />
            </div>
            
            {/* Subject Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiêu đề
              </label>
              
              <div className="flex flex-wrap gap-3">
                {subjects.map((subject) => (
                  <label key={subject} className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="subject"
                      checked={formData.subject === subject}
                      onChange={() => handleSubjectChange(subject)}
                      className="sr-only"
                    />
                    <span className={`px-4 py-2 text-sm rounded-full transition-colors ${
                      formData.subject === subject 
                        ? 'bg-blue-900 text-white' 
                        : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                    }`}>
                      {subject}
                    </span>
                  </label>
                ))}
                
                {/* Custom Subject Option */}
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="subject"
                    checked={formData.subject === 'custom'}
                    onChange={() => handleSubjectChange('custom')}
                    className="sr-only"
                  />
                  <span className={`px-4 py-2 text-sm rounded-full transition-colors flex items-center ${
                    formData.subject === 'custom' 
                      ? 'bg-blue-900 text-white' 
                      : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                  }`}>
                    <FaPlus className="mr-1" /> Tùy chọn
                  </span>
                </label>
              </div>
              
              {/* Custom Subject Input - Only shown when custom subject is selected */}
              {showCustomSubject && (
                <div className="mt-3">
                  <input
                    type="text"
                    name="customSubject"
                    value={formData.customSubject}
                    onChange={handleChange}
                    placeholder="Vui lòng nhập tiêu đề"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required={formData.subject === 'custom'}
                  />
                </div>
              )}
            </div>
            
            {/* Message */}
            <div className="mb-8">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Tin nhắn
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Vui lòng nhập tin nhắn"
              ></textarea>
            </div>
            
            {/* Submit Button */}
            <div className="text-right">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-900 text-white px-8 py-3 rounded-md shadow-md hover:bg-blue-800 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-70 transform hover:-translate-y-1"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Vui lòng chờ...
                  </span>
                ) : 'Gửi tin nhắn'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;