// src/hooks/useAuth.js
import { useContext, useMemo } from 'react';
import { UserContext } from '../context/UserContext';

/**
 * Custom hook for handling authentication and authorization
 * Provides convenient methods for checking user roles and auth status
 */
export const useAuth = () => {
  const { user, loading, login, logout, error } = useContext(UserContext);

  // Memoize the derived values to prevent unnecessary recalculations
  const authValues = useMemo(() => {
    const isAuthenticated = !!user?.token;
    
    // Normalize roles to always be an array
    const roles = user?.role 
      ? (Array.isArray(user.role) ? user.role : [user.role]) 
      : [];
    
    // Check if the user has a specific role
    const hasRole = (role) => roles.includes(role);
    
    // Common role checks
    const isAdmin = hasRole('Admin');
    const isLandlord = hasRole('Landlord');
    const isTenant = hasRole('Tenant');
    
    // Check if user has at least one of the provided roles
    const hasAnyRole = (...rolesToCheck) => 
      rolesToCheck.some(role => hasRole(role));
    
    // Check if user has all of the provided roles
    const hasAllRoles = (...rolesToCheck) => 
      rolesToCheck.every(role => hasRole(role));
    
    // Get appropriate dashboard route based on role
    const getDashboardRoute = () => {
      if (isAdmin) return '/admin-booking-dashboard';
      if (isLandlord) return '/landlord-booking-dashboard';
      return '/user-booking-dashboard';
    };

    // Check if UI element should be visible based on role requirements
    const canView = (requiredRoles, anyRole = true) => {
      if (!isAuthenticated) return false;
      if (!requiredRoles) return true;
      
      const roleList = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
      return anyRole ? hasAnyRole(...roleList) : hasAllRoles(...roleList);
    };

    // Get appropriate menu items based on user roles
    const getAuthorizedMenuItems = (menuItems) => {
      if (!isAuthenticated) return [];
      
      return menuItems.filter(item => {
        // If no required roles specified, show to all authenticated users
        if (!item.requiredRoles) return true;
        
        // If required roles specified, check against user roles
        const requiredRoles = Array.isArray(item.requiredRoles) 
          ? item.requiredRoles 
          : [item.requiredRoles];
          
        return hasAnyRole(...requiredRoles);
      });
    };

    return {
      user,
      loading,
      error,
      isAuthenticated,
      roles,
      hasRole,
      isAdmin,
      isLandlord,
      isTenant,
      hasAnyRole,
      hasAllRoles,
      getDashboardRoute,
      canView,
      getAuthorizedMenuItems,
      login,
      logout
    };
  }, [user, loading, login, logout, error]);

  return authValues;
};