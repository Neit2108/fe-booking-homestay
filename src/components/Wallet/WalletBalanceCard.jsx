import React from 'react';
import { formatPrice } from '../../Utils/PriceUtils';

/**
 * Component for displaying wallet balance
 * 
 * @param {Object} props
 * @param {number} props.balance - Wallet balance
 * @param {boolean} props.loading - Whether balance is loading
 * @param {Function} props.onDepositClick - Function to call when deposit button is clicked
 */
const WalletBalanceCard = ({ balance, loading, onDepositClick }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent opacity-10 rounded-full -mr-6 -mt-6"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-accent opacity-10 rounded-full -ml-4 -mb-4"></div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-primary">Số dư ví</h2>
        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      
      {loading ? (
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded mb-4"></div>
        </div>
      ) : (
        <div className="mb-6">
          <div className="text-3xl font-bold text-primary">{formatPrice(balance)} VNĐ</div>
          <p className="text-sm text-gray-500 mt-1">Số dư hiện tại</p>
        </div>
      )}
      
      <button
        onClick={onDepositClick}
        disabled={loading}
        className="w-full py-3 bg-accent hover:bg-blue-700 text-white rounded-md transition-colors duration-200 flex items-center justify-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Nạp tiền
      </button>
    </div>
  );
};

export default WalletBalanceCard;