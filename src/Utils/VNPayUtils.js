// src/Utils/VNPayUtils.js

/**
 * Utility functions for handling VNPay-related operations
 */
import axios from 'axios';

/**
 * Create a VNPay payment URL for a booking
 * @param {number} bookingId - The ID of the booking to pay for
 * @param {string} token - JWT authentication token
 * @returns {Promise<object>} Payment details including URL and QR code
 */
export const createVNPayPayment = async (bookingId, token) => {
  if (!bookingId) {
    throw new Error('Booking ID is required');
  }
  
  if (!token) {
    throw new Error('Authentication token is required');
  }
  
  try {
    const response = await axios.post(
      'https://localhost:7284/vnpay/create-payment',
      {
        bookingId: bookingId,
        returnUrl: `${window.location.origin}/payment-result`,
        orderInfo: `Payment for booking #${bookingId}`,
        locale: 'vn'
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error creating VNPay payment:', error);
    throw new Error(error.response?.data?.message || 'Failed to create payment');
  }
};

/**
 * Get payment details by ID
 * @param {number} paymentId - The ID of the payment to get
 * @param {string} token - JWT authentication token
 * @returns {Promise<object>} Payment details
 */
export const getPaymentById = async (paymentId, token) => {
  if (!paymentId) {
    throw new Error('Payment ID is required');
  }
  
  if (!token) {
    throw new Error('Authentication token is required');
  }
  
  try {
    const response = await axios.get(
      `https://localhost:7284/vnpay/payment/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error getting payment details:', error);
    throw new Error(error.response?.data?.message || 'Failed to get payment details');
  }
};

/**
 * Get all payments for a booking
 * @param {number} bookingId - The ID of the booking
 * @param {string} token - JWT authentication token
 * @returns {Promise<Array>} Array of payment details
 */
export const getPaymentsByBookingId = async (bookingId, token) => {
  if (!bookingId) {
    throw new Error('Booking ID is required');
  }
  
  if (!token) {
    throw new Error('Authentication token is required');
  }
  
  try {
    const response = await axios.get(
      `https://localhost:7284/vnpay/booking/${bookingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error getting booking payments:', error);
    throw new Error(error.response?.data?.message || 'Failed to get booking payments');
  }
};

/**
 * Get all payments for the current user
 * @param {string} token - JWT authentication token
 * @returns {Promise<Array>} Array of payment details
 */
export const getUserPayments = async (token) => {
  if (!token) {
    throw new Error('Authentication token is required');
  }
  
  try {
    const response = await axios.get(
      'https://localhost:7284/vnpay/user',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error getting user payments:', error);
    throw new Error(error.response?.data?.message || 'Failed to get user payments');
  }
};

/**
 * Generate QR code URL from payment URL
 * Since the backend should provide the QR code, this is a fallback
 * @param {string} paymentUrl - The VNPay payment URL
 * @returns {string} Google Charts QR code URL
 */
export const generateQRCodeUrl = (paymentUrl) => {
  if (!paymentUrl) return null;
  
  // Use Google Charts API to generate QR code
  const encodedUrl = encodeURIComponent(paymentUrl);
  return `https://chart.googleapis.com/chart?cht=qr&chl=${encodedUrl}&chs=300x300&chld=L|0`;
};

/**
 * Format payment status for display
 * @param {string} status - The payment status from API
 * @returns {object} Formatted status with text, color, and icon class
 */
export const formatPaymentStatus = (status) => {
  switch (status) {
    case 'Success':
      return {
        text: 'Thành công',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        iconClass: 'text-green-500'
      };
    case 'Pending':
      return {
        text: 'Đang xử lý',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        iconClass: 'text-yellow-500'
      };
    case 'Failed':
      return {
        text: 'Thất bại',
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        iconClass: 'text-red-500'
      };
    default:
      return {
        text: status || 'Không xác định',
        color: 'text-gray-600',
        bgColor: 'bg-gray-100',
        iconClass: 'text-gray-500'
      };
  }
};