import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_URL } from "../../constant/config";
// Tạo Context
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
  
      if (storedUser) {
        setUser(storedUser);
      }
  
      if (token) {
        await fetchUserProfile(); 
      }
  
      setLoading(false); 
    };
  
    initializeUser();
  }, []);

  async function fetchUserProfile() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(`${API_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status !== 200) {
        console.error("Lỗi khi lấy dữ liệu user:", response.statusText);
        return;
      }

      //console.log("Dữ liệu từ API:", response.data.data);

      const profileData = response.data.data;
      //console.log("API fields:", Object.keys(profileData));

      const updatedUser = {
        token: token,
        id : profileData.id,
        fullName: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        address: profileData.add,
        birthday: profileData.birthday,
        gender: profileData.gender,
        avatarUrl: profileData.avatar,
        bio: profileData.bio,
        identityCard: profileData.identityCard,
        role: profileData.role,
        createAt: profileData.createAt,
        passwordChangeAt: profileData.passwordChangeAt,
        twoFactor: profileData.twoFactor,
      };

      //console.log("Dữ liệu user sau khi cập nhật:", updatedUser);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Lỗi lấy dữ liệu user:", error);
    }
  }

  const login = async (userData) => {
    localStorage.setItem("token", userData.token);
    console.log("Two factor:", userData.twoFactor);
    await fetchUserProfile();
    
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    window.location.href = "/login";
  };

  const isAdmin = () => user?.role.includes('Admin');
  const isLandlord = () => user?.role.includes('Landlord');
  const hasRole = (role) => user?.role === role;
  const hasAnyRole = (roles) => roles.includes(user?.role);

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, login, logout, fetchUserProfile, isAdmin, isLandlord, hasRole, hasAnyRole }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
