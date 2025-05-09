import React from 'react';
import { formatPrice } from '../../Utils/PriceUtils';

/**
 * Component for displaying success/failure message after a payment/deposit operation
 * 
 * @param {Object} props
 * @param {string} props.status - Status ('success' or 'error')
 * @param {string} props.title - Title to display
 * @param {string} props.message - Message to display
 * @param {number} props.amount - Amount (if applicable)
 * @param {Function} props.onButtonClick - Function to call when button is clicked
 * @param {string} props.buttonText - Button text
 */
const SuccessResultCard = ({ 
  status = 'success',
  title,
  message,
  amount,
  onButtonClick,
  buttonText = 'Về trang ví'
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <div className="flex justify-center mb-4">
        {status === 'success' ? (
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}
      </div>
      
      <h2 className={`text-2xl font-bold ${status === 'success' ? 'text-green-600' : 'text-red-600'} mb-2`}>
        {title || (status === 'success' ? 'Thành công' : 'Thất bại')}
      </h2>
      
      <p className="text-gray-600 mb-4">
        {message || (status === 'success' ? 'Giao dịch đã được xử lý thành công.' : 'Đã xảy ra lỗi trong quá trình xử lý giao dịch.')}
      </p>
      
      {amount !== undefined && amount !== null && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg inline-block">
          <div className="text-gray-500 text-sm">Số tiền giao dịch</div>
          <div className="text-2xl font-bold text-primary">{formatPrice(amount)} VNĐ</div>
        </div>
      )}
      
      {onButtonClick && (
        <button
          onClick={onButtonClick}
          className={`mt-4 px-6 py-3 rounded-lg font-medium ${
            status === 'success' 
              ? 'bg-accent hover:bg-blue-700 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          } transition-colors`}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default SuccessResultCard;