// src/utils/VNPayUtils.js

/**
 * Utility functions for handling VNPay payment operations
 */
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7284';

/**
 * Creates a VNPay payment request
 * @param {number} bookingId - ID of the booking
 * @param {string} paymentMethod - Type of payment method (e.g., "bank_transfer", "credit_card")
 * @param {string} token - Authentication token
 * @returns {Promise<object>} - Payment data from the API
 */
export const createVNPayRequest = async (bookingId, paymentMethod, token) => {
  if (!bookingId) {
    throw new Error('Booking ID is required');
  }
  
  if (!token) {
    throw new Error('Authentication token is required');
  }
  
  // Determine bank code based on payment method
  let bankCode = undefined;
  let requestDirectQR = false;
  
  if (paymentMethod === 'credit_card') {
    bankCode = 'NCB'; // Default bank code for card payments
  } else if (paymentMethod === 'bank_transfer') {
    // Use VNPAYQR for direct QR code payments
    bankCode = 'VNPAYQR';
    requestDirectQR = true;
  }
  
  try {
    const response = await axios.post(
      `${API_BASE_URL}/vnpay/create-payment`,
      {
        bookingId: bookingId,
        returnUrl: `${window.location.origin}/payment-result`,
        orderInfo: `Payment for booking #${bookingId}`,
        locale: 'vn',
        bankCode: bankCode,
        requestDirectQR: requestDirectQR
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
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
 * Generate a direct QR code link for a payment
 * 
 * @param {string} paymentUrl - Payment URL from VNPay
 * @param {number} amount - Payment amount
 * @param {string} orderId - Order ID or transaction reference
 * @returns {string} - Direct QR code URL
 */
export const generateDirectQRUrl = (paymentUrl, amount, orderId) => {
  // Check if this is already a QR code URL
  if (paymentUrl.includes('qrcode') || paymentUrl.includes('qr.')) {
    return paymentUrl;
  }
  
  // Extract parameters from the payment URL
  let qrParams = {};
  try {
    // Parse the existing URL to extract VNPay parameters
    const urlObj = new URL(paymentUrl);
    const searchParams = new URLSearchParams(urlObj.search);
    
    // Extract key parameters needed for QR code
    searchParams.forEach((value, key) => {
      qrParams[key] = value;
    });
    
    // Add any missing required parameters
    if (!qrParams['vnp_Amount'] && amount) {
      qrParams['vnp_Amount'] = Math.round(amount * 100).toString();
    }
    
    if (!qrParams['vnp_TxnRef'] && orderId) {
      qrParams['vnp_TxnRef'] = orderId.toString();
    }
    
    // For direct QR, we can use Google Charts API as a fallback if needed
    return `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(paymentUrl)}&chs=300x300&chld=L|0`;
  } catch (error) {
    console.error('Error generating direct QR URL:', error);
    // Fallback to original URL
    return paymentUrl;
  }
};

/**
 * Get payment details by ID
 * @param {number} paymentId - Payment ID
 * @param {string} token - Authentication token
 * @returns {Promise<object>} - Payment details
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
      `${API_BASE_URL}/vnpay/payment/${paymentId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
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
 * Format payment status for display
 * @param {string} status - Payment status from API
 * @returns {object} - Formatted status with text, color, and icon classes
 */
export const formatPaymentStatus = (status) => {
  switch (status?.toLowerCase()) {
    case 'success':
      return {
        text: 'Thành công',
        textColor: 'text-green-600',
        bgColor: 'bg-green-100',
        icon: 'text-green-500'
      };
    case 'pending':
      return {
        text: 'Đang xử lý',
        textColor: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        icon: 'text-yellow-500'
      };
    case 'failed':
      return {
        text: 'Thất bại',
        textColor: 'text-red-600',
        bgColor: 'bg-red-100',
        icon: 'text-red-500'
      };
    default:
      return {
        text: status || 'Không xác định',
        textColor: 'text-gray-600',
        bgColor: 'bg-gray-100',
        icon: 'text-gray-500'
      };
  }
};

export default {
  createVNPayRequest,
  getPaymentById,
  formatPaymentStatus,
  generateDirectQRUrl
};