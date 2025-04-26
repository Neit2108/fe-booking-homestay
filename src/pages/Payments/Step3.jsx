// src/pages/Payments/Step3.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProcessBar from "../../components/ProcessBar/ProcessBar.jsx";
import usePaymentService from "../../services/PaymentService";

function Step3({ onBack, paymentData }) {
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const paymentService = usePaymentService(); // Sử dụng hook

  useEffect(() => {
    // Kiểm tra xem có status từ URL query không (từ callback)
    const queryParams = new URLSearchParams(location.search);
    const statusParam = queryParams.get("status");
    const paymentIdParam = queryParams.get("paymentId");
    
    if (statusParam) {
      setPaymentStatus(statusParam.toLowerCase());
    } else if (paymentData?.id) {
      // Nếu không có status từ URL, kiểm tra từ API
      checkPaymentStatus(paymentData.id);
    }
  }, [location, paymentData]);

  const checkPaymentStatus = async (paymentId) => {
    if (!paymentId) return;
    
    setLoading(true);
    try {
      const payment = await paymentService.getPaymentById(paymentId);
      setPaymentStatus(payment.status.toLowerCase());
    } catch (error) {
      console.error("Error checking payment status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    onBack();
  };

  const handleFinish = () => {
    // Điều hướng về trang chính hoặc trang bookings
    navigate("/bookings");
  };

  const renderStatusIcon = () => {
    if (loading) {
      return (
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-accent"></div>
      );
    }

    switch (paymentStatus) {
      case "success":
      case "paid":
        return (
          <svg
            className="w-24 h-24 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        );
      case "pending":
        return (
          <svg
            className="w-24 h-24 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        );
      default:
        return (
          <svg
            className="w-24 h-24 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        );
    }
  };

  const renderStatusMessage = () => {
    switch (paymentStatus) {
      case "success":
      case "paid":
        return (
          <div className="text-center text-lg text-primary">
            Cảm ơn bạn đã thanh toán! <br />
            Email xác nhận đã được gửi đến hộp thư của bạn. <br />
            Vui lòng kiểm tra email để xem chi tiết đặt phòng.
          </div>
        );
      case "pending":
        return (
          <div className="text-center text-lg text-primary">
            Thanh toán của bạn đang được xử lý. <br />
            Bạn sẽ nhận được email xác nhận sau khi thanh toán được hoàn tất. <br />
            Vui lòng kiểm tra email hoặc trang Bookings của bạn sau vài phút.
          </div>
        );
      default:
        return (
          <div className="text-center text-lg text-red-500">
            Thanh toán không thành công. <br />
            Vui lòng thử lại hoặc chọn phương thức thanh toán khác. <br />
            Nếu cần hỗ trợ, vui lòng liên hệ với chúng tôi.
          </div>
        );
    }
  };

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
          <ProcessBar currentStep={3} />
          <div className="mb-2.5 text-4xl font-semibold text-primary">
            {paymentStatus === "success" || paymentStatus === "paid"
              ? "Thanh toán thành công"
              : paymentStatus === "pending"
              ? "Đang xử lý thanh toán"
              : "Thanh toán thất bại"}
          </div>
          <div className="text-lg text-zinc-400">
            {paymentStatus === "success" || paymentStatus === "paid"
              ? "Đặt phòng của bạn đã được xác nhận!"
              : paymentStatus === "pending"
              ? "Đặt phòng của bạn đang được xử lý"
              : "Vui lòng thử lại hoặc liên hệ hỗ trợ"}
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 px-5">
          {/* Icon trạng thái */}
          <div className="flex justify-center">
            {renderStatusIcon()}
          </div>

          {/* Thông báo */}
          {renderStatusMessage()}
          
          {/* Thông tin bổ sung nếu có */}
          {paymentData && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600 w-full max-w-md">
              <p><strong>Mã đặt phòng:</strong> #{paymentData.bookingId}</p>
              <p><strong>Mã thanh toán:</strong> #{paymentData.paymentId}</p>
              {paymentData.expireDate && (
                <p><strong>Thời hạn thanh toán:</strong> {new Date(paymentData.expireDate).toLocaleString()}</p>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 items-center mt-16 mb-10">
          <button
            className="text-2xl bg-accent rounded-xl h-[58px] text-neutral-50 w-[323px] hover:bg-blue-800 transition-colors"
            onClick={handleFinish}
          >
            Hoàn tất
          </button>
          {paymentStatus !== "success" && paymentStatus !== "paid" && (
            <button
              className="text-lg rounded bg-neutral-100 h-[50px] text-zinc-400 w-[300px] hover:bg-neutral-200 transition-colors"
              onClick={handleBack}
            >
              Quay lại
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Step3;