// hooks/useBookings.js
import { useState, useEffect } from "react";
import axios from "axios";

const useBookings = (user, statusFilter, startDateFilter, endDateFilter) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roleToUse, setRoleToUse] = useState("customer");

  // Hàm lấy danh sách booking
  const fetchBookings = async () => {
    if (!user?.id || !user?.token) {
      setError("Người dùng chưa đăng nhập hoặc không có token.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Xác định vai trò
    const roles = Array.isArray(user.role) ? user.role : [user.role];
    let newRoleToUse = "customer";
    if (roles.includes("Admin")) {
      newRoleToUse = "admin";
    } else if (roles.includes("Landlord")) {
      newRoleToUse = "landlord";
    }
    setRoleToUse(newRoleToUse);

    let endpoint = "";
    const params = {};
    if (statusFilter) params.status = statusFilter;
    if (startDateFilter) params.startDate = startDateFilter;
    if (endDateFilter) params.endDate = endDateFilter;

    if (newRoleToUse === "customer") {
      endpoint = `https://localhost:7284/bookings/user-bookings/${user.id}`;
    } else if (newRoleToUse === "admin") {
      endpoint = `https://localhost:7284/bookings/all-bookings`;
    } else if (newRoleToUse === "landlord") {
      endpoint = `https://localhost:7284/bookings/landlord-s-bookings/${user.id}`;
    }

    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params,
      });
      setBookings(response.data.data || response.data);
    } catch (err) {
      setError("Không thể tải danh sách đặt phòng.");
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  // Gọi fetchBookings khi hook được sử dụng hoặc khi các tham số thay đổi
  useEffect(() => {
    fetchBookings();
  }, [user, statusFilter, startDateFilter, endDateFilter]);

  // Hàm làm mới danh sách booking
  const refreshBookings = () => {
    fetchBookings();
  };

  return { bookings, loading, error, role: roleToUse, refreshBookings };
};

export default useBookings;