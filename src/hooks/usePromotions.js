// src/hooks/usePromotions.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

/**
 * Custom hook for managing promotions
 * @param {Object} options Configuration options
 * @param {string} options.category Filter promotions by category
 * @param {boolean} options.active Only return active promotions
 * @param {number} options.limit Limit number of promotions returned
 * @returns {Object} Promotions data and methods
 */
const usePromotions = (options = {}) => {
  const [promotions, setPromotions] = useState([]);
  const [featuredPromotions, setFeaturedPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For now, use dummy data until API integration
  const dummyPromotions = [
    {
      id: 1,
      title: "Khuyến mãi tháng 5",
      subtitle: "Chào hè cùng HomiesStay",
      description: "Giảm đến 30% cho tất cả các đặt phòng từ 15/5 đến 30/5, áp dụng cho homestay tại các thành phố biển.",
      code: "SUMMER2025",
      discount: "30%",
      expiry: "30/05/2025",
      startDate: "15/05/2025",
      category: "seasonal",
      featured: true,
      active: true,
      image: "/path/to/summer-promotion.jpg",
      bgColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
      locations: ["Đà Nẵng", "Nha Trang", "Phú Quốc"]
    },
    {
      id: 2,
      title: "Ưu đãi nhóm",
      subtitle: "Đi cùng bạn bè, tiết kiệm hơn",
      description: "Đặt phòng cho nhóm từ 6 người trở lên, nhận ngay ưu đãi 15% tổng hóa đơn và dịch vụ đưa đón miễn phí.",
      code: "GROUP2025",
      discount: "15%",
      expiry: "31/12/2025",
      startDate: "01/01/2025",
      category: "group",
      featured: true,
      active: true,
      image: "/path/to/group-promotion.jpg",
      bgColor: "bg-gradient-to-r from-amber-500 to-pink-500",
      locations: ["Tất cả địa điểm"]
    },
    {
      id: 3,
      title: "Kỳ nghỉ dài hạn",
      subtitle: "Ở lâu, giá càng tốt",
      description: "Đặt phòng từ 7 đêm trở lên, tự động được giảm 25% tổng hóa đơn và nâng cấp loại phòng miễn phí nếu còn trống.",
      code: "LONGSTAY",
      discount: "25%",
      expiry: "31/12/2025",
      startDate: "01/01/2025",
      category: "duration",
      featured: true,
      active: true,
      image: "/path/to/longstay-promotion.jpg",
      bgColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
      locations: ["Tất cả địa điểm"]
    },
    {
      id: 4,
      title: "Kỳ nghỉ lễ 30/4 - 1/5",
      description: "Ưu đãi đặc biệt cho kỳ nghỉ lễ với nhiều quà tặng hấp dẫn và dịch vụ cao cấp.",
      discount: "20%",
      expiry: "01/05/2025",
      startDate: "15/04/2025",
      category: "holiday",
      featured: false,
      active: true,
      image: "/path/to/holiday-1.jpg",
      bgColor: "bg-red-600",
      locations: ["Đà Nẵng", "Nha Trang", "Phú Quốc"]
    },
    {
      id: 5,
      title: "Nghỉ hè sôi động",
      description: "Khám phá những điểm du lịch hot nhất mùa hè với ưu đãi dành riêng cho gia đình.",
      discount: "15%",
      expiry: "31/08/2025",
      startDate: "01/06/2025",
      category: "seasonal",
      featured: false,
      active: true,
      image: "/path/to/holiday-2.jpg",
      bgColor: "bg-blue-600",
      locations: ["Đà Lạt", "Hạ Long", "Sapa"]
    },
    {
      id: 6,
      title: "Nghỉ lễ Quốc Khánh",
      description: "Đặt trước cho kỳ nghỉ lễ Quốc Khánh và nhận ưu đãi độc quyền cùng dịch vụ VIP.",
      discount: "25%",
      expiry: "02/09/2025",
      startDate: "15/08/2025",
      category: "holiday",
      featured: false,
      active: true,
      image: "/path/to/holiday-3.jpg",
      bgColor: "bg-green-600",
      locations: ["TP. Hồ Chí Minh", "Hà Nội", "Huế"]
    }
  ];

  // Fetch promotions
  const fetchPromotions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // For now, use dummy data
      // Later, this will be replaced with actual API calls:
      // const response = await axios.get('/api/promotions', { params: options });
      // const data = response.data;

      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Filter dummy data based on options
      let filteredPromotions = [...dummyPromotions];

      if (options.category) {
        filteredPromotions = filteredPromotions.filter(
          promo => promo.category === options.category
        );
      }

      if (options.active) {
        filteredPromotions = filteredPromotions.filter(promo => promo.active);
      }

      if (options.limit) {
        filteredPromotions = filteredPromotions.slice(0, options.limit);
      }

      // Set featured promotions
      const featured = filteredPromotions.filter(promo => promo.featured);

      setPromotions(filteredPromotions);
      setFeaturedPromotions(featured);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching promotions:', err);
      setError('Failed to load promotions. Please try again later.');
      setLoading(false);
    }
  }, [options]);

  // Fetch promotions on mount and when options change
  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  /**
   * Apply a promotion code
   * @param {string} code The promotion code to apply
   * @param {Object} bookingDetails Booking details to validate against
   * @returns {Promise<Object>} Result of applying the promotion
   */
  const applyPromotionCode = async (code, bookingDetails) => {
    try {
      // This will be an API call in the future
      // const response = await axios.post('/api/promotions/apply', { code, bookingDetails });
      // return response.data;

      // For now, simulate validation logic:
      const promotion = dummyPromotions.find(
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
      // This will be an API call in the future
      // const response = await axios.post('/api/promotions/validate', { 
      //   promotionId, 
      //   bookingDetails 
      // });
      // return response.data.valid;

      // For now, simulate validation logic:
      const promotion = dummyPromotions.find(p => p.id === promotionId);
      
      if (!promotion || !promotion.active) {
        return false;
      }
      
      // Simple validation logic - in real app this would be more complex
      const now = new Date();
      const expiryDate = parseDate(promotion.expiry);
      const startDate = parseDate(promotion.startDate);
      
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

  // Helper function to parse date strings
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day);
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