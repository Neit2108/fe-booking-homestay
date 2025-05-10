// src/pages/Statistics/components/BookingStatsChart.jsx
import React, { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

const BookingStatsChart = ({ statistics }) => {
  // Process booking data for the chart
  const bookingData = useMemo(() => {
    return [
      { name: 'Hoàn thành', value: statistics.completedBookings, color: '#4CAF50' },
      { name: 'Xác nhận', value: statistics.confirmedBookings, color: '#2196F3' },
      { name: 'Đang chờ', value: statistics.pendingBookings, color: '#FFC107' },
      { name: 'Đã hủy', value: statistics.cancelledBookings, color: '#F44336' }
    ].filter(item => item.value > 0); // Only show non-zero values
  }, [statistics]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
          <p style={{ color: data.color }} className="font-medium">{`${data.name}: ${data.value}`}</p>
          <p className="text-gray-600">{`${((data.value / statistics.totalBookings) * 100).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  // If no data available
  if (bookingData.length === 0 || statistics.totalBookings === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Phân bố đơn đặt phòng</h2>
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500">Không có dữ liệu đơn đặt phòng</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pie chart */}
      <div className="bg-white rounded-lg shadow-md p-5">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Phân bố đơn đặt phòng</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={bookingData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1000}
                animationBegin={200}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {bookingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Booking stats detail cards */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Chi tiết đơn đặt phòng</h2>
        <div className="space-y-4">
          {/* Completed Bookings */}
          <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Đơn hoàn thành</h3>
              <p className="text-2xl font-semibold text-green-700">
                {statistics.completedBookings}
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Confirmed Bookings */}
          <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Đơn xác nhận</h3>
              <p className="text-2xl font-semibold text-blue-700">
                {statistics.confirmedBookings}
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>

          {/* Pending Bookings */}
          <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Đơn chờ xử lý</h3>
              <p className="text-2xl font-semibold text-yellow-700">
                {statistics.pendingBookings}
              </p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Cancelled Bookings */}
          <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Đơn hủy</h3>
              <p className="text-2xl font-semibold text-red-700">
                {statistics.cancelledBookings}
              </p>
            </div>
            <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStatsChart;