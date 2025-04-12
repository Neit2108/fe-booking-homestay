import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import Loader from "../../components/Loading/Loader";
import BookingList from "../../components/BookingList/BookingList";
import useBookings from "../../hooks/useBookings";

const AdminBookingDashboard = () => {
  const { user, loading: contextLoading } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const { bookings, loading } = useBookings(user, "admin");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (booking) => {
    // Logic chỉnh sửa booking cho Admin
    console.log("Admin edit booking:", booking);
  };

  const handleDelete = (booking) => {
    // Logic xóa booking cho Admin
    console.log("Admin delete booking:", booking);
  };

  if (contextLoading || loading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen bg-neutral-100 max-sm:flex-col">
      <Sidebar activePage="admin-dashboard" />
      <div className="flex-1 pt-8 pr-6 pb-6 pl-11 max-md:px-4 max-md:py-6 max-sm:p-4 md:ml-80">
        <DashboardHeader />
        <div className="mb-6 text-2xl font-bold text-accent">
          Admin Dashboard
        </div>
        <div className="flex gap-6 items-center mb-6 max-sm:flex-col">
          <div className="flex flex-1 items-center px-5 py-3 bg-white rounded-2xl">
            <svg
              width="16"
              height="16"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-4"
            >
              {/* SVG path giữ nguyên */}
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="w-full text-base border-none outline-none text-neutral-700 bg-transparent"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {/* Giữ nguyên phần sort, saved search, và filter icon */}
        </div>
        <BookingList
          bookings={bookings}
          searchTerm={searchTerm}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AdminBookingDashboard;