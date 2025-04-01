import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

// Tạo Context
const UserContext = createContext();

// Provider Component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Khi ứng dụng khởi động, kiểm tra xem token có trong localStorage không
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  // Add this effect to log user changes
  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  const fetchUserProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get("https://localhost:7284/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.status !== 200) {
        console.error("Lỗi khi lấy dữ liệu user:", response.statusText);
        return;
      }
      
      console.log("Dữ liệu từ API profile:", response.data.data);

      // Update user state và localStorage với dữ liệu kết hợp
      setUser(prevUser => {
        // Ensure prevUser exists (use empty object if null)
        const currentUser = prevUser || {};
        
        const updatedUser = {
          ...currentUser, // Giữ nguyên dữ liệu từ login
          fullName: response.data.data.name || currentUser.fullName, 
          email: response.data.data.email,
          phone: response.data.data.phone,
          address: response.data.data.add,
          birthday: response.data.data.birthday,
          gender: response.data.data.gender,
          avatarUrl: response.data.data.avatar || currentUser.avatarUrl,
          bio: response.data.data.bio,
        };
        
        // Cập nhật localStorage với dữ liệu kết hợp
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      });
      
      // Don't log here - it will show the old state
    } catch (error) {
      console.error("Lỗi lấy dữ liệu user:", error);
    }
  }, []);

  const login = async (userData) => {
    // Lưu dữ liệu đăng nhập
    setUser(userData);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));

    // Lấy thêm dữ liệu profile và cập nhật
    await fetchUserProfile();
    
    // This log will NOT show the updated state, since state updates are async
    console.log("Đã gọi login và fetchUserProfile - hãy kiểm tra log trong useEffect");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout, fetchUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };