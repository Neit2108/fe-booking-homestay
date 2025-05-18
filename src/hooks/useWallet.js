import { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { API_URL } from '../../constant/config';

/**
 * Custom hook for wallet functionality
 * @returns {Object} wallet hook methods and states
 */
const useWallet = () => {
  const { user } = useContext(UserContext);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState({
    balance: false,
    transactions: false,
    deposit: false,
    withdraw: false
  });
  const [error, setError] = useState({
    balance: null,
    transactions: null,
    deposit: null,
    withdraw: null
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    totalPages: 1
  });

  /**
   * Fetch wallet balance
   */
  const fetchBalance = useCallback(async () => {
    if (!user?.token) return;

    setLoading(prev => ({ ...prev, balance: true }));
    setError(prev => ({ ...prev, balance: null }));

    try {
      const response = await axios.get(
        `${API_URL}/wallet/balance`,
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      );

      setBalance(response.data.balance);
    } catch (err) {
      console.error('Error fetching wallet balance:', err);
      setError(prev => ({ 
        ...prev, 
        balance: err.response?.data?.message || 'Failed to fetch wallet balance' 
      }));
    } finally {
      setLoading(prev => ({ ...prev, balance: false }));
    }
  }, [user]);

  /**
   * Fetch transaction history
   * @param {number} page - Page number
   * @param {number} pageSize - Page size
   */
  const fetchTransactions = useCallback(async (page = 1, pageSize = 10) => {
    if (!user?.token) return;

    setLoading(prev => ({ ...prev, transactions: true }));
    setError(prev => ({ ...prev, transactions: null }));

    try {
      const response = await axios.get(
        `${API_URL}/wallet/transactions`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
          params: { page, pageSize }
        }
      );

      setTransactions(response.data || []);
      
      // Set pagination if response includes it
      if (response.headers['x-total-count']) {
        const totalCount = parseInt(response.headers['x-total-count']);
        setPagination({
          page,
          pageSize,
          totalPages: Math.ceil(totalCount / pageSize)
        });
      } else {
        // Fallback if headers don't include pagination info
        setPagination({
          page,
          pageSize,
          totalPages: Math.ceil(response.data.length / pageSize)
        });
      }
    } catch (err) {
      console.error('Error fetching wallet transactions:', err);
      setError(prev => ({ 
        ...prev, 
        transactions: err.response?.data?.message || 'Failed to fetch transactions' 
      }));
    } finally {
      setLoading(prev => ({ ...prev, transactions: false }));
    }
  }, [user]);

  /**
   * Deposit money to wallet
   * @param {Object} depositData - Deposit data
   * @returns {Promise} - Deposit response
   */
  const deposit = useCallback(async (depositData) => {
    if (!user?.token) {
      throw new Error('User is not authenticated');
    }

    setLoading(prev => ({ ...prev, deposit: true }));
    setError(prev => ({ ...prev, deposit: null }));

    try {
      // Prepare deposit request data
      const requestData = {
        amount: depositData.amount,
        returnUrl: `${window.location.origin}/wallet`,
        bankCode: depositData.paymentMethod === 'bank_transfer' ? 'VNPAYQR' : "NCB"
      };

      const response = await axios.post(
        `${API_URL}/wallet/deposit`,
        requestData,
        {
          headers: { 
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (err) {
      console.error('Error depositing to wallet:', err);
      const errorMessage = err.response?.data?.message || 'Failed to process deposit';
      setError(prev => ({ ...prev, deposit: errorMessage }));
      throw new Error(errorMessage);
    } finally {
      setLoading(prev => ({ ...prev, deposit: false }));
    }
  }, [user]);

  /**
 * Withdraw money from wallet
 * @param {Object} withdrawData - Withdraw data { amount, pin }
 * @returns {Promise} - Withdraw response
 */
const withdraw = useCallback(async (withdrawData) => {
  if (!user?.token) {
    throw new Error('User is not authenticated');
  }

  setLoading(prev => ({ ...prev, withdraw: true }));
  setError(prev => ({ ...prev, withdraw: null }));

  try {
    const requestData = {
      amount: withdrawData.amount,
      pin: withdrawData.pin
    };

    const response = await axios.post(
      `${API_URL}/wallet/withdraw`,
      requestData,
      {
        headers: { 
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Nếu cần: cập nhật lại balance và transactions sau khi rút thành công
    await fetchBalance();
    await fetchTransactions(pagination.page, pagination.pageSize);

    return response.data;
  } catch (err) {
    console.error('Error withdrawing from wallet:', err);
    const errorMessage = err.response?.data?.message || 'Failed to withdraw from wallet';
    setError(prev => ({ ...prev, withdraw: errorMessage }));
    throw new Error(errorMessage);
  } finally {
    setLoading(prev => ({ ...prev, withdraw: false }));
  }
}, [user, fetchBalance, fetchTransactions, pagination]);


  /**
   * Check payment status
   * @param {number} paymentId - Payment ID
   * @returns {Promise} - Payment status
   */
  const checkPaymentStatus = useCallback(async (paymentId) => {
    if (!user?.token) {
      throw new Error('User is not authenticated');
    }

    try {
      const response = await axios.get(
        `${API_URL}/vnpay/payment/${paymentId}`,
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      );

      // If payment is successful, refresh balance
      if (response.data.status === 'Success') {
        await fetchBalance();
        await fetchTransactions(pagination.page, pagination.pageSize);
      }

      return response.data;
    } catch (err) {
      console.error('Error checking payment status:', err);
      throw new Error(err.response?.data?.message || 'Failed to check payment status');
    }
  }, [user, fetchBalance, fetchTransactions, pagination]);

  // Fetch wallet data on component mount
  useEffect(() => {
    if (user?.token) {
      fetchBalance();
      fetchTransactions();
    }
  }, [user, fetchBalance, fetchTransactions]);

  return {
    balance,
    transactions,
    pagination,
    loading,
    error,
    withdraw,
    fetchBalance,
    fetchTransactions,
    deposit,
    checkPaymentStatus
  };
};

export default useWallet;