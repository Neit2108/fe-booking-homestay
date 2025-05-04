// components/BookingFilters/BookingFilters.jsx
import React from "react";

const BookingFilters = ({ 
  statusFilter, 
  setStatusFilter,
  paymentStatusFilter,
  setPaymentStatusFilter,
  startDateFilter, 
  setStartDateFilter, 
  endDateFilter, 
  setEndDateFilter,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  applyFilters,
  resetFilters
}) => {
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };
  
  const handlePaymentStatusChange = (e) => {
    setPaymentStatusFilter(e.target.value);
  };
  
  const handleStartDateChange = (e) => {
    setStartDateFilter(e.target.value);
  };
  
  const handleEndDateChange = (e) => {
    setEndDateFilter(e.target.value);
  };
  
  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };
  
  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 space-y-4">
      <h3 className="font-semibold text-lg text-gray-700 mb-2">Bộ lọc</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Booking Status Filter */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Trạng thái đơn đặt</label>
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="w-full px-3 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tất cả</option>
            <option value="Pending">Đang chờ</option>
            <option value="Confirmed">Đã xác nhận</option>
            <option value="Cancelled">Đã hủy</option>
            {/* <option value="Completed">Completed</option> */}
          </select>
        </div>

        {/* Payment Status Filter */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Trạng thái thanh toán</label>
          <select
            value={paymentStatusFilter}
            onChange={handlePaymentStatusChange}
            className="w-full px-3 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tất cả</option>
            <option value="Paid">Đã thanh toán</option>
            <option value="Unpaid">Chưa thanh toán</option>
            <option value="Refunded">Đã hoàn tiền</option>
          </select>
        </div>

        {/* Date Range Filters */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Ngày đến</label>
          <input
            type="date"
            value={startDateFilter}
            onChange={handleStartDateChange}
            className="w-full px-3 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Ngày đi</label>
          <input
            type="date"
            value={endDateFilter}
            onChange={handleEndDateChange}
            className="w-full px-3 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Price Range Filters */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Từ (VND)</label>
          <input
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
            placeholder="Giá thấp nhất"
            className="w-full px-3 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Đến (VND)</label>
          <input
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            placeholder="Giá cao nhất"
            className="w-full px-3 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 mt-4">
        <button 
          onClick={resetFilters}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Đặt lại
        </button>
      </div>
    </div>
  );
};

export default BookingFilters;