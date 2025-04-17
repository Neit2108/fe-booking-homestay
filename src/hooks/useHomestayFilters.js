// src/hooks/useHomestayFilters.js
import { useState } from 'react';

/**
 * A custom hook for filtering homestay listings
 * @param {Array} initialData - The initial data array to filter
 * @returns {Object} Filter state and handlers
 */
const useHomestayFilters = (initialData = []) => {
  const [filteredData, setFilteredData] = useState(initialData);
  const [activeFilter, setActiveFilter] = useState('');

  // Apply a filter to the data
  const applyFilter = (data, filterId) => {
    if (!data || data.length === 0) return [];
    
    // If no filter selected, return original data
    if (!filterId) {
      return [...data];
    }
    
    // Clone the data
    let result = [...data];
    
    // Apply the appropriate sorting based on the selected filter
    switch (filterId) {
      case 'most-rated':
        // Sort by number of ratings (descending)
        result.sort((a, b) => (b.numOfRating || 0) - (a.numOfRating || 0));
        break;
        
      case 'least-rated':
        // Sort by number of ratings (ascending)
        result.sort((a, b) => (a.numOfRating || 0) - (b.numOfRating || 0));
        break;
        
      case 'highest-rating':
        // Sort by rating value (descending)
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
        
      case 'lowest-rating':
        // Sort by rating value (ascending)
        result.sort((a, b) => (a.rating || 0) - (b.rating || 0));
        break;
        
      case 'price-low-high':
        // Sort by price (ascending)
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
        
      case 'price-high-low':
        // Sort by price (descending)
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
        
      default:
        // No valid filter, return original data
        break;
    }
    
    return result;
  };

  // Handler for filter selection
  const handleFilterSelect = (data, filterId) => {
    setActiveFilter(filterId);
    const newFilteredData = applyFilter(data, filterId);
    setFilteredData(newFilteredData);
    return newFilteredData;
  };

  // Clear all filters
  const clearFilters = (data) => {
    setActiveFilter('');
    setFilteredData([...data]);
    return [...data];
  };

  return {
    filteredData,
    activeFilter,
    handleFilterSelect,
    clearFilters,
    setFilteredData
  };
};

export default useHomestayFilters;