// src/components/PromoCode/PromoCode.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Promo code component with copy functionality
 * @param {Object} props Component props
 * @param {string} props.code The promotion code
 * @param {string} props.discount Discount information (e.g., "20%" or "100,000 VNĐ")
 * @param {string} props.expiry Expiry date information
 * @param {string} props.className Additional CSS classes
 */
const PromoCode = ({ code, discount, expiry, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopied(true);
        // Reset copied state after 2 seconds
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="bg-[#4182F9] text-white py-3 px-4 text-center">
        <p className="font-bold text-lg">Mã khuyến mãi</p>
      </div>
      
      <div className="p-4">
        {/* Discount information */}
        {discount && (
          <div className="flex justify-center mb-3">
            <span className="bg-[#4182F9]/10 text-[#4182F9] px-3 py-1 rounded-full font-medium text-sm">
              Giảm {discount}
            </span>
          </div>
        )}
        
        {/* Code display */}
        <div className="flex items-center justify-between gap-3 p-3 bg-gray-100 rounded-lg mb-3">
          <div className="font-mono font-bold text-[#152C5B] text-lg tracking-wider">
            {code}
          </div>
          <button
            onClick={handleCopy}
            className={`px-3 py-1 rounded transition-colors ${
              copied 
                ? 'bg-green-500 text-white' 
                : 'bg-[#4182F9] hover:bg-[#3671E8] text-white'
            }`}
          >
            {copied ? 'Đã sao chép' : 'Sao chép'}
          </button>
        </div>
        
        {/* Expiry information */}
        {expiry && (
          <p className="text-[#B0B0B0] text-sm text-center">
            Có hiệu lực đến: <span className="font-medium">{expiry}</span>
          </p>
        )}
      </div>
    </div>
  );
};

PromoCode.propTypes = {
  code: PropTypes.string.isRequired,
  discount: PropTypes.string,
  expiry: PropTypes.string,
  className: PropTypes.string
};

export default PromoCode;