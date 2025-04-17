// src/components/HomestayFilters/HomestayFilters.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { IoFilterOutline } from 'react-icons/io5';
import { BiSortAlt2 } from 'react-icons/bi';
import { FaStar, FaMoneyBillWave } from 'react-icons/fa';

/**
 * HomestayFilters component - Provides sorting and filtering options for homestay listings
 */
const HomestayFilters = ({ data, onFilterChange, activeFilter, setActiveFilter, className = '' }) => {
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
      onFilterChange(data); // Reset to original data
    } else {
      // Set new filter
      setActiveFilter(filterId);
      
      // Clone the data
      let filteredData = [...data];
      
      // Apply the appropriate sorting based on the selected filter
      switch (filterId) {
        case 'most-rated':
          // Sort by number of ratings (descending)
          filteredData.sort((a, b) => (b.numOfRating || 0) - (a.numOfRating || 0));
          break;
          
        case 'least-rated':
          // Sort by number of ratings (ascending)
          filteredData.sort((a, b) => (a.numOfRating || 0) - (b.numOfRating || 0));
          break;
          
        case 'highest-rating':
          // Sort by rating value (descending)
          filteredData.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
          
        case 'lowest-rating':
          // Sort by rating value (ascending)
          filteredData.sort((a, b) => (a.rating || 0) - (b.rating || 0));
          break;
          
        case 'price-low-high':
          // Sort by price (ascending)
          filteredData.sort((a, b) => (a.price || 0) - (b.price || 0));
          break;
          
        case 'price-high-low':
          // Sort by price (descending)
          filteredData.sort((a, b) => (b.price || 0) - (a.price || 0));
          break;
          
        default:
          // No valid filter selected
          break;
      }
      
      // Call the callback function with the filtered results
      onFilterChange(filteredData);
    }
  };

  return (
    <div className={`mb-6 ${className}`}>
      {/* <div className="flex items-center gap-2 mb-3">
        <IoFilterOutline className="text-blue-600 text-lg" />
        <h3 className="font-medium text-blue-800">Sort & Filter</h3>
      </div> */}

      {/* Filter Buttons */}
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
        {activeFilter && (
          <button
            onClick={() => {
              setActiveFilter('');
              onFilterChange(data); // Reset to original data
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <BiSortAlt2 />
            <span>Xóa tùy chỉnh</span>
          </button>
        )}
      </div>
    </div>
  );
};

HomestayFilters.propTypes = {
  data: PropTypes.array.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired,
  setActiveFilter: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default HomestayFilters;