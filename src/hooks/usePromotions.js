// src/hooks/usePromotions.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../../constant/config';

/**
 * Custom hook for managing promotions
 * @param {Object} options Configuration options
 * @param {string} options.promotionType Filter promotions by type (Global/Personal)
 * @param {boolean} options.active Only return active promotions
 * @param {number} options.limit Limit number of promotions returned
 * @returns {Object} Promotions data and methods
 */
const usePromotions = (options = {}) => {
  const [promotions, setPromotions] = useState([]);
  const [featuredPromotions, setFeaturedPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  // Convert options object to a string for dependency comparison
  const optionsString = JSON.stringify(options);
  
  // Fetch promotions from API
  const fetchPromotions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch promotions from API
      const response = await axios.get(`${API_URL}/promotions/all-promotions`);
      let fetchedPromotions = response.data;
      
      // Format promotions from API to match the expected structure
      const formattedPromotions = fetchedPromotions.map(promo => ({
        id: promo.voucherId || promo.id, // Using voucher ID as promotion ID
        title: promo.title,
        name: promo.name,
        description: promo.description,
        startDate: new Date(promo.startDate).toLocaleDateString('vi-VN'),
        endDate: new Date(promo.endDate).toLocaleDateString('vi-VN'),
        expiry: new Date(promo.endDate).toLocaleDateString('vi-VN'),
        image: promo.image,
        promotionType: promo.promotionType,
        // Additional fields to match existing structure
        featured: true, // You can determine this based on certain criteria if needed
        active: new Date() <= new Date(promo.endDate), // Check if promotion is still active
        category: getCategoryFromPromotion(promo), // Map to category based on some logic
        discount: getDiscountFromPromotion(promo),
        code: getCodeFromPromotion(promo),
        locations: promo.promotionType === 'Personal' && promo.place ? 
          promo.place.map(place => place.name) : ['Tất cả địa điểm']
      }));
      
      // Apply filters based on options
      let filteredPromotions = [...formattedPromotions];
      
      // Filter by promotion type if specified
      if (options.promotionType) {
        filteredPromotions = filteredPromotions.filter(
          promo => promo.promotionType === options.promotionType
        );
      }
      
      // Filter by active status if specified
      if (options.active) {
        filteredPromotions = filteredPromotions.filter(promo => promo.active);
      }
      
      // Apply limit if specified
      if (options.limit && options.limit > 0) {
        filteredPromotions = filteredPromotions.slice(0, options.limit);
      }
      
      // Set featured promotions (for example, the first 3 active promotions)
      const codes = ["SUMMER2025", "GROUP2025", "LONGSTAY"];
      const featured = filteredPromotions
        .filter(promo => promo.active && codes.includes(promo.code))
        .slice(0, 3);
      
      setPromotions(filteredPromotions);
      setFeaturedPromotions(featured);
      setLoading(false);
      console.log(filteredPromotions);
    } catch (err) {
      console.error('Error fetching promotions:', err);
      setError('Failed to load promotions. Please try again later.');
      setLoading(false);
    }
  }, [API_URL, optionsString]); // Use stringified options in the dependency array

  // Fetch promotions only once on mount and when options change
  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);
  
  /**
   * Helper function to determine category from promotion
   * @param {Object} promotion Promotion object from API
   * @returns {string} Category name
   */
  const getCategoryFromPromotion = (promotion) => {
    // You can implement custom logic to determine category
    // For example, based on title keywords or description
    const title = promotion.title?.toLowerCase() || '';
    const description = promotion.description?.toLowerCase() || '';
    
    if (title.includes('lễ') || description.includes('lễ')) {
      return 'holiday';
    } else if (title.includes('nhóm') || description.includes('nhóm')) {
      return 'group';
    } else if (title.includes('mùa') || description.includes('mùa')) {
      return 'seasonal';
    } else if (title.includes('dài') || description.includes('dài')) {
      return 'duration';
    }
    
    // Default category
    return 'seasonal';
  };
  
  /**
   * Helper function to extract discount information from promotion
   * @param {Object} promotion Promotion object from API
   * @returns {string} Formatted discount string
   */
  const getDiscountFromPromotion = (promotion) => {
    return promotion.discount;
  };
  
  /**
   * Helper function to extract voucher code from promotion
   * @param {Object} promotion Promotion object from API
   * @returns {string} Voucher code
   */
  const getCodeFromPromotion = (promotion) => {
    // This would depend on your voucher structure
    // For now, we'll return a placeholder based on the promotion name
    // In a real app, you would extract this from the voucher
    return promotion.voucherCode;
  };

  /**
   * Apply a promotion code
   * @param {string} code The promotion code to apply
   * @param {Object} bookingDetails Booking details to validate against
   * @returns {Promise<Object>} Result of applying the promotion
   */
  const applyPromotionCode = async (code, bookingDetails) => {
    try {
      // In a real app, this would be an API call
      // const response = await axios.post(`${API_URL}/promotions/apply`, { code, bookingDetails });
      // return response.data;
      
      // For now, simulate validation logic using our local promotions
      const promotion = promotions.find(
        p => p.code && p.code.toUpperCase() === code.toUpperCase() && p.active
      );

      if (!promotion) {
        return {
          success: false,
          message: 'Mã khuyến mãi không hợp lệ hoặc đã hết hạn.'
        };
      }

      // Simulate successful application
      return {
        success: true,
        message: 'Áp dụng mã khuyến mãi thành công!',
        discountAmount: parseFloat(promotion.discount) || 10,
        discountType: promotion.discount.includes('%') ? 'percentage' : 'fixed',
        promotion
      };
    } catch (err) {
      console.error('Error applying promotion code:', err);
      throw new Error('Không thể áp dụng mã khuyến mãi. Vui lòng thử lại sau.');
    }
  };

  /**
   * Check if a promotion is valid for a specific booking
   * @param {number} promotionId Promotion ID to validate
   * @param {Object} bookingDetails Booking details to validate against
   * @returns {Promise<boolean>} Whether the promotion is valid
   */
  const validatePromotion = async (promotionId, bookingDetails) => {
    try {
      // In a real app, this would be an API call
      // const response = await axios.post(`${API_URL}/promotions/validate`, { 
      //   promotionId, 
      //   bookingDetails 
      // });
      // return response.data.valid;
      
      // For now, simulate validation logic
      const promotion = promotions.find(p => p.id === promotionId);
      
      if (!promotion || !promotion.active) {
        return false;
      }
      
      // Simple validation logic
      const now = new Date();
      const expiryDate = new Date(promotion.endDate);
      const startDate = new Date(promotion.startDate);
      
      // Check promotion dates
      if (now > expiryDate || now < startDate) {
        return false;
      }
      
      // Check location if applicable
      if (
        promotion.locations.length > 0 && 
        promotion.locations[0] !== "Tất cả địa điểm" &&
        bookingDetails.location &&
        !promotion.locations.includes(bookingDetails.location)
      ) {
        return false;
      }
      
      return true;
    } catch (err) {
      console.error('Error validating promotion:', err);
      return false;
    }
  };

  return {
    promotions,
    featuredPromotions,
    loading,
    error,
    fetchPromotions,
    applyPromotionCode,
    validatePromotion
  };
};

export default usePromotions;