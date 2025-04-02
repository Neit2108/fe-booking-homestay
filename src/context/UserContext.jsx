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

  async function fetchUserProfile() {
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

      console.log("Dữ liệu từ API:", response.data.data);

      // Check what fields are actually in the API response
      const profileData = response.data.data;
      console.log("API fields:", Object.keys(profileData));

      setUser((prevUser) => {
        const updatedUser = {
          ...prevUser, // Giữ nguyên dữ liệu từ login
          fullName: profileData.name || prevUser?.fullName,
          email: profileData.email,
          phone: profileData.phone, // This one works correctly
          address: profileData.address || profileData.add, // Try both field names
          birthday: profileData.birthday || profileData.dob, // Try alternate field name
          gender: profileData.gender,
          avatarUrl: profileData.avatar || prevUser?.avatarUrl,
          bio: profileData.bio || profileData.about, // Try alternate field name
          token: localStorage.getItem("token"), // Giữ nguyên token từ localStorage
        };

        // Log what fields we're actually using
        console.log("Updated user data:", updatedUser);

        // Update localStorage with the combined data
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      });
    } catch (error) {
      console.error("Lỗi lấy dữ liệu user:", error);
    }
  }

  const login = async (userData) => {
    // Lưu dữ liệu đăng nhập
    setUser(userData);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));

    // Lấy thêm dữ liệu profile và cập nhật
    await fetchUserProfile();

    // This log will NOT show the updated state, since state updates are async
    console.log(
      "Đã gọi login và fetchUserProfile - hãy kiểm tra log trong useEffect"
    );
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, login, logout, fetchUserProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
