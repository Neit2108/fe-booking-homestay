// pages/Dashboard/AdminBookingDashboard.jsx
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import Loader from "../../components/Loading/Loader";
import BookingList from "../../components/BookingList/BookingList";
import BookingFilters from "../../components/BookingList/BookingFilters";
import useBookingFilters from "../../hooks/useBookingFilters";
import Pagination from "../../components/Pagination/Pagination";

const AdminBookingDashboard = () => {
  const { user, loading: contextLoading } = useContext(UserContext);

  const {
    // Filter states
    statusFilter,
    setStatusFilter,
    paymentStatusFilter,
    setPaymentStatusFilter,
    startDateFilter,
    setStartDateFilter,
    endDateFilter,
    setEndDateFilter,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    searchTerm,
    setSearchTerm,

    page,
    totalPages,
    setPage,

    // Data
    bookings,
    loading,

    // Actions
    fetchBookings,
    applyFilters,
    resetFilters,
  } = useBookingFilters(user);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (contextLoading || loading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen bg-neutral-100 max-sm:flex-col">
      <Sidebar activePage="admin-dashboard" />
      <div className="flex-1 pt-8 pr-6 pb-6 pl-11 max-md:px-4 max-md:py-6 max-sm:p-4 md:ml-80">
        {/* <DashboardHeader /> */}
        <div className="mb-6 text-2xl font-bold text-accent">
          Quản lý đơn đặt
        </div>

        {/* Search Bar */}
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
              <path
                d="M6.68498 2.05365C7.61696 2.05265 8.53068 2.31215 9.32301 2.80287C10.1153 3.29359 10.7548 3.99599 11.1691 4.83081C11.5834 5.66563 11.7562 6.59964 11.6679 7.52743C11.5796 8.45522 11.2337 9.33987 10.6693 10.0815L13.8346 13.2416C13.9543 13.3614 14.0239 13.5223 14.0292 13.6916C14.0345 13.8609 13.9752 14.0259 13.8634 14.1531C13.7515 14.2802 13.5954 14.36 13.4268 14.3763C13.2582 14.3925 13.0897 14.344 12.9556 14.2405L12.8929 14.1852L9.72628 11.0265C9.09545 11.5086 8.35889 11.8335 7.57755 11.9743C6.79622 12.1152 5.99258 12.068 5.23312 11.8366C4.47366 11.6052 3.78022 11.1962 3.21018 10.6436C2.64014 10.091 2.2099 9.4106 1.95504 8.65869C1.70018 7.90677 1.62804 7.10498 1.74459 6.31965C1.86114 5.53432 2.16303 4.78804 2.62527 4.14255C3.08751 3.49706 3.69682 2.97092 4.40278 2.60768C5.10874 2.24443 5.89105 2.05452 6.68498 2.05365ZM6.68636 3.38699C5.7139 3.388 4.78167 3.77527 4.09475 4.46362C3.40783 5.15196 3.02249 6.08499 3.02349 7.05745C3.0245 8.02991 3.41178 8.96214 4.10012 9.64906C4.78847 10.336 5.7215 10.7213 6.69396 10.7203C7.66642 10.7193 8.59865 10.332 9.28557 9.64369C9.97249 8.95534 10.3578 8.02231 10.3568 7.04985C10.3558 6.07739 9.96854 5.14516 9.28019 4.45824C8.59185 3.77132 7.65882 3.38598 6.68636 3.38699Z"
                fill="#404040"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="w-full text-base border-none outline-none text-neutral-700 bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Booking Filters */}
        <BookingFilters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          paymentStatusFilter={paymentStatusFilter}
          setPaymentStatusFilter={setPaymentStatusFilter}
          startDateFilter={startDateFilter}
          setStartDateFilter={setStartDateFilter}
          endDateFilter={endDateFilter}
          setEndDateFilter={setEndDateFilter}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          applyFilters={applyFilters}
          resetFilters={resetFilters}
        />

        {/* Booking List */}
        <BookingList bookings={bookings} refreshBookings={fetchBookings} />

        {bookings.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default AdminBookingDashboard;
