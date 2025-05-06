import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import Loader from "../../components/Loading/Loader";
import Modal from "../../components/Modal/Modal";
import { formatPrice } from "../../Utils/PriceUtils";
import { API_URL } from "../../../constant/config";

function BookingRequest() {
  const location = useLocation();
  const navigate = useNavigate();
  const property = location.state?.property;
  const { user, isLandlord, isAdmin } = useContext(UserContext);
  const userId = user?.id;

  // State management
  const [days, setDays] = useState(2);
  const [people, setPeople] = useState(1);
  const [dateRange, setDateRange] = useState([
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 1)),
  ]);
  const [startDate, endDate] = dateRange;
  const [totalPrice, setTotalPrice] = useState(0);
  const [voucher, setVoucher] = useState("");
  const [voucherValid, setVoucherValid] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Navigate to the appropriate booking dashboard based on user role
  const navigateToBookingDashboard = () => {
    if (isAdmin()) {
      navigate("/admin-booking-dashboard");
    } else if (isLandlord()) {
      navigate("/landlord-booking-dashboard");
    } else {
      navigate("/user-booking-dashboard");
    }
  };

  // Handle voucher validation
  const handleApplyVoucher = async () => {
    if (!voucher || voucher.trim() === "") {
      setDiscount(0);
      setVoucherValid(null);
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/utils/voucher/validate`,
        { Code: voucher },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const voucherRes = response.data;
      setDiscount(voucherRes.discount);
      setVoucherValid(true);
    } catch (error) {
      console.error("Error applying voucher:", error);
      setVoucherValid(false);
    }
  };

  // Calculate total price based on factors
  useEffect(() => {
    if (!property) {
      navigate("/");
      return;
    }

    if (property.price) {
      let basePrice = property.price * days;

      if (people >= 3) {
        basePrice = basePrice * 1.3;
      }
      if (discount !== 0) {
        basePrice -= basePrice * (discount / 100);
      }

      setTotalPrice(Math.round(basePrice));
    }
  }, [property, days, people, discount, navigate]);

  // Calculate days between selected dates
  useEffect(() => {
    if (startDate && endDate) {
      if (startDate.toDateString() === endDate.toDateString()) {
        setDays(1);
      } else {
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDays(diffDays + 1);
      }
    }
  }, [startDate, endDate]);

  // Adjust number of days
  const handleDaysChange = (increment) => {
    const newDays = increment ? days + 1 : Math.max(1, days - 1);
    setDays(newDays);

    if (startDate) {
      const newEndDate = new Date(startDate);
      newEndDate.setDate(startDate.getDate() + newDays - 1);
      setDateRange([startDate, newEndDate]);
    }
  };

  // Adjust number of people
  const handlePeopleChange = (increment) => {
    if (increment) {
      if (property.maxGuests && people < property.maxGuests + 2) {
        setPeople(people + 1);
      } else if (!property.maxGuests) {
        setPeople(people + 1);
      }
    } else {
      setPeople(Math.max(1, people - 1));
    }
  };

  // Format the date range for display
  const formatDateRange = () => {
    if (!startDate || !endDate) return "";

    const formatDate = (date) => {
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "short" });
      return `${day} ${month}`;
    };

    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  // Modal handlers
  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigateToBookingDashboard(); // Navigate to booking dashboard after closing success modal
  };

  const handleRetryModalFail = () => {
    setIsFailModalOpen(false);
  };

  // Handle booking creation
  const handleBookNow = async () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      alert("Please log in to book!");
      navigate("/login");
      return;
    }

    if (!property?.id) {
      console.error("Property ID is missing!");
      return;
    }

    // Create booking request object
    const bookingRequest = {
      UserId: userId,
      PlaceId: property.id,
      StartDate: startDate.toISOString(),
      EndDate: endDate.toISOString(),
      NumberOfGuests: people,
      TotalPrice: totalPrice,
      Voucher: voucher || null,
      Status: "Pending",
    };

    setIsLoading(true);
    
    try {
      const response = await axios.post(
        `${API_URL}/bookings/new-booking`,
        bookingRequest,
        {
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        }
      );

      console.log("Booking successful:", response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error creating booking:", error);
      setIsFailModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancel button
  const handleCancel = () => {
    navigate(-1);
  };

  if (!property) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center w-full bg-white min-h-screen">
      <div className="flex justify-center items-center w-full h-20 border border-neutral-200">
        <div className="text-2xl">
          <span className="text-accent">Homies</span>
          <span className="text-primary">Stay.</span>
        </div>
      </div>
      <div className="flex flex-col items-center mt-12">
        <div className="flex flex-col items-center mb-16">
          <div className="mb-2.5 text-4xl font-semibold text-primary">
            Xác nhận đặt phòng
          </div>
          <div className="text-lg text-zinc-400">
            Vui lòng điền đầy đủ các thông tin bên dưới để hoàn tất đặt phòng.
          </div>
        </div>
        <div className="flex gap-20 px-5 max-md:flex-col">
          {/* Property Information Section */}
          <div className="w-[420px] max-md:w-full">
            <img
              src={property.mainImage}
              alt={property.name}
              className="w-full h-[270px] rounded-[15px] object-cover mb-[16px]"
            />
            <div className="flex justify-between items-center">
              <div className="text-xl text-primary">{property.name}</div>
              <div className="text-base text-zinc-400">{property.address}</div>
            </div>
          </div>
          
          {/* Booking Options Section */}
          <div className="flex flex-col gap-6 w-80 max-md:w-full">
            {/* People Selection */}
            <div className="flex flex-col gap-2">
              <div className="text-base text-primary">
                Số người{" "}
                {property.maxGuests ? `(Tối đa: ${property.maxGuests + 2})` : ""}
              </div>
              <div className="flex items-center rounded bg-neutral-100 h-[45px]">
                <button
                  className="text-2xl font-bold text-white bg-red-500 rounded h-[45px] w-[45px]"
                  onClick={() => handlePeopleChange(false)}
                >
                  -
                </button>
                <div className="flex-1 text-base text-center text-primary">
                  {people} {people === 1 ? "Person" : "People"}
                </div>
                <button
                  className="text-2xl font-bold text-white bg-teal-500 rounded h-[45px] w-[45px]"
                  onClick={() => handlePeopleChange(true)}
                >
                  +
                </button>
              </div>
              {people >= 3 && (
                <div className="text-xs text-red-500 italic mt-1">
                  Lưu ý: Chúng tôi sẽ thu thêm 30% với mỗi đơn có từ 3 khách trở lên.
                </div>
              )}
            </div>

            {/* Date Selection */}
            <div className="flex flex-col gap-2">
              <div className="text-base text-primary">Chọn ngày</div>
              <div className="relative flex items-center rounded bg-neutral-100 h-[45px]">
                <div className="flex justify-center items-center rounded bg-primary h-[45px] w-[45px]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="2"
                      y="4"
                      width="20"
                      height="18"
                      rx="2"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path d="M2 10H22" stroke="white" strokeWidth="2" />
                    <path
                      d="M7 2L7 6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M17 2L17 6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div
                  className="flex-1 text-base text-center text-primary cursor-pointer"
                  onClick={() => document.getElementById("date-picker").click()}
                >
                  {formatDateRange()}
                </div>
                <DatePicker
                  id="date-picker"
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update);
                  }}
                  minDate={new Date()}
                  className="absolute opacity-0 w-full h-full cursor-pointer"
                />
              </div>
            </div>

            {/* Voucher Section */}
            <div className="flex flex-col gap-2">
              <div className="text-base text-primary">Mã Voucher</div>
              <div className="flex items-center rounded bg-neutral-100 h-[45px] overflow-hidden">
                <input
                  type="text"
                  value={voucher}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setVoucher(newValue);
                    setVoucherValid(null);
                    if (!newValue.trim()) {
                      setDiscount(0); 
                    }
                  }}
                  placeholder="Enter voucher code"
                  className="flex-1 h-full px-4 bg-transparent outline-none text-primary"
                />
                <button
                  onClick={handleApplyVoucher}
                  className="h-full px-4 text-white bg-accent hover:bg-blue-800 transition-colors"
                >
                  Apply
                </button>
              </div>
              {voucherValid === true && (
                <div className="text-xs text-green-500 mt-1">
                  Voucher đã được áp dụng!
                </div>
              )}
              {voucherValid === false && (
                <div className="text-xs text-red-500 mt-1">
                  Voucher không hợp lệ.
                </div>
              )}
            </div>

            {/* Total Price Display */}
            <div className="mt-6 text-2xl">
              <span className="text-zinc-400">Bạn cần trả </span>
              <span className="text-primary">{formatPrice(totalPrice)} VNĐ</span>
              <span className="text-zinc-400"> cho </span>
              <span className="text-primary">
                {days} ngày
              </span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col gap-4 items-center mt-16 mb-10">
          <button
            className="text-2xl bg-accent rounded-xl h-[58px] text-neutral-50 w-[323px] hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleBookNow}
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Đặt ngay"}
          </button>
          <button
            className="text-lg rounded bg-neutral-100 h-[50px] text-zinc-400 w-[300px] hover:bg-neutral-200 transition-colors"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        status="success"
        title="Đặt phòng thành công"
        message="Đơn đặt phòng đã được gửi. Vui lòng chờ xác nhận từ chủ nhà."
        confirmText="Đi đến trang quản lý đặt phòng"
      />
      
      {/* Error Modal */}
      <Modal
        isOpen={isFailModalOpen}
        onClose={handleRetryModalFail}
        status="error"
        title="Đặt phòng thất bại"
        message="Có lỗi xảy ra. Vui lòng thử lại."
        confirmText="Đóng"
      />
    </div>
  );
}

export default BookingRequest;