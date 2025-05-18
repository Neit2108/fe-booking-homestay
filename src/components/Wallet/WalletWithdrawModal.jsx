import React, { useState } from 'react';
import { formatPrice } from '../../Utils/PriceUtils';

/**
 * Modal for withdrawing money from wallet
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Close handler
 * @param {Function} props.onSubmit - Form submit handler
 * @param {boolean} props.loading - Loading state
 */
const WalletWithdrawModal = ({ isOpen, onClose, onSubmit, loading }) => {
  const [amount, setAmount] = useState(100000);
  const [pin, setPin] = useState('');
  const [errors, setErrors] = useState({});

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(value);

    // Validate amount
    if (value < 10000) {
      setErrors({ ...errors, amount: 'Số tiền tối thiểu là 10,000 VNĐ' });
    } else if (value > 20000000) {
      setErrors({ ...errors, amount: 'Số tiền tối đa là 20,000,000 VNĐ' });
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

  const handlePinChange = (e) => {
    setPin(e.target.value);
    if (e.target.value.length < 6) {
      setErrors({ ...errors, pin: 'PIN phải đủ 6 ký tự' });
    } else {
      const { pin, ...rest } = errors;
      setErrors(rest);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    if (!amount || amount < 10000) {
      setErrors((prev) => ({ ...prev, amount: 'Số tiền tối thiểu là 10,000 VNĐ' }));
      hasError = true;
    }
    if (!pin || pin.length < 6) {
      setErrors((prev) => ({ ...prev, pin: 'PIN phải đủ 4 ký tự' }));
      hasError = true;
    }
    if (hasError) return;
    onSubmit({ amount, pin });
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
          <h2 className="text-xl font-semibold text-primary">Rút tiền từ ví</h2>
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
            <label htmlFor="withdraw-amount" className="block text-sm font-medium text-gray-700 mb-1">
              Số tiền rút (VNĐ)
            </label>
            <input
              type="number"
              id="withdraw-amount"
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

          {/* PIN input */}
          <div className="mb-6">
            <label htmlFor="withdraw-pin" className="block text-sm font-medium text-gray-700 mb-1">
              Nhập mã PIN ví
            </label>
            <input
              type="password"
              id="withdraw-pin"
              value={pin}
              maxLength={6}
              onChange={handlePinChange}
              className={`w-full px-3 py-2 border ${
                errors.pin ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent`}
              autoComplete="off"
            />
            {errors.pin && (
              <p className="mt-1 text-sm text-red-500">{errors.pin}</p>
            )}
          </div>

          {/* Summary */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Số tiền rút:</span>
              <span className="font-medium">{formatPrice(amount)} VNĐ</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Phí giao dịch:</span>
              <span className="font-medium">0 VNĐ</span>
            </div>
            <div className="border-t border-gray-200 my-2 pt-2 flex justify-between">
              <span className="text-gray-700 font-medium">Tổng tiền nhận:</span>
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
                'Rút tiền'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WalletWithdrawModal;
