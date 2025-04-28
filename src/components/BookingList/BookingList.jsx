// components/BookingList/BookingList.jsx
import React, { useState } from "react";
import { formatDate } from "../../Utils/DateUtils";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Modal from "../Modal/Modal.jsx";
import { formatPrice } from "../../Utils/PriceUtils.js";

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Completed: "bg-blue-100 text-blue-700",
  Paid: "bg-green-100 text-green-700",
  Unpaid: "bg-red-100 text-red-700",
};

const BookingList = ({ bookings, searchTerm, refreshBookings }) => {
  const { user } = useContext(UserContext);
  const token = user?.token || null;
  const navigate = useNavigate();

  const roles = Array.isArray(user.role) ? user.role : [user.role];
  const isAdminOrHost = roles.includes("Admin") || roles.includes("Landlord");

  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
  const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);
  const [isModalRequestCancelSuccessOpen, setIsModalRequestCancelSuccessOpen] =
    useState(false);
  const [isModalRequestCancelErrorOpen, setIsModalRequestCancelErrorOpen] =
    useState(false);

  const filteredBookings = bookings.filter((booking) =>
    booking.placeId.toString().includes(searchTerm.toLowerCase())
  );

  const handleAccept = async (booking) => {
    try {
      // Gửi request tới API để chấp nhận booking
      const response = await axios.put(
        `https://localhost:7284/bookings/accept-booking-request/${booking.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setIsModalSuccessOpen(true);
      console.log("Accept response:", response.data);
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || "Có lỗi xảy ra khi chấp nhận đơn đặt";
        setIsModalErrorOpen(true);
        console.error("Error accepting booking:", error.response.data);
      } else {
        // Lỗi khác (mạng, timeout, v.v.)
        setIsModalErrorOpen(true);
        console.error("Network error:", error);
      }
    }
  };

  const handleReject = async (booking) => {
    try {
      const { value: rejectReason } = await Swal.fire({
        title: "Từ chối đặt phòng",
        input: "text",
        inputLabel: "Vui lòng nhập lý do từ chối",
        inputPlaceholder: "Nhập lý do...",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "Lý do từ chối không được để trống!";
          }
        },
      });

      if (!rejectReason) {
        return;
      }

      // Gửi request tới API để từ chối booking
      const response = await axios.put(
        `https://localhost:7284/bookings/reject-booking-request/${booking.id}`,
        { reason: rejectReason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Xử lý phản hồi thành công
      setIsModalSuccessOpen(true);
      console.log("Reject response:", response.data);
    } catch (error) {
      // Xử lý lỗi
      if (error.response) {
        // Lỗi từ server (4xx, 5xx)
        const errorMessage =
          error.response.data.message || "Có lỗi xảy ra khi từ chối đơn đặt";
        setIsModalErrorOpen(true);
        console.error("Error rejecting booking:", error.response.data);
      } else {
        // Lỗi khác (mạng, timeout, v.v.)
        setIsModalErrorOpen(true);
        console.error("Network error:", error);
      }
    }
  };

  const handleDelete = async (booking) => {
    try {
      const { value: cancelBookingRequest } = await Swal.fire({
        title: "Yêu cầu hủy đặt phòng",
        input: "text",
        inputLabel: "Vui lòng nhập lý do hủy",
        inputPlaceholder: "Nhập lý do...",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "Lý do không được để trống!";
          }
        },
      });

      if (!cancelBookingRequest) {
        return;
      }

      setIsModalRequestCancelSuccessOpen(true);
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || "Có lỗi xảy ra khi chấp nhận đơn đặt";
        setIsModalRequestCancelErrorOpen(true);
        console.error("Error accepting booking:", error.response.data);
      } else {
        // Lỗi khác (mạng, timeout, v.v.)
        setIsModalRequestCancelErrorOpen(true);
        console.error("Network error:", error);
      }
    }
  };

  // Handle payment for confirmed bookings
  const handlePayment = (booking) => {
    // Calculate days from startDate and endDate
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);
    const numberOfDays = Math.ceil(
      (endDate - startDate) / (1000 * 60 * 60 * 24)
    );

    // Add calculated days to the booking object
    const bookingWithDays = {
      ...booking,
      days: numberOfDays,
    };

    // Navigate to payment flow with the booking information
    navigate("/payment", {
      state: {
        booking: bookingWithDays,
      },
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredBookings.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Không có booking nào để hiển thị
        </div>
      ) : (
        filteredBookings.map((booking, index) => {
          const startDate = new Date(booking.startDate);
          const endDate = new Date(booking.endDate);
          const numberOfDays =
            endDate === startDate
              ? 1
              : Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
          const pricePerNight = booking.totalPrice / numberOfDays;

          return (
            <div key={index} className="bg-white rounded-xl shadow p-4">
              <div className="relative h-48 rounded mb-4">
                {booking.imageUrl ? (
                  <img
                    src={booking.imageUrl}
                    alt="Place"
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="h-full bg-gray-200 flex items-center justify-center rounded text-gray-500">
                    No Image
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  {formatPrice(Math.round(pricePerNight))} VNĐ/ngày
                </div>
              </div>
              <h2 className="text-lg font-semibold text-blue-600">
                {booking.placeName || `Place ID: ${booking.placeId}`}
              </h2>
              <p className="text-sm mt-2 font-semibold">
                {formatDate(booking.startDate).toUpperCase()} -{" "}
                {formatDate(booking.endDate).toUpperCase()}
                <span className="ml-2 text-gray-600">
                  {numberOfDays.toString().padStart(2, "0")} Ngày
                </span>
              </p>
              <p className="text-sm text-gray-600">
                {booking.placeAddress || "Address not available"}
              </p>
              <p className="text-sm font-semibold mt-1">
                Tổng thanh toán: {formatPrice(booking.totalPrice)} VNĐ
              </p>
              <p className="text-sm mt-1">
                Trạng thái:{" "}
                <span
                  className={`px-2 py-1 rounded ${
                    statusStyles[
                      booking.status === "Confirmed"
                        ? booking.paymentStatus
                        : booking.status
                    ] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {(booking.status === "Pending" && "Chờ xác nhận") ||
                    (booking.status === "Cancelled" && "Đã hủy") ||
                    (booking.status === "Confirmed" &&
                      (booking.paymentStatus === "Paid"
                        ? "Đã thanh toán"
                        : "Chưa thanh toán")) ||
                    booking.status}
                </span>
              </p>

              <div className="mt-2 flex justify-end items-center space-x-2">
                {!isAdminOrHost && (
                  <div className="flex items-center space-x-2">
                    {booking.status === "Confirmed" && booking.paymentStatus != "Paid" && (
                      <button
                        className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                        onClick={() => handlePayment(booking)}
                      >
                        💳 Thanh toán
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(booking)}
                      className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                    >
                      🗑️ Xóa
                    </button>
                  </div>
                )}
                {isAdminOrHost && (
                  <>
                    <button
                      onClick={() => handleAccept(booking)}
                      className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                    >
                      ✔️ Xác nhận
                    </button>
                    <button
                      onClick={() => handleReject(booking)}
                      className="p-2 bg-red-200 text-red-800 rounded hover:bg-red-300 transition-colors"
                    >
                      ❌ Hủy
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })
      )}

      <Modal
        isOpen={isModalSuccessOpen}
        onClose={() => {
          setIsModalSuccessOpen(false);
          refreshBookings();
        }}
        status="success"
        title="Thành công"
        message="Đơn đặt phòng đã chấp thuận."
        confirmText="Đóng"
      />
      <Modal
        isOpen={isModalErrorOpen}
        onClose={() => {
          setIsModalErrorOpen(false);
          refreshBookings();
        }}
        status="error"
        title="Thất bại"
        message="Có lỗi xảy ra. Vui lòng thử lại."
        confirmText="Đóng"
      />
      <Modal
        isOpen={isModalRequestCancelSuccessOpen}
        onClose={() => {
          setIsModalRequestCancelSuccessOpen(false);
          refreshBookings();
        }}
        status="success"
        title="Thành công"
        message="Yêu cầu đã được gửi. Vui lòng chờ phản hồi từ người cho thuê."
        confirmText="Đóng"
      />
      <Modal
        isOpen={isModalRequestCancelErrorOpen}
        onClose={() => {
          setIsModalRequestCancelErrorOpen(false);
          refreshBookings();
        }}
        status="error"
        title="Thất bại"
        message="Có lỗi xảy ra. Vui lòng thử lại."
        confirmText="Đóng"
      />
    </div>
  );
};

export default BookingList;
