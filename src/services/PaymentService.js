// src/services/PaymentService.js
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

import { API_URL } from '../../constant/config';

const usePaymentService = () => {
  const { user, loading: userLoading} = useContext(UserContext); // Lấy thông tin người dùng từ context

  useEffect(() => {
  }, [userLoading]);

  return {
    // Tạo URL thanh toán qua VNPay
    createPayment: async (bookingId, returnUrl) => {
      try {
        const token = user?.token; // Lấy token từ user
        
        if (!token) {
          throw new Error('User not authenticated');
        }
        console.log("token", token);
        const response = await axios.post(
          `${API_URL}/vnpay/create-payment`,
          {
            bookingId,
            returnUrl,
            orderInfo: `Thanh toán đặt phòng #${bookingId}`,
            locale: 'vn'
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log("response", response);
        return response.data;
      } catch (error) {
        console.error('Error creating payment:', error);
        throw error;
      }
    },

    // Lấy thông tin thanh toán theo ID
    getPaymentById: async (paymentId) => {
      try {
        const token = user?.token; // Lấy token từ user
        
        if (!token) {
          throw new Error('User not authenticated');
        }
        
        const response = await axios.get(
          `${API_URL}/vnpay/payment/${paymentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        return response.data;
      } catch (error) {
        console.error('Error getting payment:', error);
        throw error;
      }
    },

    // Lấy danh sách thanh toán theo bookingId
    getPaymentsByBookingId: async (bookingId) => {
      try {
        const token = user?.token; // Lấy token từ user
        
        if (!token) {
          throw new Error('User not authenticated');
        }
        
        const response = await axios.get(
          `${API_URL}/vnpay/booking/${bookingId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        return response.data;
      } catch (error) {
        console.error('Error getting payments by booking ID:', error);
        throw error;
      }
    }
  };
};

export default usePaymentService;