// components/BookingList/BookingList.jsx
import React from "react";
import { formatDate } from "../../Utils/DateUtils"; 
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Completed: "bg-blue-100 text-blue-700",
};

const BookingList = ({ bookings, searchTerm, onEdit, onDelete }) => {
  const {user} = useContext(UserContext);

  const roles = Array.isArray(user.role) ? user.role : [user.role];
  const isAdminOrHost = roles.includes("Admin") || roles.includes("Landlord");

  const filteredBookings = bookings.filter((booking) =>
    booking.placeId.toString().includes(searchTerm.toLowerCase())
  );

  const handleAccept = (booking) => {
    console.log("Accept booking:", booking);
    // Thêm logic xử lý đồng ý (ví dụ: gọi API để cập nhật trạng thái booking)
  };

  const handleReject = (booking) => {
    console.log("Reject booking:", booking);
    // Thêm logic xử lý từ chối (ví dụ: gọi API để cập nhật trạng thái booking)
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
          const numberOfDays = Math.ceil(
            (endDate - startDate) / (1000 * 60 * 60 * 24)
          );
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
                  ${Math.round(pricePerNight)} per night
                </div>
              </div>
              <h2 className="text-lg font-semibold text-blue-600">
                {booking.placeName || `Place ID: ${booking.placeId}`}
              </h2>
              <p className="text-sm mt-2 font-semibold">
                {formatDate(booking.startDate).toUpperCase()} -{" "}
                {formatDate(booking.endDate).toUpperCase()}
                <span className="ml-2 text-gray-600">
                  {numberOfDays.toString().padStart(2, "0")} Days
                </span>
              </p>
              <p className="text-sm text-gray-600">
                {booking.address || "Address not available"}
              </p>
              <p className="text-sm font-semibold mt-1">
                Total Payment ${booking.totalPrice}
              </p>
              <p className="text-sm mt-1">
                Status:{" "}
                <span
                  className={`px-2 py-1 rounded ${
                    statusStyles[booking.status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {booking.status}
                </span>
              </p>
              <div className="mt-2 flex justify-end space-x-2">
                <button
                  onClick={() => onEdit(booking)}
                  className="p-2 bg-blue-100 text-blue-700 rounded"
                >
                  ✏️
                </button>
                <button
                  onClick={() => onDelete(booking)}
                  className="p-2 bg-red-100 text-red-700 rounded"
                >
                  🗑️
                </button>
                {isAdminOrHost && (
                    <>
                      <button
                        onClick={() => handleAccept(booking)}
                        className="p-2 bg-green-100 text-green-700 rounded"
                      >
                        ✔️
                      </button>
                      <button
                        onClick={() => handleReject(booking)}
                        className="p-2 bg-red-200 text-red-800 rounded"
                      >
                        ❌
                      </button>
                    </>
                  )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default BookingList;