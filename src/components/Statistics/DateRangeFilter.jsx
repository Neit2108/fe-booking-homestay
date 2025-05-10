// src/pages/Statistics/components/DateRangeFilter.jsx
import React, { useState, useRef, useEffect } from 'react';
import { formatDate } from '../../Utils/DateUtils'; 

const DateRangeFilter = ({ dateRange, onDateRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Predefined date ranges
  const predefinedRanges = [
    { label: '7 ngày qua', getValue: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 7);
      return { startDate: start, endDate: end };
    }},
    { label: '30 ngày qua', getValue: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 30);
      return { startDate: start, endDate: end };
    }},
    { label: '90 ngày qua', getValue: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 90);
      return { startDate: start, endDate: end };
    }},
    { label: 'Năm nay', getValue: () => {
      const end = new Date();
      const start = new Date(end.getFullYear(), 0, 1);
      return { startDate: start, endDate: end };
    }},
    { label: 'Tháng trước', getValue: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      return { startDate: start, endDate: end };
    }},
    { label: 'Tháng này', getValue: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date();
      return { startDate: start, endDate: end };
    }},
  ];

  // Format selected date range for display
  const formatDateRange = () => {
    const { startDate, endDate } = dateRange;
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle applying custom date range
  const handleApplyCustomRange = () => {
    setIsOpen(false);
  };

  // Handle predefined range selection
  const handleSelectRange = (range) => {
    onDateRangeChange(range.getValue());
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
      >
        <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {formatDateRange()}
        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Phạm vi thời gian</h3>
            
            {/* Predefined ranges */}
            <div className="space-y-2 mb-4">
              {predefinedRanges.map((range, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectRange(range)}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors text-sm"
                >
                  {range.label}
                </button>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Tùy chỉnh phạm vi</h3>
              
              {/* Custom date range */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Từ ngày</label>
                  <input
                    type="date"
                    value={dateRange.startDate.toISOString().split('T')[0]}
                    onChange={(e) => onDateRangeChange({
                      ...dateRange,
                      startDate: new Date(e.target.value)
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Đến ngày</label>
                  <input
                    type="date"
                    value={dateRange.endDate.toISOString().split('T')[0]}
                    onChange={(e) => onDateRangeChange({
                      ...dateRange,
                      endDate: new Date(e.target.value)
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
              
              <button
                onClick={handleApplyCustomRange}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;