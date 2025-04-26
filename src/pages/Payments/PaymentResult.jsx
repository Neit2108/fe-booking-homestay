// src/pages/Payments/PaymentResult.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/Loading/Loader';

const PaymentResult = () => {
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse query parameters
  const searchParams = new URLSearchParams(location.search);
  const paymentId = searchParams.get('paymentId');
  const status = searchParams.get('status');
  
  console.log('URL Search Params:', {
    fullSearch: location.search,
    paymentId: paymentId,
    status: status
  });

  // Fetch payment details on component mount
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      // Log all current parameters
      console.log('Current URL Parameters:', {
        paymentId,
        status
      });

      // If no paymentId, check for alternative parameters from VNPay
      if (!paymentId) {
        // Try extracting from VNPay specific parameters
        const vnpTxnRef = searchParams.get('vnp_TxnRef');
        
        if (vnpTxnRef) {
          console.log('Found VNPay Transaction Reference:', vnpTxnRef);
          
          try {
            const token = localStorage.getItem('token');
            if (!token) {
              throw new Error('No authentication token found');
            }

            const response = await axios.get(`https://localhost:7284/vnpay/payment/${vnpTxnRef}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });

            setPaymentDetails(response.data);
            setPaymentStatus(response.data.status);
          } catch (err) {
            console.error('Error fetching payment details by transaction reference:', err);
            setError('Unable to retrieve payment details');
          }
        } else {
          console.error('No payment identifier found in URL');
          setError('Payment ID is missing from URL');
        }
      } else {
        // Original flow with paymentId
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('You must be logged in to view payment details');
          }
          
          const response = await axios.get(`https://localhost:7284/vnpay/payment/${paymentId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          setPaymentDetails(response.data);
          setPaymentStatus(response.data.status);
        } catch (err) {
          console.error('Error fetching payment details:', err);
          setError('Failed to fetch payment details. Please try again.');
        }
      }
      
      setLoading(false);
    };
    
    fetchPaymentDetails();
  }, [paymentId, location.search]);

  const handleGoToBookings = () => {
    navigate('/user-booking-dashboard');
  };
  
  const handleGoToHome = () => {
    navigate('/');
  };
  
  // Rest of the component remains the same as your original implementation
  // (loading, error, and success rendering logic)

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader />
        <p className="mt-4 text-gray-600">Đang xử lý kết quả thanh toán...</p>
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-700 mb-4">Lỗi</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleGoToHome}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
            >
              Về trang chủ
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition-colors"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Success payment result - redirect to Step3
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        {paymentStatus === 'Success' ? (
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}
        
        <h2 className={`text-2xl font-bold ${paymentStatus === 'Success' ? 'text-green-700' : 'text-red-700'} mb-4`}>
          {paymentStatus === 'Success' ? 'Thanh toán thành công' : 'Thanh toán thất bại'}
        </h2>
        
        {/* Payment Details */}
        {paymentDetails && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Mã thanh toán:</span> #{paymentDetails.id}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Mã giao dịch:</span> {paymentDetails.transactionId || 'N/A'}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Số tiền:</span> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(paymentDetails.amount)}
            </p>
          </div>
        )}
        
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              // Redirect to Step3 with payment details
              handleGoToBookings();
            }}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
          >
            Xem chi tiết
          </button>
          <button
            onClick={handleGoToBookings}
            className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition-colors"
          >
            Đơn đặt phòng của tôi
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentResult;