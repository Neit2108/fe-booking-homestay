import React, { useState, useEffect } from 'react';
import { formatPrice } from '../../Utils/PriceUtils';

/**
 * Component for redirecting to card payment page with countdown
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Function to call when modal is closed
 * @param {Object} props.paymentData - Payment data from API
 * @param {number} props.amount - Payment amount
 * @param {number} props.countdown - Countdown in seconds (default: 10)
 */
const CardPaymentRedirectModal = ({ 
  isOpen, 
  onClose, 
  paymentData, 
  amount,
  countdown = 10 
}) => {
  const [timer, setTimer] = useState(countdown);

  useEffect(() => {
    // Reset timer when modal opens
    if (isOpen && paymentData) {
      setTimer(countdown);

      // Start countdown
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(intervalId);
            // Redirect when timer reaches zero
            window.location.href = paymentData.paymentUrl;
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      // Clear interval when modal closes
      return () => clearInterval(intervalId);
    }
  }, [isOpen, paymentData, countdown]);

  // Redirect manually
  const handleRedirectNow = () => {
    if (paymentData?.paymentUrl) {
      window.location.href = paymentData.paymentUrl;
    }
  };

  if (!isOpen || !paymentData) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white border rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-primary mb-2">Chuyển hướng thanh toán</h2>
          
          <p className="mb-4 text-gray-600">
            Bạn sẽ được chuyển đến trang thanh toán trong <span className="font-bold text-accent">{timer}</span> giây...
          </p>
          
          {amount && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg inline-block">
              <p className="text-gray-500 text-sm">Số tiền thanh toán</p>
              <p className="text-xl font-bold text-primary">{formatPrice(amount)} VNĐ</p>
            </div>
          )}
          
          <div className="flex space-x-3 justify-center mt-4">
            <button
              onClick={handleRedirectNow}
              className="px-4 py-2 bg-accent text-white rounded hover:bg-blue-700 transition-colors"
            >
              Thanh toán ngay
            </button>
            
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPaymentRedirectModal;