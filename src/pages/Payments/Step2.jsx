// src/pages/Payments/Step2.jsx
import React, { useState, useEffect, useRef } from "react";
import ProcessBar from "../../components/ProcessBar/ProcessBar";
import { formatPrice } from "../../Utils/PriceUtils";
import axios from "axios";
import Loader from "../../components/Loading/Loader";
import { QRCodeSVG } from 'qrcode.react'; // Make sure this is installed: npm install qrcode.react
import QRCodeService from '../../services/QRCodeService';

function Step2({ onNext, onBack, paymentMethod, property, days, totalPrice, people, bookingId }) {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [redirectCountdown, setRedirectCountdown] = useState(null);
  const [directQRValue, setDirectQRValue] = useState(null);
  const redirectTimerRef = useRef(null);

  // Function to generate QR code directly in frontend
  const generateQRCode = (url) => {
    return (
      <div className="flex justify-center">
        <QRCodeSVG
          value={url}
          size={200}
          level={"H"}
          marginSize={4}
        />
      </div>
    );
  };

  // Extract the direct payment URL for QR code
  const extractDirectPaymentUrl = async (paymentUrl) => {
    // This is a common URL pattern for VNPay payment links
    // If the URL contains these parameters, it might be a redirect URL
    if (paymentUrl.includes('vnpayment') && paymentUrl.includes('vnp_')) {
      // For VNPay, we may need to directly use this URL in the QR code
      setDirectQRValue(paymentUrl);
      return paymentUrl;
    }
    
    try {
      // If we need to simulate a direct API call to get VNPay QR info
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token missing");
      
      // We could make an API call to get direct QR code data if needed
      // For now, we'll use the payment URL directly
      setDirectQRValue(paymentUrl);
      return paymentUrl;
    } catch (err) {
      console.error("Error extracting direct payment URL:", err);
      // Fallback to original URL
      setDirectQRValue(paymentUrl);
      return paymentUrl;
    }
  };

  // Fetch payment data when component mounts
  useEffect(() => {
    const fetchPaymentData = async () => {
      if (!bookingId) return;
      
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token missing");
        
        // For bank transfers, we need a different bankCode
        let bankCode = undefined;
        if (paymentMethod === 'credit_card') {
          bankCode = 'NCB'; // Default for card payments
        } else if (paymentMethod === 'bank_transfer') {
          bankCode = '';
        }
        
        // Make the API call to create payment
        const response = await axios.post(
          "https://homiesstay.onrender.com/vnpay/create-payment",
          {
            bookingId: bookingId,
            returnUrl: window.location.origin + "/payment-result",
            orderInfo: `Payment for ${property.name} - ${days} days`,
            locale: "vn",
            bankCode: bankCode
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );
        
        const data = response.data;
        setPaymentData(data);
        
        // For bank transfers, extract the direct QR code URL
        if (paymentMethod === 'bank_transfer' && data.paymentUrl) {
          await extractDirectPaymentUrl(data.paymentUrl);
        }
        
        // Handle redirect for credit card payment
        if (paymentMethod === 'credit_card' && data.paymentUrl) {
          setRedirectCountdown(10);
        }
      } catch (err) {
        console.error("Error fetching payment data:", err);
        setError(err?.response?.data?.message || "Unable to process payment request. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
    
    // Cleanup function
    return () => {
      if (redirectTimerRef.current) {
        clearInterval(redirectTimerRef.current);
      }
    };
  }, [paymentMethod, bookingId, property, days]);

  // Handle countdown and redirect for credit card payment
  useEffect(() => {
    if (redirectCountdown === null) return;
    
    if (redirectCountdown > 0) {
      redirectTimerRef.current = setTimeout(() => {
        setRedirectCountdown(redirectCountdown - 1);
      }, 1000);
    } else if (redirectCountdown === 0 && paymentData?.paymentUrl) {
      window.location.href = paymentData.paymentUrl;
    }
    
    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
      }
    };
  }, [redirectCountdown, paymentData]);

  const handleNext = () => {
    onNext();
  };

  const handleBack = () => {
    onBack();
  };

  // Handle immediate redirect to payment page
  const handleRedirectNow = () => {
    if (paymentData?.paymentUrl) {
      window.location.href = paymentData.paymentUrl;
    }
  };

  const renderPaymentDetails = () => {
    switch (paymentMethod) {
      case "bank_transfer":
        return (
          <div className="flex flex-col gap-4">
            <div className="text-base text-primary font-semibold">Chuyển khoản - Mã QR</div>
            
            {loading ? (
              <div className="flex justify-center">
                <Loader />
              </div>
            ) : error ? (
              <div className="text-red-500 text-center">
                {error}
                <button
                  onClick={() => window.location.reload()}
                  className="block mx-auto mt-2 text-blue-500 underline"
                >
                  Thử lại
                </button>
              </div>
            ) : paymentData ? (
              <>
                {/* QR Code Display */}
                <div className="flex flex-col items-center border border-gray-200 rounded-lg p-4 bg-white">
                  {/* Use direct QR rendering with the extracted URL */}
                  {directQRValue ? (
                    <QRCodeSVG
                      value={directQRValue}
                      size={200}
                      level={"H"}
                      includeMargin={true}
                    />
                  ) : (
                    <img
                      src={QRCodeService.getGoogleQRCodeUrl(paymentData.paymentUrl)}
                      alt="QR Code"
                      className="w-[200px] h-[200px]"
                    />
                  )}
                  <p className="text-sm text-center mt-2 text-gray-600">
                    Quét mã QR để thanh toán
                  </p>
                </div>
                
                {/* Payment Information */}
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <div className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">URL thanh toán:</span>
                    <a 
                      href={paymentData.paymentUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 ml-2 underline"
                    >
                      Thanh toán online
                    </a>
                  </div>
                  <div className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">Mã thanh toán:</span> 
                    <span className="ml-2">{paymentData.paymentId}</span>
                  </div>
                  <div className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">Hết hạn:</span> 
                    <span className="ml-2">
                      {new Date(paymentData.expireDate).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-orange-500 mt-2">
                    Vui lòng hoàn tất thanh toán trước thời hạn để đảm bảo đặt phòng thành công
                  </div>
                </div>
                
                {/* Instructions */}
                <div className="bg-blue-50 p-4 rounded-lg mt-4 text-sm">
                  <h3 className="font-medium text-blue-700 mb-2">Hướng dẫn thanh toán:</h3>
                  <ol className="list-decimal pl-4 text-blue-800 space-y-1">
                    <li>Sử dụng ứng dụng ngân hàng hoặc ví điện tử hỗ trợ VNPay</li>
                    <li>Quét mã QR hoặc nhấp vào liên kết thanh toán</li>
                    <li>Xác nhận thông tin thanh toán</li>
                    <li>Hoàn tất thanh toán theo hướng dẫn của ngân hàng</li>
                  </ol>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500">
                Không có thông tin thanh toán
              </div>
            )}
          </div>
        );
        
      case "credit_card":
        return (
          <div className="flex flex-col gap-4">
            <div className="text-base text-primary font-semibold">Thanh toán qua thẻ</div>
            
            {loading ? (
              <div className="flex justify-center">
                <Loader />
              </div>
            ) : error ? (
              <div className="text-red-500 text-center">
                {error}
                <button
                  onClick={() => window.location.reload()}
                  className="block mx-auto mt-2 text-blue-500 underline"
                >
                  Thử lại
                </button>
              </div>
            ) : paymentData ? (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-center mb-4">
                  <img src="/src/assets/Payment/vnpay-logo.png" alt="VNPay" className="h-12" 
                       onError={(e) => { e.target.src = "https://sandbox.vnpayment.vn/paymentv2/images/bank/qr_vnpay_qr.png"; e.target.onerror = null; }} />
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Đang chuyển đến cổng thanh toán VNPay
                  </h3>
                  
                  {redirectCountdown !== null && (
                    <div className="text-sm text-gray-600">
                      Tự động chuyển sau <span className="font-bold text-blue-600">{redirectCountdown}</span> giây
                    </div>
                  )}
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="font-medium text-blue-800 mb-2">Thông tin thanh toán:</div>
                  <div className="text-sm text-gray-700">
                    <div className="mb-1">
                      <span className="font-medium">Tổng tiền:</span> 
                      <span className="ml-2">{formatPrice(totalPrice)} VNĐ</span>
                    </div>
                    <div className="mb-1">
                      <span className="font-medium">Mã thanh toán:</span> 
                      <span className="ml-2">{paymentData.paymentId}</span>
                    </div>
                    <div>
                      <span className="font-medium">Hết hạn:</span> 
                      <span className="ml-2">{new Date(paymentData.expireDate).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleRedirectNow}
                  className="w-full bg-accent hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors"
                >
                  Thanh toán ngay
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                Không có thông tin thanh toán
              </div>
            )}
          </div>
        );
        
      case "paypal":
        return (
          <div className="flex flex-col gap-4">
            <div className="text-base text-primary font-semibold">Thanh toán tại quầy</div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-700 mb-4">
                Vui lòng đến quầy lễ tân để hoàn tất thanh toán.
              </div>
              <div className="text-sm">
                <p className="font-medium mb-1">Địa chỉ quầy lễ tân:</p>
                <p className="text-gray-600">235 Hoàng Quốc Việt, Cầu Giấy, Hà Nội</p>
                <p className="text-gray-600">Giờ mở cửa: 8:00 - 20:00</p>
                <p className="text-gray-600">Liên hệ: 0934765123</p>
              </div>
              
              <div className="mt-4 border-t pt-4 border-gray-200">
                <p className="font-medium text-gray-700 mb-1">Thông tin thanh toán:</p>
                <p className="text-gray-600">Mã đặt phòng: #{bookingId || 'N/A'}</p>
                <p className="text-gray-600">Tổng tiền: {formatPrice(totalPrice)} VNĐ</p>
                <p className="text-gray-600">Thời gian đặt phòng: {days} ngày</p>
              </div>
              
              <div className="mt-4 text-sm text-orange-500">
                Lưu ý: Vui lòng mang theo CCCD/CMND khi đến thanh toán
              </div>
            </div>
          </div>
        );
        
      default:
        return <div className="text-base text-primary">Vui lòng chọn phương thức thanh toán ở bước trước.</div>;
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
          <ProcessBar currentStep={2} />
          <div className="mb-2.5 text-4xl font-semibold text-primary">
            Chi tiết thanh toán
          </div>
          <div className="text-lg text-zinc-400">
            Vui lòng thanh toán để hoàn tất đặt phòng
          </div>
        </div>
        
        <div className="flex px-5 max-md:flex-col relative w-full max-w-4xl">
          {/* Left side: Property details */}
          <div className="w-1/2 max-md:w-full pr-8 max-md:pr-0 pb-6">
            <div className="flex flex-col gap-4">
              <div className="text-xl font-semibold text-primary mb-4">{property.name}</div>
              
              <div className="bg-white shadow-sm rounded-lg p-5 border border-gray-100">
                <div className="mb-4">
                  <span className="text-gray-500 text-sm">Số khách:</span>
                  <span className="block text-primary font-medium">
                    {people} {people === 1 ? "người" : "người"}
                  </span>
                </div>
                
                <div className="mb-4">
                  <span className="text-gray-500 text-sm">Số ngày:</span>
                  <span className="block text-primary font-medium">
                    {days} {days === 1 ? "ngày" : "ngày"}
                  </span>
                </div>
                
                <div>
                  <span className="text-gray-500 text-sm">Tổng thanh toán:</span>
                  <span className="block text-primary text-lg font-bold">
                    {formatPrice(totalPrice)} VNĐ
                  </span>
                </div>
              </div>
              
              {/* Property thumbnail */}
              {property.mainImage && (
                <div className="mt-4">
                  <img 
                    src={property.mainImage} 
                    alt={property.name}
                    className="w-full h-48 object-cover rounded-lg shadow-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">{property.address}</p>
                </div>
              )}
            </div>
          </div>

          {/* Divider for medium screens and larger */}
          <div className="hidden md:block w-px h-auto bg-gray-200 mx-4"></div>

          {/* Right side: Payment details */}
          <div className="w-1/2 max-md:w-full pl-4 max-md:pl-0 max-md:mt-6">
            {renderPaymentDetails()}
          </div>
        </div>
        
        <div className="flex flex-col gap-4 items-center mt-16 mb-10">
          <button
            className="text-2xl bg-accent rounded-xl h-[58px] text-neutral-50 w-[323px] hover:bg-blue-800 transition-colors"
            onClick={handleNext}
          >
            Tiếp theo
          </button>
          <button
            className="text-lg rounded bg-neutral-100 h-[50px] text-zinc-400 w-[300px] hover:bg-neutral-200 transition-colors"
            onClick={handleBack}
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step2;