// src/components/HomestayFilters/HomestayFilters.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { IoFilterOutline } from 'react-icons/io5';
import { BiSortAlt2 } from 'react-icons/bi';
import { FaStar, FaMoneyBillWave } from 'react-icons/fa';

/**
 * HomestayFilters component - Provides sorting options for homestay listings
 */
const HomestayFilters = ({ 
  activeFilter, 
  setActiveFilter, 
  className = '',
  compactMode = false 
}) => {
  // Define filter options
  const filterOptions = [
    { id: 'most-rated', label: 'Nhiều đánh giá', icon: <FaStar className="text-yellow-400" /> },
    { id: 'least-rated', label: 'Ít đánh giá', icon: <FaStar className="text-gray-400" /> },
    { id: 'highest-rating', label: 'Đánh giá cao', icon: <FaStar className="text-yellow-400" /> },
    { id: 'lowest-rating', label: 'Đánh giá thấp', icon: <FaStar className="text-gray-400" /> },
    { id: 'price-low-high', label: 'Giá: Thấp - cao', icon: <FaMoneyBillWave className="text-green-500" /> },
    { id: 'price-high-low', label: 'Giá: Cao - thấp', icon: <FaMoneyBillWave className="text-green-700" /> },
  ];

  // Filter selection handler
  const handleFilterSelect = (filterId) => {
    // If clicking the same filter, clear it
    if (activeFilter === filterId) {
      setActiveFilter('');
    } else {
      // Set new filter
      setActiveFilter(filterId);
    }
  };

  // Render a compact view for mobile
  if (compactMode) {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        <select
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value)}
          className="flex-1 py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sắp xếp: Mặc định</option>
          {filterOptions.map(option => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        
        {activeFilter && (
          <button
            onClick={() => setActiveFilter('')}
            className="py-2 px-3 bg-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-300"
          >
            <BiSortAlt2 className="inline mr-1" />
            Xóa
          </button>
        )}
      </div>
    );
  }

  // Full version
  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleFilterSelect(option.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
              activeFilter === option.id
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {option.icon}
            <span>{option.label}</span>
          </button>
        ))}
        
        {/* Clear Filters button - only show when a filter is active */}
        {/* {activeFilter && (
          <button
            onClick={() => setActiveFilter('')}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <BiSortAlt2 />
            <span>Xóa sắp xếp</span>
          </button>
        )} */}
      </div>
    </div>
  );
};

HomestayFilters.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  setActiveFilter: PropTypes.func.isRequired,
  className: PropTypes.string,
  compactMode: PropTypes.bool
};

export default HomestayFilters;