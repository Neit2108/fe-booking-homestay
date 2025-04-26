// src/navigation/routes.js - Centralized route definitions
export const routes = [
    { path: '/', label: 'Trang chủ', public: true },
    { path: '/homestay-recommend', label: 'Homestays', public: true },
    { path: '/rooms', label: 'Phòng', public: true },
    { path: '/about', label: 'Giới Thiệu', public: true },
    { path: '/contact', label: 'Liên Hệ', public: true },
    
    // Admin routes
    { 
      path: '/admin-booking-dashboard', 
      label: 'Admin Dashboard', 
      roles: ['Admin'], 
      icon: 'dashboardIcon' 
    },
    
    // Landlord routes
    { 
      path: '/landlord-booking-dashboard', 
      label: 'Quản lý đặt phòng', 
      roles: ['Landlord'], 
      icon: 'bookingIcon' 
    },
    { 
      path: '/homestay-management', 
      label: 'Quản lý Homestay', 
      roles: ['Landlord', 'Admin'], 
      icon: 'homestayIcon' 
    },
    
    // User routes
    { 
      path: '/user-booking-dashboard', 
      label: 'Đặt phòng của tôi', 
      roles: ['User'], 
      icon: 'bookingUserIcon' 
    },
    { 
      path: '/profile', 
      label: 'Tài khoản', 
      roles: ['User', 'Admin', 'Landlord'], 
      icon: 'userIcon' 
    },
  ];
  
  // Helper to get routes by role
  export const getRoutesByRole = (userRoles = []) => {
    if (!userRoles || userRoles.length === 0) {
      return routes.filter(route => route.public);
    }
    
    return routes.filter(route => 
      route.public || 
      !route.roles || 
      route.roles.some(role => userRoles.includes(role))
    );
  };
  
  // Helper to get dashboard route based on role
  export const getDashboardRoute = (userRoles = []) => {
    if (userRoles.includes('Admin')) return '/admin-booking-dashboard';
    if (userRoles.includes('Landlord')) return '/landlord-booking-dashboard';
    return '/user-booking-dashboard';
  };