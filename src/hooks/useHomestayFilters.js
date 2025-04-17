import { useState, useEffect } from 'react';

/**
 * Custom hook for filtering homestay data
 * @param {Array} places - Array of homestay data objects
 * @returns {Object} Filter state and filtered data
 */
export const useHomestayFilters = (places = []) => {
  // Filter criteria state
  const [filterBy, setFilterBy] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
    maxGuests: ''
  });

  // State for filtered places
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  // Apply filters whenever places or filterBy changes
  useEffect(() => {
    if (!places || places.length === 0) {
      setFilteredPlaces([]);
      return;
    }

    let results = [...places];

    // Apply search filter
    if (filterBy.search) {
      const searchLower = filterBy.search.toLowerCase();
      results = results.filter(
        place => place.name?.toLowerCase().includes(searchLower) || 
                place.description?.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filterBy.category) {
      results = results.filter(
        place => place.category?.toLowerCase() === filterBy.category.toLowerCase()
      );
    }

    // Apply min price filter
    if (filterBy.minPrice && !isNaN(parseFloat(filterBy.minPrice))) {
      const minPrice = parseFloat(filterBy.minPrice);
      results = results.filter(place => (place.price || 0) >= minPrice);
    }

    // Apply max price filter
    if (filterBy.maxPrice && !isNaN(parseFloat(filterBy.maxPrice))) {
      const maxPrice = parseFloat(filterBy.maxPrice);
      results = results.filter(place => (place.price || 0) <= maxPrice);
    }

    // Apply min rating filter
    if (filterBy.minRating && !isNaN(parseFloat(filterBy.minRating))) {
      const minRating = parseFloat(filterBy.minRating);
      results = results.filter(place => (place.rating || 0) >= minRating);
    }

    // Apply max guests filter
    if (filterBy.maxGuests && !isNaN(parseInt(filterBy.maxGuests))) {
      const maxGuests = parseInt(filterBy.maxGuests);
      results = results.filter(place => (place.maxGuests || 0) >= maxGuests);
    }

    setFilteredPlaces(results);
  }, [places, filterBy]);

  // Reset all filters
  const resetFilters = () => {
    setFilterBy({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
      maxGuests: ''
    });
  };

  return {
    filterBy,
    setFilterBy,
    filteredPlaces,
    resetFilters
  };
};