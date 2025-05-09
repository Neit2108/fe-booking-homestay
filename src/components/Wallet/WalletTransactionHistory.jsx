import React from 'react';
import { formatPrice } from '../../Utils/PriceUtils';
import { formatDate } from '../../Utils/DateUtils';

/**
 * Component for displaying wallet transaction history
 * 
 * @param {Object} props
 * @param {Array} props.transactions - List of transaction objects
 * @param {boolean} props.loading - Whether transactions are being loaded
 * @param {Function} props.onPageChange - Function to call when changing pages
 * @param {number} props.currentPage - Current page number
 * @param {number} props.totalPages - Total number of pages
 */
const WalletTransactionHistory = ({ 
  transactions, 
  loading, 
  onPageChange,
  currentPage = 1,
  totalPages = 1
}) => {
  // Transaction type badge styles
  const transactionTypeStyles = {
    Deposit: "bg-green-100 text-green-800",
    Payment: "bg-red-100 text-red-800",
    Refund: "bg-blue-100 text-blue-800",
    Withdrawal: "bg-yellow-100 text-yellow-800"
  };

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Lịch sử giao dịch</h2>
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-16 bg-gray-200 rounded mb-2"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Lịch sử giao dịch</h2>
        <div className="text-center py-8 text-gray-500">
          <p>Chưa có giao dịch nào</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-primary mb-4">Lịch sử giao dịch</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loại
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mô tả
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số tiền
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(transaction.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transactionTypeStyles[transaction.type] || "bg-gray-100 text-gray-800"
                  }`}>
                    {transaction.type === "Deposit" && "Nạp tiền"}
                    {transaction.type === "Payment" && "Thanh toán"}
                    {transaction.type === "Refund" && "Hoàn tiền"}
                    {transaction.type === "Withdrawal" && "Rút tiền"}
                    {!["Deposit", "Payment", "Refund", "Withdrawal"].includes(transaction.type) && transaction.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {transaction.description}
                  {transaction.bookingId && (
                    <span className="ml-2 text-xs text-accent">
                      (Mã đặt phòng: {transaction.bookingId})
                    </span>
                  )}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                  transaction.type === "Deposit" || transaction.type === "Refund" 
                    ? "text-green-600" 
                    : "text-red-600"
                }`}>
                  {transaction.type === "Deposit" || transaction.type === "Refund" ? "+" : "-"}
                  {formatPrice(transaction.amount)} VNĐ
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Page numbers */}
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => onPageChange(page + 1)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === page + 1
                    ? "z-10 bg-accent border-accent text-white"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {page + 1}
              </button>
            ))}
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default WalletTransactionHistory;