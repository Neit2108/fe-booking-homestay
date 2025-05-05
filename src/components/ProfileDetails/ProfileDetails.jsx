import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { API_URL } from "../../../constant/config";

function ProfileDetails() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birthday: "",
    gender: "1",
    identityCard: "",
    address: "",
    description: "",
  });

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      // console.log("Available user fields:", Object.keys(user));
      // console.log("User object:", user);

      setFormData({
        name: user.fullName || "",
        phone: user.phone || "",
        identityCard: user.identityCard || "",
        birthday: user.birthday ? user.birthday.split("T")[0] : "2024-01-01",
        gender:
          user.gender !== null && user.gender !== undefined
            ? user.gender.toString()
            : "Nam",
        address: user.address || "",
        description: user.bio || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field ${name} updated with:`, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const requestBody = {
        fullName: formData.name,
        phoneNumber: formData.phone,
        address: formData.address,
        birthDate: new Date(formData.birthday).toISOString(),
        gender: formData.gender,
        bio: formData.description,
        identityCard: formData.identityCard,
      };
      console.log("Request body:", requestBody);
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/user/update-profile`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const updatedProfile = response.data.data;
        setUser((prevUser) => {
          const updatedUser = {
            ...prevUser, 
            fullName: updatedProfile.name,
            email: updatedProfile.email,
            phone: updatedProfile.phone,
            address: updatedProfile.add,
            birthday: updatedProfile.birthday,
            gender: updatedProfile.gender,
            bio: updatedProfile.bio,
            identityCard: updatedProfile.identityCard,
            token: localStorage.getItem("token"), // Giữ nguyên token từ localStorage
          };
          console.log("Updated user data:", updatedUser);

          localStorage.setItem("user", JSON.stringify(updatedUser));
          return updatedUser;
        });
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật hồ sơ:", error);
      alert("Lỗi kết nối đến máy chủ.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-primary mb-4">
        Thông tin cá nhân
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Họ và tên
          </label>
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Số điện thoại
          </label>
          <input
            type="tel"
            name="phone"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sinh nhật
          </label>
          <input
            type="date"
            name="birthday"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            value={formData.birthday}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Giới tính
          </label>
          <select
            name="gender"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Số CCCD/CMT
          </label>
          <input
            type="text"
            name="identityCard"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            value={formData.identityCard}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Địa chỉ
          </label>
          <input
            type="text"
            name="address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            value={formData.address || "dungtien"}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mô tả
        </label>
        <textarea
          name="description"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          rows="4"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSaveProfile}
          className="px-6 py-2 bg-accent text-white rounded-md hover:bg-blue-700 transition-colors duration-200 mr-3"
        >
          Lưu
        </button>

        {/* <button
          onClick={() => {
            fetchUserProfile();
            console.log("Manual profile refresh triggered");
          }}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200"
        >
          Refresh Profile Data
        </button> */}
      </div>
    </div>
  );
}

export default ProfileDetails;
