// hooks/useBookingFilters.js - Updated version
import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

const useBookingFilters = (user, initialUrl = 'https://localhost:7284/bookings') => {
  // Filter states
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Store original bookings from API
  const allBookingsRef = useRef([]);
  
  // API states
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Build the API URL based on user role
  const getApiUrl = useCallback(() => {
    let url = initialUrl;
    
    if (!user || !user.token) return null;
    
    const userRole = Array.isArray(user.role) ? user.role[0] : user.role;
    const userId = user.id;
    
    // Determine the base endpoint based on user role
    if (userRole === 'Admin') {
      url = `${initialUrl}/all-bookings`;
    } else if (userRole === 'Landlord') {
      url = `${initialUrl}/landlord-s-bookings/${userId}`;
    } else {
      url = `${initialUrl}/user-bookings/${userId}`;
    }
    
    return url;
  }, [initialUrl, user]);

  // Function to fetch bookings from API
  const fetchBookingsFromAPI = useCallback(async () => {
    try {
      setLoading(true);
      
      const url = getApiUrl();
      if (!url) {
        setLoading(false);
        return;
      }
      
      // Build minimal query parameters for API
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('pageSize', 20); // Request more items to accommodate client-side filtering
      
      const fullUrl = `${url}?${params.toString()}`;
      console.log('Fetching from API URL:', fullUrl);
      
      const response = await axios.get(fullUrl, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      
      let fetchedBookings = [];
      if (response.data.data) {
        fetchedBookings = response.data.data;
        if (response.data.totalPages) {
          setTotalPages(response.data.totalPages);
        }
      } else {
        fetchedBookings = response.data;
      }
      
      // Store the complete set of bookings for later filtering
      allBookingsRef.current = fetchedBookings;
      
      // Apply client-side filters
      applyClientSideFilters();
      
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err.message || 'Failed to fetch bookings');
      setLoading(false);
    }
  }, [user, getApiUrl, page]);

  // Apply all filters client-side
  const applyClientSideFilters = useCallback(() => {
    // Start with all bookings from the API response
    let filteredResults = [...allBookingsRef.current];
    
    // Apply booking status filter
    if (statusFilter) {
      filteredResults = filteredResults.filter(
        booking => booking.status === statusFilter
      );
      console.log(`After status filter (${statusFilter}):`, filteredResults.length);
    }
    
    // Apply payment status filter
    if (paymentStatusFilter) {
      filteredResults = filteredResults.filter(
        booking => booking.paymentStatus === paymentStatusFilter
      );
      console.log(`After payment status filter (${paymentStatusFilter}):`, filteredResults.length);
    }
    
    // Apply date filters
    if (startDateFilter) {
      const startDate = new Date(startDateFilter);
      filteredResults = filteredResults.filter(
        booking => new Date(booking.startDate) >= startDate
      );
      console.log(`After start date filter (${startDateFilter}):`, filteredResults.length);
    }
    
    if (endDateFilter) {
      const endDate = new Date(endDateFilter);
      filteredResults = filteredResults.filter(
        booking => new Date(booking.endDate) <= endDate
      );
      console.log(`After end date filter (${endDateFilter}):`, filteredResults.length);
    }
    
    // Apply price filters
    if (minPrice && minPrice !== '') {
      const min = Number(minPrice);
      filteredResults = filteredResults.filter(
        booking => booking.totalPrice >= min
      );
      console.log(`After min price filter (${minPrice}):`, filteredResults.length);
    }
    
    if (maxPrice && maxPrice !== '') {
      const max = Number(maxPrice);
      filteredResults = filteredResults.filter(
        booking => booking.totalPrice <= max
      );
      console.log(`After max price filter (${maxPrice}):`, filteredResults.length);
    }
    
    // Apply search term filter
    if (searchTerm && searchTerm !== '') {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filteredResults = filteredResults.filter(booking => 
        (booking.placeName && booking.placeName.toLowerCase().includes(lowerSearchTerm)) ||
        (booking.placeAddress && booking.placeAddress.toLowerCase().includes(lowerSearchTerm)) ||
        booking.placeId.toString().includes(lowerSearchTerm)
      );
      console.log(`After search filter (${searchTerm}):`, filteredResults.length);
    }
    
    // Update the bookings state with filtered results
    setBookings(filteredResults);
    setLoading(false);
    
  }, [
    statusFilter,
    paymentStatusFilter,
    startDateFilter,
    endDateFilter,
    minPrice,
    maxPrice,
    searchTerm
  ]);

  // Initial data load
  useEffect(() => {
    if (user && user.token) {
      fetchBookingsFromAPI();
    }
  }, [user, fetchBookingsFromAPI]);
  
  // Re-apply filters when filter state changes
  useEffect(() => {
    if (allBookingsRef.current.length > 0) {
      applyClientSideFilters();
    }
  }, [applyClientSideFilters]);
  
  // Re-fetch data when page changes
  useEffect(() => {
    if (user && user.token) {
      fetchBookingsFromAPI();
    }
  }, [page, fetchBookingsFromAPI, user]);
  
  // Function to apply filters - this now just runs the client-side filtering
  const applyFilters = () => {
    setPage(1); // Reset to first page
    applyClientSideFilters();
  };
  
  // Function to reset filters
  const resetFilters = () => {
    setStatusFilter('');
    setPaymentStatusFilter('');
    setStartDateFilter('');
    setEndDateFilter('');
    setMinPrice('');
    setMaxPrice('');
    setSearchTerm('');
    setPage(1);
    
    // Reset to all bookings
    setBookings(allBookingsRef.current);
  };
  
  // Function to handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    // We'll let the effect handle the filtering
  };
  
  // Function to manually refresh data
  const refreshBookings = useCallback(() => {
    fetchBookingsFromAPI();
  }, [fetchBookingsFromAPI]);
  
  return {
    // Filter states
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
    searchTerm,
    setSearchTerm: handleSearch, // Use handleSearch for searchTerm updates
    
    // Pagination
    page,
    setPage,
    totalPages,
    
    // Data
    bookings,
    loading,
    error,
    
    // Actions
    fetchBookings: refreshBookings,
    applyFilters,
    resetFilters
  };
};

export default useBookingFilters;