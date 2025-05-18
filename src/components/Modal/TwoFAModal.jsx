import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const TwoFAModal = ({
  isOpen,
  onClose,
  otp,
  setOtp,
  onSubmit,
  error,
  isLoading
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 backdrop-blur-sm bg-opacity-50"
        onClick={handleOverlayClick}
      ></div>
      
      <div className="bg-white border rounded-lg shadow-xl z-10 w-[90%] max-w-md">
        <div className="relative">
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          
          <div className="flex flex-col items-center p-6">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            {/* Title */}
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
              Xác thực hai yếu tố
            </h2>
            
            {/* Input Field */}
            <div className="w-full mb-6">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg tracking-widest"
                placeholder="Nhập mã xác thực"
                maxLength={6}
                autoFocus
                disabled={isLoading}
              />
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
            
            {/* Description */}
            <p className="text-sm text-gray-600 mb-6 text-center">
              Vui lòng nhập mã xác thực đã được gửi đến email của bạn.
            </p>
            
            <button
              onClick={onSubmit}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200 ease-in-out disabled:bg-blue-400"
            >
              {isLoading ? "Đang xác thực..." : "Tiếp tục"}
            </button>
            
            {/* Help Text */}
            <p className="mt-4 text-sm text-gray-500 text-center">
              Không nhận được mã? 
              <a href="#" className="text-blue-600 hover:underline ml-1" onClick={(e) => {
                e.preventDefault();
              }}>
                Liên hệ hỗ trợ
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TwoFAModal;