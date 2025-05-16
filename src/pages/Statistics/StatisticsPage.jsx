// src/pages/Statistics/StatisticsPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { API_URL } from '../../../constant/config';
import Sidebar from '../../components/Sidebar/Sidebar';
import { formatPrice } from '../../Utils/PriceUtils';
import StatisticsSummaryCards from '../../components/Statistics/StatisticsSummaryCards';
import RevenueChart from '../../components/Statistics/RevenueChart';
import BookingStatsChart from '../../components/Statistics/BookingStatsChart';
import getDummyStatisticsData from '../../components/Statistics/dummyStatisticsData';

const StatisticsPage = () => {
  const { user, loading: userLoading } = useContext(UserContext); // Giả sử UserContext cung cấp trạng thái loading
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(2025, 0, 1), // 10/02/2025
    endDate: new Date(2025, 11, 31)    // 10/05/2025
  });

  // Check if user is admin or landlord
  const isAdmin = user && (
    (Array.isArray(user.role) && user.role.includes('Admin')) ||
    (typeof user.role === 'string' && user.role === 'Admin')
  );

  // Function to fetch statistics data
  const fetchStatistics = async () => {
    // Nếu không có user, không tiếp tục
    if (!user || !user.token) {
      setError("Vui lòng đăng nhập để xem thống kê");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Format dates for API
      const startDateParam = dateRange.startDate ? dateRange.startDate.toISOString() : null;
      const endDateParam = dateRange.endDate ? dateRange.endDate.toISOString() : null;

      // Use the appropriate endpoint based on user role
      const endpoint = isAdmin 
        ? `${API_URL}/statistics/admin/sales?startDate=${startDateParam}&endDate=${endDateParam}`
        : `${API_URL}/statistics/sales?startDate=${startDateParam}&endDate=${endDateParam}`;
      
      console.log("Fetching real data from API:", endpoint);
      
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      setStatistics(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching statistics:", err);
      setError("Không thể tải dữ liệu. Vui lòng thử lại.");
      setLoading(false);
    }
  };

  // Đợi user load xong, sau đó mới fetch dữ liệu
  useEffect(() => {
    // Chỉ fetch khi user đã được load xong và có thông tin
    if (!userLoading && user && user.token) {
      console.log("User loaded, fetching statistics...");
      fetchStatistics();
    } 
    // Nếu user đã load xong nhưng không có thông tin (chưa đăng nhập)
    else if (!userLoading && (!user || !user.token)) {
      setError("Vui lòng đăng nhập để xem thống kê");
      setLoading(false);
    }
    // Nếu user đang loading, giữ trạng thái loading
  }, [user, userLoading, dateRange]);

  // Handle date input changes
  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setDateRange(prev => ({
      ...prev,
      [name]: new Date(value)
    }));
  };

  // Handle refresh data - luôn lấy dữ liệu thật
  const handleRefresh = () => {
    fetchStatistics();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar with fixed width */}
      <div className="w-64 flex-shrink-0">
        <Sidebar activePage="statistics" />
      </div>
      
      {/* Main content with flex-1 to take remaining width */}
      <div className="flex-1 p-6 overflow-x-hidden overflow-y-auto">
        {/* Title and filters */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Thống kê của bạn
          </h1>
          
          <div className="flex items-center gap-3">
            {/* Date range picker matching the UI in screenshot */}
            <div className="relative">
              <div className="bg-white border rounded-lg shadow-sm flex items-center px-4 py-2">
                <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="flex items-center">
                  <input
                    type="date"
                    name="startDate"
                    value={dateRange.startDate.toISOString().split('T')[0]}
                    onChange={handleDateChange}
                    className="border-none outline-none"
                    disabled={loading || userLoading}
                  />
                  <span className="mx-2">-</span>
                  <input
                    type="date"
                    name="endDate"
                    value={dateRange.endDate.toISOString().split('T')[0]}
                    onChange={handleDateChange}
                    className="border-none outline-none"
                    disabled={loading || userLoading}
                  />
                </div>
                <svg className="w-5 h-5 ml-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {/* Refresh button */}
            <button 
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
              disabled={loading || userLoading}
            >
              {loading || userLoading ? (
                <>
                  <svg className="animate-spin w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang tải...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Làm mới
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </p>
            {user && user.token && (
              <button 
                onClick={handleRefresh} 
                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
              >
                Thử lại
              </button>
            )}
          </div>
        )}

        {/* Content area */}
        {(loading || userLoading) ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">
                {userLoading ? 'Đang xác thực thông tin đăng nhập...' : 'Đang tải dữ liệu thống kê...'}
              </p>
            </div>
          </div>
        ) : statistics ? (
          <div className="space-y-6">
            {/* Key metrics summary */}
            <StatisticsSummaryCards statistics={statistics} isAdmin={isAdmin} />
            
            {/* Revenue chart */}
            <RevenueChart revenueByMonth={statistics.revenueByMonth} />
            
            {/* Bookings distribution */}
            <BookingStatsChart statistics={statistics} />
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">Không có dữ liệu thống kê cho giai đoạn này</p>
            {user && user.token && (
              <button 
                onClick={handleRefresh} 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Thử lại
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticsPage;