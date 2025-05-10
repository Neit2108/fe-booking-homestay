// src/pages/Statistics/components/StatisticsSummaryCards.jsx
import React from 'react';
import { formatPrice } from '../../Utils/PriceUtils';

const StatisticsSummaryCards = ({ statistics, isAdmin }) => {
  // Basic card component
  const StatCard = ({ title, value, icon, bgColor, textColor }) => (
    <div className="bg-white rounded-lg shadow-md p-5 flex items-center">
      <div className={`p-3 rounded-full mr-4 ${bgColor}`}>
        <span className={`h-5 w-5 ${textColor}`}>{icon}</span>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-xl font-semibold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );

  // Calculate success rate
  const calculateSuccessRate = () => {
    if (!statistics.totalBookings) return 0;
    return Math.round((statistics.completedBookings / statistics.totalBookings) * 100);
  };

  // Calculate average booking value
  const calculateAvgBookingValue = () => {
    if (!statistics.completedBookings) return 0;
    return statistics.totalRevenue / statistics.completedBookings;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* Total Revenue */}
      <StatCard
        title="Tổng doanh thu"
        value={formatPrice(statistics.totalRevenue) + " VNĐ"}
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        bgColor="bg-green-100"
        textColor="text-green-600"
      />

      {/* Actual Sales (for Landlord) or Commission Amount (for Admin) */}
      {isAdmin ? (
        <StatCard
          title="Hoa hồng"
          value={formatPrice(statistics.commissionAmount) + " VNĐ"}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
            </svg>
          }
          bgColor="bg-purple-100"
          textColor="text-purple-600"
        />
      ) : (
        <StatCard
          title="Doanh thu thực nhận"
          value={formatPrice(statistics.actualSales) + " VNĐ"}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          bgColor="bg-blue-100"
          textColor="text-blue-600"
        />
      )}

      {/* Total Bookings */}
      <StatCard
        title="Tổng đơn đặt phòng"
        value={statistics.totalBookings}
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        }
        bgColor="bg-yellow-100"
        textColor="text-yellow-600"
      />

      {/* Completed Bookings */}
      <StatCard
        title="Đơn hoàn thành"
        value={`${statistics.completedBookings} (${calculateSuccessRate()}%)`}
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        bgColor="bg-green-100"
        textColor="text-green-600"
      />
    </div>
  );
};

export default StatisticsSummaryCards;