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

      const updatedUser = {
        token: token,
        fullName: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        address: profileData.address,
        birthday: profileData.birthday,
        gender: profileData.gender,
        avatarUrl: profileData.avatar,
        bio: profileData.bio,
      };

      console.log("Dữ liệu user sau khi cập nhật:", updatedUser);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Lỗi lấy dữ liệu user:", error);
    }
  }

  const login = async (userData) => {
    localStorage.setItem("token", userData.token);
    await fetchUserProfile();
    
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    window.location.href = "/login";
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
