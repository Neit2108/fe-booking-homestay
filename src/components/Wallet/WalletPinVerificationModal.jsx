import React, { useState, useEffect } from 'react';

/**
 * Component for PIN verification when paying with wallet
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Function to call when modal is closed
 * @param {Function} props.onSubmit - Function to call when PIN is submitted
 * @param {number} props.amount - Payment amount
 * @param {boolean} props.loading - Loading state
 * @param {string} props.error - Error message
 */
const WalletPinVerificationModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  amount, 
  loading = false,
  error = '' 
}) => {
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');

  // Reset PIN when modal opens
  useEffect(() => {
    if (isOpen) {
      setPin('');
      setPinError('');
    }
  }, [isOpen]);

  // Handle PIN input change
  const handlePinChange = (e) => {
    const value = e.target.value;
    // Only allow numeric input with max length 6
    if (/^\d*$/.test(value) && value.length <= 6) {
      setPin(value);
      setPinError('');
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate PIN
    if (pin.length !== 6) {
      setPinError('Mã PIN phải có đủ 6 chữ số');
      return;
    }
    
    // Submit PIN
    onSubmit(pin);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-xl font-semibold text-primary mb-4 text-center">
          Xác nhận thanh toán
        </h2>
        
        <div className="text-center mb-6">
          <div className="text-gray-600 mb-2">Thanh toán từ ví</div>
          <div className="text-2xl font-bold text-primary">{amount?.toLocaleString()} VNĐ</div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
              Nhập mã PIN (6 chữ số)
            </label>
            <input
              type="password"
              id="pin"
              value={pin}
              onChange={handlePinChange}
              placeholder="Nhập mã PIN 6 chữ số"
              className={`w-full px-4 py-3 border ${pinError || error ? 'border-red-500' : 'border-gray-300'} rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent`}
              inputMode="numeric"
              maxLength={6}
              autoFocus
              disabled={loading}
            />
            {(pinError || error) && (
              <p className="mt-1 text-sm text-red-600">
                {pinError || error}
              </p>
            )}
          </div>
          
          <div className="flex justify-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading || pin.length !== 6}
              className="px-4 py-2 bg-accent hover:bg-blue-700 text-white rounded-md transition-colors disabled:bg-blue-300 flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Xác nhận...
                </>
              ) : (
                'Xác nhận thanh toán'
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-sm text-gray-500 text-center">
          Nhập mã PIN 6 chữ số của ví để xác nhận thanh toán
        </div>
      </div>
    </div>
  );
};

export default WalletPinVerificationModal;