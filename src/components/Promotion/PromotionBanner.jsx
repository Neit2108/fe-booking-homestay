// src/components/PromotionBanner/PromotionBanner.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Promotional banner to display on homepage or other pages
 * to attract users to the promotions page
 */
const PromotionBanner = ({ 
  title = "Khuyến mãi đặc biệt", 
  subtitle = "Giảm giá lên đến 30% cho kỳ nghỉ của bạn",
  buttonText = "Xem khuyến mãi",
  imageUrl = null,
  backgroundClass = "bg-gradient-to-r from-[#4182F9] to-[#3671E8]",
  onClose = null,
  className = ""
}) => {
  const navigate = useNavigate();

  const handleViewPromotions = () => {
    navigate('/promotion');
  };

  return (
    <div className={`relative rounded-xl overflow-hidden ${backgroundClass} ${className}`}>
      {/* Main content container */}
      <div className="flex flex-col md:flex-row items-center justify-between py-6 px-8 text-white">
        {/* Left text content */}
        <div className="flex-1 md:pr-6">
          <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
          <p className="mt-2 text-white/90">{subtitle}</p>
        </div>

        {/* Right button/CTA */}
        <div className="mt-4 md:mt-0">
          <button
            onClick={handleViewPromotions}
            className="px-6 py-2 bg-white text-[#4182F9] rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-md"
          >
            {buttonText}
          </button>
        </div>

        {/* Optional image */}
        {imageUrl && (
          <div className="absolute right-0 bottom-0 h-full max-w-[120px] overflow-hidden hidden md:block">
            <img 
              src={imageUrl} 
              alt="Promotion" 
              className="h-full object-cover object-left" 
            />
          </div>
        )}
      </div>

      {/* Close button (if provided) */}
      {onClose && (
        <button 
          className="absolute top-2 right-2 text-white/80 hover:text-white"
          onClick={onClose}
          aria-label="Close promotion banner"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

PromotionBanner.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  buttonText: PropTypes.string,
  imageUrl: PropTypes.string,
  backgroundClass: PropTypes.string,
  onClose: PropTypes.func,
  className: PropTypes.string
};

export default PromotionBanner;