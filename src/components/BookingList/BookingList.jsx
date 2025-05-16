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
import { API_URL } from "../../../constant/config.js";

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Completed: "bg-blue-100 text-blue-700",
  Paid: "bg-green-100 text-green-700",
  Unpaid: "bg-red-100 text-red-700",
  Refunded: "bg-purple-100 text-purple-700",
};

const BookingList = ({ bookings, refreshBookings }) => {
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

  const handleAccept = async (booking) => {
    try {
      const response = await axios.put(
        `${API_URL}/bookings/accept-booking-request/${booking.id}`,
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

      const response = await axios.put(
        `${API_URL}/bookings/reject-booking-request/${booking.id}`,
        { reason: rejectReason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setIsModalSuccessOpen(true);
      console.log("Reject response:", response.data);
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || "Có lỗi xảy ra khi từ chối đơn đặt";
        setIsModalErrorOpen(true);
        console.error("Error rejecting booking:", error.response.data);
      } else {
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
        setIsModalRequestCancelErrorOpen(true);
        console.error("Network error:", error);
      }
    }
  };

  const handlePayment = (booking) => {
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);
    const numberOfDays = Math.ceil(
      (endDate - startDate) / (1000 * 60 * 60 * 24)
    );

    const bookingWithDays = {
      ...booking,
      days: numberOfDays,
    };

    navigate("/payment", {
      state: {
        booking: bookingWithDays,
      },
    });
  };

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-xl shadow">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h14a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          Không có booking nào
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Không tìm thấy booking nào phù hợp với bộ lọc hiện tại.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((booking, index) => {
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
            <div className="flex flex-wrap gap-2 mt-2">
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  statusStyles[booking.status] || "bg-gray-100 text-gray-700"
                }`}
              >
                {(booking.status === "Pending" && "Chờ xác nhận") ||
                  (booking.status === "Cancelled" && "Đã hủy") ||
                  (booking.status === "Confirmed" && "Đã xác nhận") ||
                  (booking.status === "Completed" && "Hoàn thành") ||
                  booking.status}
              </span>

              {booking.status !== "Completed" && (
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    statusStyles[booking.paymentStatus] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {(booking.paymentStatus === "Paid" && "Đã thanh toán") ||
                    (booking.paymentStatus === "Unpaid" && "Chưa thanh toán") ||
                    (booking.paymentStatus === "Refunded" && "Đã hoàn tiền") ||
                    booking.paymentStatus}
                </span>
              )}
            </div>

            <div className="mt-3 flex justify-end items-center space-x-2">
              {!isAdminOrHost && (
                <div className="flex items-center space-x-2">
                  {booking.status === "Confirmed" &&
                    booking.paymentStatus !== "Paid" && (
                      <button
                        className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                        onClick={() => handlePayment(booking)}
                      >
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            ></path>
                          </svg>
                          Thanh toán
                        </span>
                      </button>
                    )}

                  {booking.status === "Pending" && (<button
                    onClick={() => handleDelete(booking)}
                    className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                  >
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                      Hủy
                    </span>
                  </button>)}
                </div>
              )}
              {isAdminOrHost && booking.status === "Pending" && (
                <>
                  <button
                    onClick={() => handleAccept(booking)}
                    className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                  >
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      Xác nhận
                    </span>
                  </button>
                  <button
                    onClick={() => handleReject(booking)}
                    className="p-2 bg-red-200 text-red-800 rounded hover:bg-red-300 transition-colors"
                  >
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                      Từ chối
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}

      <Modal
        isOpen={isModalSuccessOpen}
        onClose={() => {
          setIsModalSuccessOpen(false);
          refreshBookings();
        }}
        status="success"
        title="Thành công"
        message="Đơn đặt phòng đã được xử lý thành công."
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
