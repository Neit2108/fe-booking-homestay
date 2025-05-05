// src/services/authService.js
import axios from 'axios';
import jwtDecode from 'jwt-decode'; // Add this package

const API_URL = 'https://homiesstay.onrender.com';

// Store tokens in memory for better security
let _accessToken = null;
let _refreshToken = null;

export const authService = {
  // Login method
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/Account/Auth/Login`, credentials);
      const { token } = response.data;
      
      if (token) {
        _accessToken = token;
        // Still store in localStorage for persistence, but consider httpOnly cookies if possible
        localStorage.setItem('token', token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Logout method
  logout: () => {
    _accessToken = null;
    _refreshToken = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
  },

  // Get current user data
  getCurrentUser: async () => {
    try {
      const token = _accessToken || localStorage.getItem('token');
      if (!token) return null;
      
      const response = await axios.get(`${API_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return response.data.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  },

  // Check if user has specific role
  hasRole: (user, role) => {
    if (!user || !user.role) return false;
    
    const roles = Array.isArray(user.role) ? user.role : [user.role];
    return roles.includes(role);
  },

  // Check if token is valid
  isAuthenticated: () => {
    const token = _accessToken || localStorage.getItem('token');
    if (!token) return false;
    
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch {
      return false;
    }
  }
};