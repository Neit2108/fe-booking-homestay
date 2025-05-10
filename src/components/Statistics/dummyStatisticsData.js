// src/pages/Statistics/dummyStatisticsData.js

/**
 * Dummy data for testing statistics visualization
 * Use this when the API is not available or for development
 */
export const getDummyStatisticsData = (role = 'Landlord') => {
  // Basic data structure that matches the API response
  const baseData = {
    totalRevenue: 45000000,
    actualSales: 36900000,
    commissionAmount: 8100000,
    totalBookings: 42,
    completedBookings: 28,
    cancelledBookings: 5,
    pendingBookings: 4,
    confirmedBookings: 5,
    revenueByMonth: {
      "2025-01": 6500000,
      "2025-02": 8200000,
      "2025-03": 9800000,
      "2025-04": 11500000,
      "2025-05": 9000000
    }
  };

  // Landlord sees their own revenue with commission taken out
  if (role === 'Landlord') {
    return baseData;
  }
  
  // Admin sees all revenue in the system
  if (role === 'Admin') {
    return {
      ...baseData,
      totalRevenue: 125000000,
      actualSales: 125000000, // For admin, actual sales is same as total
      commissionAmount: 22500000,
      totalBookings: 115,
      completedBookings: 78,
      cancelledBookings: 12,
      pendingBookings: 10,
      confirmedBookings: 15,
      revenueByMonth: {
        "2025-01": 18500000,
        "2025-02": 22300000,
        "2025-03": 26800000,
        "2025-04": 31700000,
        "2025-05": 25700000
      }
    };
  }
  
  return baseData;
};

export default getDummyStatisticsData;