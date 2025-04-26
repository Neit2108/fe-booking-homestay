// src/pages/Payments/Step3.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProcessBar from "../../components/ProcessBar/ProcessBar.jsx";
import usePaymentService from "../../services/PaymentService";
import { MdErrorOutline } from "react-icons/md";
import { TbProgress } from "react-icons/tb";
import { Button } from "@headlessui/react";

const Step3 = ({ paymentData, setPaymentData, setCurrentStep }) => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const paymentService = usePaymentService();

  const queryParams = new URLSearchParams(location.search);
  const paymentId = queryParams.get("paymentId");
  const statusParam = queryParams.get("status");
  const vnpResponseCode = queryParams.get("vnp_ResponseCode");

  const checkPaymentStatus = async (paymentId) => {
    if (!paymentId) return;
    setLoading(true);
    try {
      let attempts = 0;
      const maxAttempts = 5;
      while (attempts < maxAttempts) {
        const payment = await paymentService.getPaymentById(paymentId);
        setPaymentStatus(payment.status.toLowerCase());
        setPaymentData({ ...paymentData, id: paymentId });
        if (payment.status.toLowerCase() !== "pending") break;
        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3s
        attempts++;
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      setPaymentStatus("failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Ưu tiên trạng thái từ vnp_ResponseCode (nếu có)
    if (vnpResponseCode) {
      if (vnpResponseCode === "00") {
        setPaymentStatus("success");
      } else {
        setPaymentStatus("failed");
      }
      // Gọi API để cập nhật trạng thái thủ công nếu cần
      if (paymentId && vnpResponseCode === "00") {
        checkPaymentStatus(paymentId);
      }
    }
    // Nếu không có vnp_ResponseCode, dùng status từ query hoặc API
    else if (statusParam) {
      setPaymentStatus(statusParam.toLowerCase());
    } else if (paymentData?.id) {
      checkPaymentStatus(paymentData.id);
    } else if (paymentId) {
      checkPaymentStatus(paymentId);
    }
  }, [paymentData, location.search]);

  const handleComplete = () => {
    navigate("/profile");
  };

  return (
    <div className="step3-container">
      {loading ? (
        <div>Loading...</div>
      ) : paymentStatus === "success" ? (
        <div className="payment-success">
          <CheckCircleOutlineIcon style={{ color: "green", fontSize: 60 }} />
          <h2>Thanh toán thành công</h2>
          <p>Cảm ơn bạn đã đặt phòng!</p>
          <p>Chúng tôi đã gửi thông tin đặt phòng qua email của bạn.</p>
          <Button
            variant="contained"
            color="primary"
            onClick={handleComplete}
            sx={{ mt: 2 }}
          >
            Hoàn tất
          </Button>
        </div>
      ) : paymentStatus === "failed" ? (
        <div className="payment-failed">
          <MdErrorOutline style={{ color: "red", fontSize: 60 }} />
          <h2>Thanh toán thất bại</h2>
          <p>Đã có lỗi xảy ra trong quá trình thanh toán.</p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCurrentStep(2)}
            sx={{ mt: 2 }}
          >
            Thử lại
          </Button>
        </div>
      ) : (
        <div className="payment-pending">
          <TbProgress />
          <h2>Đang xử lý thanh toán...</h2>
          <p>Vui lòng chờ trong giây lát.</p>
        </div>
      )}
    </div>
  );
};
export default Step3;