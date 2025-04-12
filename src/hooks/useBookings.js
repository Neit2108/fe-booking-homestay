// hooks/useBookings.js
import { useState, useEffect } from "react";
import axios from "axios";

const useBookings = (user, statusFilter, startDateFilter, endDateFilter) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roleToUse, setRoleToUse] = useState("user"); // Khai báo roleToUse bằng useState

  useEffect(() => {
    if (!user?.id || !user?.token) return;

    setLoading(true);

    // Xác định vai trò
    const roles = Array.isArray(user.role) ? user.role : [user.role];
    let newRoleToUse = "customer";
    if (roles.includes("Admin")) {
      newRoleToUse = "admin";
    } else if (roles.includes("Landlord")) {
      newRoleToUse = "landlord";
    }
    setRoleToUse(newRoleToUse); // Cập nhật roleToUse

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

    axios
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params,
      })
      .then((response) => {
        setBookings(response.data.data || response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [user, statusFilter, startDateFilter, endDateFilter]);

  return { bookings, loading, error, role: roleToUse }; 
};

export default useBookings;