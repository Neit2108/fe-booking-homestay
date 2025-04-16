import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import Loader from "../../components/Loading/Loader";
import BookingList from "../../components/BookingList/BookingList";
import useBookings from "../../hooks/useBookings";

const UserBookingDashboard = () => {
  const { user, loading: contextLoading } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const { bookings, loading, refreshBookings } = useBookings(
    user,
    statusFilter,
    startDateFilter,
    endDateFilter
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDateFilter(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDateFilter(e.target.value);
  };

  const handleEdit = (booking) => {
    console.log("Edit booking:", booking);
  };

  const handleDelete = (booking) => {
    console.log("Delete booking:", booking);
  };

  if (contextLoading || loading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen bg-neutral-100 max-sm:flex-col">
      <Sidebar activePage="dashboard" />
      <div className="flex-1 pt-8 pr-6 pb-6 pl-11 max-md:px-4 max-md:py-6 max-sm:p-4 md:ml-80">
        <DashboardHeader />
        <div className="mb-6 text-2xl font-bold text-accent">
          User Dashboard
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
          <div className="flex gap-4 items-center max-sm:justify-between max-sm:w-full">
            <select
              value={statusFilter}
              onChange={handleStatusChange}
              className="px-3 py-2 bg-white rounded-lg border border-gray-300 text-neutral-700"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
            {/* Giữ nguyên phần sort, saved search, và filter icon */}
          </div>
          <input
            type="date"
            value={startDateFilter}
            onChange={handleStartDateChange}
            className="px-3 py-2 bg-white rounded-lg border border-gray-300 text-neutral-700"
          />
          {/* Input lọc theo ngày đi */}
          <input
            type="date"
            value={endDateFilter}
            onChange={handleEndDateChange}
            className="px-3 py-2 bg-white rounded-lg border border-gray-300 text-neutral-700"
          />
        </div>
        <BookingList
          bookings={bookings}
          searchTerm={searchTerm}
          refreshBookings={refreshBookings}
        />
      </div>
    </div>
  );
};

export default UserBookingDashboard;
