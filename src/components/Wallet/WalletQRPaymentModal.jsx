import React, { useEffect, useState } from 'react';
import { formatPrice } from '../../Utils/PriceUtils';
import QRCodeService from '../../services/QRCodeService';
import BankTransferQR from '../../services/BankTransferQR';

/**
 * Component for displaying QR code for payment
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Function to call when modal is closed
 * @param {Object} props.paymentData - Payment data from API
 * @param {Function} props.onCheckStatus - Function to check payment status
 * @param {number} props.amount - Payment amount
 */
const WalletQRPaymentModal = ({ isOpen, onClose, paymentData, onCheckStatus, amount }) => {
  const [countdown, setCountdown] = useState(15 * 60); // 15 minutes in seconds
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!isOpen || !paymentData) return;

    // Reset countdown when modal opens
    setCountdown(15 * 60);

    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto-check status every 5 seconds
    const statusChecker = setInterval(() => {
      handleCheckStatus();
    }, 5000);

    // Clear interval when modal closes
    return () => {
      clearInterval(timer);
      clearInterval(statusChecker);
    };
  }, [isOpen, paymentData]);

  // Format countdown time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCheckStatus = async () => {
    if (checking || !paymentData) return;
    
    setChecking(true);
    try {
      await onCheckStatus(paymentData.paymentId);
    } finally {
      setChecking(false);
    }
  };

  // Generate QR code image source
  const getQRImageSource = () => {
    if (!paymentData) return '';

    // If paymentData has base64 QR code, use it
    if (paymentData.qrCodeBase64) {
      return `data:image/png;base64,${paymentData.qrCodeBase64}`;
    }
    
    // If paymentData has QR code URL, use it
    if (paymentData.qrCodeUrl) {
      return paymentData.qrCodeUrl;
    }
    
    // Generate QR code from payment URL
    return QRCodeService.getGoogleQRCodeUrl(paymentData.paymentUrl || '', 300);
  };

  if (!isOpen || !paymentData) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white border rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-primary">Quét mã QR để thanh toán</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* QR Code */}
          <BankTransferQR totalPrice={amount} paymentId={paymentData.paymentId}/>
          
          {/* Payment Info */}
          <div className="mb-6">
            <div className="text-center mb-2">
              <div className="text-gray-600">Số tiền cần thanh toán</div>
              <div className="text-2xl font-bold text-primary">{formatPrice(amount)} VNĐ</div>
            </div>
            
            <div className="flex justify-center">
              <div className="bg-yellow-50 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Mã QR hết hạn trong: {formatTime(countdown)}
              </div>
            </div>
          </div>
          
          {/* Instructions */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg text-sm">
            <h3 className="font-medium text-gray-900 mb-2">Hướng dẫn:</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-600">
              <li>Mở ứng dụng ngân hàng hoặc ví điện tử trên điện thoại của bạn</li>
              <li>Chọn chức năng quét mã QR</li>
              <li>Quét mã QR được hiển thị ở trên</li>
              <li>Kiểm tra thông tin giao dịch và xác nhận thanh toán</li>
              <li>Đợi hệ thống xác nhận giao dịch</li>
            </ol>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              onClick={() => window.location.href = paymentData.paymentUrl}
              className="flex-1 px-4 py-2 bg-accent text-white rounded hover:bg-blue-700 transition-colors flex justify-center items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Mở trang thanh toán
            </button>
            <button
              onClick={handleCheckStatus}
              disabled={checking}
              className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors flex justify-center items-center"
            >
              {checking ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang kiểm tra...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Kiểm tra trạng thái
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletQRPaymentModal;