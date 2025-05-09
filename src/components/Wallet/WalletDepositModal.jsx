import React, { useState } from 'react';
import { formatPrice } from '../../Utils/PriceUtils';

/**
 * Component for depositing money to wallet
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Function to call when modal is closed
 * @param {Function} props.onSubmit - Function to call when form is submitted
 * @param {boolean} props.loading - Whether submit is loading
 */
const WalletDepositModal = ({ isOpen, onClose, onSubmit, loading }) => {
  const [amount, setAmount] = useState(100000);
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [errors, setErrors] = useState({});

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(value);
    
    // Validate amount
    if (value < 10000) {
      setErrors({
        ...errors,
        amount: 'Số tiền tối thiểu là 10,000 VNĐ'
      });
    } else if (value > 20000000) {
      setErrors({
        ...errors,
        amount: 'Số tiền tối đa là 20,000,000 VNĐ'
      });
    } else {
      const { amount, ...rest } = errors;
      setErrors(rest);
    }
  };

  const handleSelectAmount = (value) => {
    setAmount(value);
    // Clear amount error
    const { amount, ...rest } = errors;
    setErrors(rest);
  };

  const handleMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate amount
    if (!amount || amount < 10000) {
      setErrors({
        ...errors,
        amount: 'Số tiền tối thiểu là 10,000 VNĐ'
      });
      return;
    }
    
    // Submit form
    onSubmit({
      amount,
      paymentMethod
    });
  };

  if (!isOpen) return null;

  // Predefined amounts
  const predefinedAmounts = [
    { label: '100K', value: 100000 },
    { label: '200K', value: 200000 },
    { label: '500K', value: 500000 },
    { label: '1M', value: 1000000 },
    { label: '2M', value: 2000000 },
  ];

  return (
    <div className="fixed inset-0 bg-opacity-90 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white border rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-primary">Nạp tiền vào ví</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Amount input */}
          <div className="mb-6">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Số tiền (VNĐ)
            </label>
            <input
              type="number"
              id="amount"
              min="10000"
              step="10000"
              value={amount}
              onChange={handleAmountChange}
              className={`w-full px-3 py-2 border ${
                errors.amount ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent`}
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-500">{errors.amount}</p>
            )}
            
            {/* Predefined amounts */}
            <div className="mt-3 flex flex-wrap gap-2">
              {predefinedAmounts.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => handleSelectAmount(item.value)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    amount === item.value 
                      ? 'bg-accent text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Payment method */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phương thức thanh toán
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`border rounded-lg p-4 flex items-start cursor-pointer ${
                paymentMethod === 'bank_transfer' ? 'border-accent bg-blue-50' : 'border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank_transfer"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={handleMethodChange}
                  className="sr-only"
                />
                <div className="flex-shrink-0 mr-3 mt-1">
                  <div className={`w-4 h-4 rounded-full border ${
                    paymentMethod === 'bank_transfer' ? 'border-accent' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'bank_transfer' && (
                      <div className="w-2 h-2 rounded-full bg-accent m-1"></div>
                    )}
                  </div>
                </div>
                <div>
                  <span className="block font-medium text-gray-900">Chuyển khoản ngân hàng</span>
                  <span className="text-xs text-gray-500">QR code VNPay</span>
                </div>
              </label>

              <label className={`border rounded-lg p-4 flex items-start cursor-pointer ${
                paymentMethod === 'credit_card' ? 'border-accent bg-blue-50' : 'border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit_card"
                  checked={paymentMethod === 'credit_card'}
                  onChange={handleMethodChange}
                  className="sr-only"
                />
                <div className="flex-shrink-0 mr-3 mt-1">
                  <div className={`w-4 h-4 rounded-full border ${
                    paymentMethod === 'credit_card' ? 'border-accent' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'credit_card' && (
                      <div className="w-2 h-2 rounded-full bg-accent m-1"></div>
                    )}
                  </div>
                </div>
                <div>
                  <span className="block font-medium text-gray-900">Thẻ ATM/Thẻ tín dụng</span>
                  <span className="text-xs text-gray-500">Cổng thanh toán VNPay</span>
                </div>
              </label>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Số tiền nạp:</span>
              <span className="font-medium">{formatPrice(amount)} VNĐ</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Phí giao dịch:</span>
              <span className="font-medium">0 VNĐ</span>
            </div>
            <div className="border-t border-gray-200 my-2 pt-2 flex justify-between">
              <span className="text-gray-700 font-medium">Tổng thanh toán:</span>
              <span className="text-primary font-bold">{formatPrice(amount)} VNĐ</span>
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading || Object.keys(errors).length > 0}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang xử lý...
                </>
              ) : (
                'Tiếp tục'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WalletDepositModal;