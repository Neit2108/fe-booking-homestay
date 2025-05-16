// src/pages/Statistics/components/RevenueChart.jsx
import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { formatPrice } from '../../Utils/PriceUtils';

const RevenueChart = ({ revenueByMonth }) => {
  // Process data for chart
  const chartData = useMemo(() => {
    if (!revenueByMonth || Object.keys(revenueByMonth).length === 0) {
      return [];
    }

    // Sort the months chronologically
    return Object.entries(revenueByMonth)
      .map(([month, revenue]) => {
        // Parse the month from format 'YYYY-MM'
        const [year, monthNum] = month.split('-');
        
        // Create a date for sorting (set to 1st day of month)
        const date = new Date(parseInt(year), parseInt(monthNum) - 1, 1);
        
        // Format month name for display
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthNamesVi = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
        const displayName = `${monthNamesVi[date.getMonth()]} / ${year}`;
        
        return {
          month: displayName,
          originalMonth: month, // Keep the original format for reference
          revenue,
          date // For sorting
        };
      })
      .sort((a, b) => a.date - b.date);
  }, [revenueByMonth]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
          <p className="font-medium text-gray-700">{label}</p>
          <p className="text-accent">
            {`Doanh thu: ${formatPrice(payload[0].value)} VNĐ`}
          </p>
        </div>
      );
    }
    return null;
  };

  // If no data available
  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Doanh thu theo tháng</h2>
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500">Không có dữ liệu doanh thu theo tháng</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Doanh thu theo tháng</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis 
              tickFormatter={(value) => formatPrice(value, 0)}
              width={100}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              name="Doanh thu" 
              dataKey="revenue" 
              fill="#4182F9"
              radius={[4, 4, 0, 0]}
              barSize={40}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;