import React from 'react';
import { formatPrice } from '../../Utils/PriceUtils';

/**
 * Component for displaying wallet stats
 * 
 * @param {Object} props
 * @param {Array} props.transactions - List of transaction objects
 * @param {boolean} props.loading - Whether stats are loading
 */
const WalletStatsCards = ({ transactions, loading }) => {
  // Calculate stats
  const stats = React.useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return {
        totalDeposited: 0,
        totalSpent: 0,
        transactionCount: 0,
        successRate: 0
      };
    }

    // Total deposited (Deposit and Refund transactions)
    const totalDeposited = transactions
      .filter(t => t.type === 'Deposit' || t.type === 'Refund')
      .reduce((sum, t) => sum + t.amount, 0);

    // Total spent (Payment and Withdrawal transactions)
    const totalSpent = transactions
      .filter(t => t.type === 'Payment' || t.type === 'Withdrawal')
      .reduce((sum, t) => sum + t.amount, 0);

    // Transaction count
    const transactionCount = transactions.length;

    // Success rate (assuming all transactions in the list are successful)
    const successRate = transactionCount > 0 ? 100 : 0;

    return {
      totalDeposited,
      totalSpent,
      transactionCount,
      successRate
    };
  }, [transactions]);

  // Stat cards
  const cards = [
    {
      title: "Tổng tiền đã nạp",
      value: formatPrice(stats.totalDeposited) + " VNĐ",
      icon: (
        <svg className="w-10 h-10 p-2 bg-green-100 text-green-600 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      color: "text-green-600"
    },
    {
      title: "Tổng tiền đã sử dụng",
      value: formatPrice(stats.totalSpent) + " VNĐ",
      icon: (
        <svg className="w-10 h-10 p-2 bg-red-100 text-red-600 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "text-red-600"
    },
    {
      title: "Số giao dịch",
      value: stats.transactionCount.toString(),
      icon: (
        <svg className="w-10 h-10 p-2 bg-blue-100 text-blue-600 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: "text-blue-600"
    },
    {
      title: "Tỷ lệ thành công",
      value: `${stats.successRate}%`,
      icon: (
        <svg className="w-10 h-10 p-2 bg-purple-100 text-purple-600 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "text-purple-600"
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-white shadow-md rounded-lg p-4 h-28"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4 flex items-center">
          {card.icon}
          <div className="ml-4">
            <h3 className="text-gray-500 text-sm">{card.title}</h3>
            <p className={`text-xl font-semibold ${card.color}`}>{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WalletStatsCards;