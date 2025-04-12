import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";
import BookingConfirmationModal from "../../components/BookingConfirmationModal/BookingConfirmationModal";
import axios from "axios";
import Loader from "../../components/Loading/Loader";
import BookingFailedModal from "../../components/BookingConfirmationModal/BookingFailedModal";

function BookingRequest() {
  const location = useLocation();
  const navigate = useNavigate();
  const property = location.state?.property;
  const {user} = useContext(UserContext);
  const userId = user?.id;

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

  const handleApplyVoucher = async () => {
    if (!voucher || voucher.trim() === "") {
      setDiscount(0);
      setVoucherValid(null);
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7284/utils/voucher/validate",
        { Code: voucher }, // Gửi dữ liệu đúng định dạng VoucherRequest
        {
          headers: { "Content-Type": "application/json" }, // Sử dụng JSON thay vì multipart
        }
      );

      const voucherRes = response.data;
      console.log(voucherRes);
      setDiscount(voucherRes.discount); // Cập nhật discount từ response
      setVoucherValid(true); // Đánh dấu voucher hợp lệ
    } catch (error) {
      console.error("Error applying voucher:", error);
      setVoucherValid(false); // Đánh dấu voucher không hợp lệ nếu có lỗi
    }
  };

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
        // Sử dụng !== thay vì != để kiểm tra chính xác hơn
        basePrice -= basePrice * (discount / 100);
      }

      setTotalPrice(Math.round(basePrice));
    }
  }, [property, days, people, discount, navigate]); // Thêm discount vào dependency array

  // Calculate days between two dates
  useEffect(() => {
    if (startDate && endDate) {
      // Check if dates are the same
      if (startDate.toDateString() === endDate.toDateString()) {
        setDays(1); // Same day counts as 1 day
      } else {
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDays(diffDays + 1);
      }
    }
  }, [startDate, endDate]);

  const handleDaysChange = (increment) => {
    const newDays = increment ? days + 1 : Math.max(1, days - 1);
    setDays(newDays);

    // Update end date based on new days
    if (startDate) {
      const newEndDate = new Date(startDate);
      newEndDate.setDate(startDate.getDate() + newDays - 1);
      setDateRange([startDate, newEndDate]);
    }
  };

  const handlePeopleChange = (increment) => {
    if (increment) {
      // Don't allow more than maxGuests + 2
      if (property.maxGuests && people < property.maxGuests + 2) {
        setPeople(people + 1);
      } else if (!property.maxGuests) {
        // If maxGuests is not defined, still allow incrementing
        setPeople(people + 1);
      }
    } else {
      setPeople(Math.max(1, people - 1));
    }
  };

  const formatDateRange = () => {
    if (!startDate || !endDate) return "";

    const formatDate = (date) => {
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "short" });
      return `${day} ${month}`;
    };

    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRetryModalFail = () => {
    setIsFailModalOpen(false);
  };

  const handleContinue = () => {
    setIsModalOpen(false);
    // Navigate to home page after clicking continue
    navigate("/");
  };

  const handleBookNow = async () => {
    const token = localStorage.getItem("token");
    console.log("ID", userId)
    // if (!userId) {
    //   alert("Please log in to book!");
    //   navigate("/login"); // Điều hướng đến trang đăng nhập nếu chưa có user
    //   return;
    // }

    if (!property?.id) {
      console.error("Property ID is missing!");
      return;
    }

    // Tạo object BookingRequest
    const bookingRequest = {
      UserId: userId,
      PlaceId: property.id, // Giả định property.id là PlaceId
      StartDate: startDate.toISOString(), 
      EndDate: endDate.toISOString(),
      NumberOfGuests: people,
      TotalPrice: totalPrice,
      Voucher: voucher || null, // Nếu không có voucher thì gửi null
      Status: "Pending", // Giá trị mặc định là Pending
    };

    try {
      // Gửi POST request lên /bookings/new-booking
      const response = await axios.post(
        "https://localhost:7284/bookings/new-booking",
        bookingRequest,
        {
          headers: { "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
           },
        }
      );

      console.log("Booking successful:", response.data);
      setIsModalOpen(true); // Hiển thị modal xác nhận khi đặt phòng thành công
    } catch (error) {
      setIsFailModalOpen(true);
      console.error("Error creating booking:", error);
      //alert("Failed to create booking. Please try again.");
    }
  };

  if (!property) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center w-full bg-white min-h-screen">
      <div className="flex justify-center items-center w-full h-20 border border-neutral-200">
        <div className="text-2xl">
          <span className="text-accent">Lanka</span>
          <span className="text-primary">Stay.</span>
        </div>
      </div>
      <div className="flex flex-col items-center mt-12">
        <div className="flex flex-col items-center mb-16">
          <div className="mb-2.5 text-4xl font-semibold text-primary">
            Booking Information
          </div>
          <div className="text-lg text-zinc-400">
            Please fill up the blank fields below
          </div>
        </div>
        <div className="flex gap-20 px-5 max-md:flex-col">
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
          <div className="flex flex-col gap-6 w-80 max-md:w-full">
            <div className="flex flex-col gap-2">
              <div className="text-base text-primary">
                Number of People{" "}
                {property.maxGuests ? `(Max: ${property.maxGuests + 2})` : ""}
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
                  Note: There is an additional 30% charge for 3 or more guests.
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-base text-primary">Pick a Date</div>
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

            <div className="flex flex-col gap-2">
              <div className="text-base text-primary">Voucher Code</div>
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
                  Voucher applied successfully!
                </div>
              )}
              {voucherValid === false && (
                <div className="text-xs text-red-500 mt-1">
                  Invalid voucher code.
                </div>
              )}
            </div>

            <div className="mt-6 text-2xl">
              <span className="text-zinc-400">You will pay </span>
              <span className="text-primary">${totalPrice} USD</span>
              <span className="text-zinc-400"> per </span>
              <span className="text-primary">
                {days} {days === 1 ? "Day" : "Days"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center mt-16 mb-10">
          <button
            className="text-2xl bg-accent rounded-xl h-[58px] text-neutral-50 w-[323px] hover:bg-blue-800 transition-colors"
            onClick={handleBookNow}
          >
            Book Now
          </button>
          <button
            className="text-lg rounded bg-neutral-100 h-[50px] text-zinc-400 w-[300px] hover:bg-neutral-200 transition-colors"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      <BookingConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onContinue={handleContinue}
      />
      <BookingFailedModal
        isOpen = {isFailModalOpen}
        onClose={handleRetryModalFail}
        onRetry={handleRetryModalFail}
      />
    </div>
  );
}

export default BookingRequest;
