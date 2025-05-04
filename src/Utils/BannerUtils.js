// src/utils/bannerUtils.js

/**
 * Checks if a path exists in the public folder
 * This is a simple utility to determine if we should use real images or CSS fallbacks
 * 
 * @param {string} path - The path to check (relative to public folder)
 * @returns {boolean} - Whether the path exists
 */
export const imageExists = (path) => {
    // In a real app, you might want to use a more robust method
    // For simplicity, we're just checking if the path is defined
    return !!path && typeof path === 'string';
  };
  
  /**
   * Generate Vietnam-themed banner data
   * 
   * @param {boolean} useRealImages - Whether to use real images or CSS-based banners
   * @returns {Array} - Array of banner objects
   */
  export const generateBannerData = (useRealImages = true) => {
    // Check if it's near the April 30th holiday
    const today = new Date();
    const isApril = today.getMonth() === 3; // April is month 3 (0-indexed)
    const isNearHoliday = isApril && today.getDate() >= 25;
    
    return [
      {
        id: 1,
        name: "Vietnamese Flag",
        image: "/images/vietnam-flag.jpg", // Use the first reference image
        overlayClass: "bg-gradient-to-b from-transparent to-black/30",
        animationClass: "animate-gentle-wave",
        label: isNearHoliday 
          ? "Chào mừng ngày Thống nhất đất nước 30/4" 
          : "Cờ Tổ quốc Việt Nam"
      },
      {
        id: 2,
        name: "Ha Long Bay",
        image: "/images/halong-bay.jpg", // Use the second reference image
        overlayClass: "bg-gradient-to-b from-transparent to-black/40",
        animationClass: "animate-gentle-float",
        label: "Vịnh Hạ Long - Di sản thiên nhiên thế giới"
      },
      {
        id: 3,
        name: "Mountain Landscape",
        image: "/images/sapa-mountains.jpg", // Use the third reference image
        overlayClass: "bg-gradient-to-b from-transparent to-black/30",
        animationClass: "animate-gentle-clouds",
        label: "Miền núi Sapa hùng vĩ"
      },
      {
        id: 4,
        name: "Traditional Culture",
        image: "/images/vietnamese-culture.jpg", // Additional image
        overlayClass: "bg-gradient-to-b from-transparent to-black/40",
        animationClass: "animate-gentle-sway",
        label: "Trải nghiệm văn hóa dân tộc"
      }
    ];
  };
  
  export default {
    imageExists,
    generateBannerData
  };