// src/pages/Payments/Step2.jsx
import React, { useState, useEffect } from "react";
import ProcessBar from "../../components/ProcessBar/ProcessBar";
import { formatPrice } from "../../Utils/PriceUtils";
import axios from "axios";
import Loader from "../../components/Loading/Loader";

function Step2({ onNext, onBack, paymentMethod, property, days, totalPrice, people, bookingId }) {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [googleQrCode, setGoogleQrCode] = useState(null);

  // Fetch payment data if bank transfer is selected
  useEffect(() => {
    const fetchPaymentData = async () => {
      if (paymentMethod === "bank_transfer" && bookingId) {
        setLoading(true);
        try {
          const token = localStorage.getItem("token");
          // Create payment URL request
          const response = await axios.post(
            "https://localhost:7284/vnpay/create-payment",
            {
              bookingId: bookingId,
              returnUrl: window.location.origin + "/payment-result",
              orderInfo: `Payment for ${property.name} - ${days} days`,
              locale: "vn"
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
              }
            }
          );
          
          setPaymentData(response.data);
          
          // If no QR code is provided, generate one using Google Charts API
          if (!response.data.qrCodeBase64 && response.data.paymentUrl) {
            const encodedUrl = encodeURIComponent(response.data.paymentUrl);
            setGoogleQrCode(`https://chart.googleapis.com/chart?cht=qr&chl=${encodedUrl}&chs=300x300&chld=L|0`);
          }
        } catch (err) {
          console.error("Error fetching payment data:", err);
          setError("Unable to generate payment QR code. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPaymentData();
  }, [paymentMethod, bookingId, property, days]);

  const handleNext = () => {
    onNext();
  };

  const handleBack = () => {
    onBack();
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
                {/* Display QR Code with fallback options */}
                <div className="flex flex-col items-center">
                  {paymentData.qrCodeBase64 ? (
                    // Option 1: Use QR code from API if available
                    <img
                      src={`data:image/png;base64,${paymentData.qrCodeBase64}`}
                      alt="QR Code"
                      className="w-[200px] h-[200px] border rounded-lg"
                    />
                  ) : googleQrCode ? (
                    // Option 2: Use Google Charts QR code if we generated one
                    <img
                      src={googleQrCode}
                      alt="QR Code"
                      className="w-[200px] h-[200px] border rounded-lg"
                    />
                  ) : (
                    // Option 3: Fallback if no QR code is available
                    <div className="border border-gray-300 rounded-lg p-4 text-center w-[200px] h-[200px] flex items-center justify-center bg-gray-50">
                      <div>
                        <p className="text-gray-500 mb-2">Mã QR không khả dụng</p>
                        <a 
                          href={paymentData.paymentUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          Mở trang thanh toán
                        </a>
                      </div>
                    </div>
                  )}
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
            <div className="text-base text-primary font-semibold">Thông tin thẻ tín dụng</div>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Số thẻ"
                className="rounded bg-neutral-100 h-[45px] px-4 text-primary outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ngày hết hạn (MM/YY)"
                  className="flex-1 rounded bg-neutral-100 h-[45px] px-4 text-primary outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-20 rounded bg-neutral-100 h-[45px] px-4 text-primary outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="text"
                placeholder="Tên chủ thẻ"
                className="rounded bg-neutral-100 h-[45px] px-4 text-primary outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Thông tin thanh toán:</div>
              <div className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Tổng tiền:</span> 
                <span className="ml-2">{formatPrice(totalPrice)} VNĐ</span>
              </div>
              <div className="text-sm text-gray-700">
                <span className="font-medium">Mô tả:</span> 
                <span className="ml-2">Thanh toán đặt phòng {property.name} - {days} ngày</span>
              </div>
            </div>
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