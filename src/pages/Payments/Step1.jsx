import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ProcessBar from "../../components/ProcessBar/ProcessBar.jsx";
import { formatPrice } from "../../Utils/PriceUtils.js";
import axios from "axios";
import { API_URL } from "../../../constant/config.js";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";

// Payment method constants
const PAYMENT_METHODS = {
  BANK_TRANSFER: "bank_transfer",
  CREDIT_CARD: "credit_card",
  AT_RECEPTION: "paypal",
  WALLET: "wallet"
};

function Step1({ onNext, setPaymentMethod, property, people, days, totalPrice, startDate, endDate }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [error, setError] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [hasPin, setHasPin] = useState(false);
  const [loadingWallet, setLoadingWallet] = useState(false);
  const { user } = useContext(UserContext);

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

  // Fetch wallet balance when component mounts or when wallet payment method is selected
  useEffect(() => {
    if (selectedPaymentMethod === PAYMENT_METHODS.WALLET && user?.token) {
      fetchWalletInfo();
    }
  }, [selectedPaymentMethod, user]);

  // Fetch wallet balance and PIN status
  const fetchWalletInfo = async () => {
    setLoadingWallet(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      // Fetch balance
      const balanceResponse = await axios.get(`${API_URL}/wallet/balance`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (balanceResponse.data) {
        setWalletBalance(balanceResponse.data.balance);
      }

      // Check if user has set PIN
      const pinResponse = await axios.get(`${API_URL}/wallet/has-pin`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setHasPin(pinResponse.data.hasPin);
    } catch (error) {
      console.error("Error fetching wallet info:", error);
      setError("Không thể kết nối đến ví. Vui lòng thử lại sau.");
    } finally {
      setLoadingWallet(false);
    }
  };

  // Handle next button click
  const handleNext = () => {
    if (!selectedPaymentMethod) {
      setError("Vui lòng chọn phương thức thanh toán");
      return;
    }

    // Validate wallet payment if selected
    if (selectedPaymentMethod === PAYMENT_METHODS.WALLET) {
      if (!hasPin) {
        setError("Bạn cần thiết lập mã PIN cho ví trước khi thanh toán. Vui lòng vào trang Ví để thiết lập.");
        return;
      }

      if (walletBalance < totalPrice) {
        setError("Số dư ví không đủ để thanh toán. Vui lòng nạp thêm tiền hoặc chọn phương thức khác.");
        return;
      }
    }
    
    setError("");
    setPaymentMethod(selectedPaymentMethod);
    onNext();
  };

  // Handle payment method selection
  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    setError("");
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
          <ProcessBar currentStep={1} />
          <div className="mb-2.5 text-4xl font-semibold text-primary">
            Xác nhận thanh toán
          </div>
          <div className="text-lg text-zinc-400">
            Vui lòng kiểm tra lại thông tin trước khi thanh toán
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
              <div className="text-base text-primary">Số người</div>
              <div className="flex items-center rounded bg-neutral-100 h-[45px] justify-center">
                <div className="text-base text-center text-primary">
                  {people} {people === 1 ? "khách" : "khách"}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-base text-primary">Ngày đến - đi</div>
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
                <div className="flex-1 text-base text-center text-primary">
                  {formatDateRange()}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-base text-primary">Phương thức thanh toán</div>
              
              {/* Payment Methods as Cards */}
              <div className="flex flex-col gap-2">
                {/* Wallet Payment Option */}
                <div 
                  className={`flex items-center p-3 rounded border cursor-pointer transition-all ${
                    selectedPaymentMethod === PAYMENT_METHODS.WALLET 
                      ? "border-accent bg-blue-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handlePaymentMethodChange(PAYMENT_METHODS.WALLET)}
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-purple-100 rounded-full mr-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <div className="text-primary font-medium">Thanh toán bằng ví</div>
                    <div className="text-xs text-gray-500">Thanh toán trực tiếp từ ví Homies</div>
                    <div className="text-xs text-red-500">Giảm trực tiếp 10% khi thanh toán bằng ví Homies</div>
                    {/* Show balance if wallet payment is selected */}
                    {selectedPaymentMethod === PAYMENT_METHODS.WALLET && (
                      <div className="mt-2">
                        {loadingWallet ? (
                          <div className="text-sm text-gray-500">Đang tải thông tin ví...</div>
                        ) : (
                          <div className="flex flex-col">
                            <div className={`text-sm font-medium ${walletBalance >= totalPrice ? 'text-green-600' : 'text-red-600'}`}>
                              Số dư: {formatPrice(walletBalance)} VNĐ
                            </div>
                            
                            {!hasPin && (
                              <div className="text-xs text-orange-500 mt-1">
                                Bạn cần thiết lập mã PIN ví trước khi thanh toán.
                              </div>
                            )}
                            
                            {walletBalance < totalPrice && (
                              <div className="text-xs text-red-500 mt-1">
                                Số dư không đủ để thanh toán!
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    {selectedPaymentMethod === PAYMENT_METHODS.WALLET && (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.33333 12.9883L5.58333 10.2383L6.76666 9.05498L8.33333 10.6216L13.2333 5.72165L14.4167 6.90498L8.33333 12.9883Z" fill="#3B82F6"/>
                      </svg>
                    )}
                  </div>
                </div>
                
                {/* Bank Transfer Option */}
                <div 
                  className={`flex items-center p-3 rounded border cursor-pointer transition-all ${
                    selectedPaymentMethod === PAYMENT_METHODS.BANK_TRANSFER 
                      ? "border-accent bg-blue-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handlePaymentMethodChange(PAYMENT_METHODS.BANK_TRANSFER)}
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full mr-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 8V6H3V8H21ZM19 12H5V10H19V12ZM21 18H3V14H21V18Z" fill="#3B82F6"/>
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <div className="text-primary font-medium">Chuyển khoản</div>
                    <div className="text-xs text-gray-500">Quét mã QR để thanh toán</div>
                  </div>
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    {selectedPaymentMethod === PAYMENT_METHODS.BANK_TRANSFER && (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.33333 12.9883L5.58333 10.2383L6.76666 9.05498L8.33333 10.6216L13.2333 5.72165L14.4167 6.90498L8.33333 12.9883Z" fill="#3B82F6"/>
                      </svg>
                    )}
                  </div>
                </div>
                
                {/* Credit Card Option */}
                <div 
                  className={`flex items-center p-3 rounded border cursor-pointer transition-all ${
                    selectedPaymentMethod === PAYMENT_METHODS.CREDIT_CARD 
                      ? "border-accent bg-blue-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handlePaymentMethodChange(PAYMENT_METHODS.CREDIT_CARD)}
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full mr-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4C2.89 4 2 4.89 2 6V18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z" fill="#3B82F6"/>
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <div className="text-primary font-medium">Thẻ ngân hàng</div>
                    <div className="text-xs text-gray-500">Thanh toán qua cổng VNPay</div>
                  </div>
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    {selectedPaymentMethod === PAYMENT_METHODS.CREDIT_CARD && (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.33333 12.9883L5.58333 10.2383L6.76666 9.05498L8.33333 10.6216L13.2333 5.72165L14.4167 6.90498L8.33333 12.9883Z" fill="#3B82F6"/>
                      </svg>
                    )}
                  </div>
                </div>
                
                {/* At Reception Option */}
                <div 
                  className={`flex items-center p-3 rounded border cursor-pointer transition-all ${
                    selectedPaymentMethod === PAYMENT_METHODS.AT_RECEPTION 
                      ? "border-accent bg-blue-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handlePaymentMethodChange(PAYMENT_METHODS.AT_RECEPTION)}
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full mr-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8ZM12 14C14.2 14 16 15.8 16 18H8C8 15.8 9.8 14 12 14Z" fill="#3B82F6"/>
                      <path d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="#3B82F6"/>
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <div className="text-primary font-medium">Tại quầy</div>
                    <div className="text-xs text-gray-500">Thanh toán trực tiếp tại quầy lễ tân</div>
                  </div>
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    {selectedPaymentMethod === PAYMENT_METHODS.AT_RECEPTION && (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.33333 12.9883L5.58333 10.2383L6.76666 9.05498L8.33333 10.6216L13.2333 5.72165L14.4167 6.90498L8.33333 12.9883Z" fill="#3B82F6"/>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>

            <div className="mt-6 text-2xl">
              <span className="text-zinc-400">Bạn cần trả </span>
              <span className="text-primary font-semibold">{selectedPaymentMethod === PAYMENT_METHODS.WALLET ? formatPrice(totalPrice*0.9) : formatPrice(totalPrice)} VNĐ</span>
              <span className="text-zinc-400"> cho </span>
              <span className="text-primary font-semibold">
                {days} ngày
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center mt-16 mb-10">
          <button
            className={`text-2xl rounded-xl h-[58px] text-neutral-50 w-[323px] transition-colors ${
              selectedPaymentMethod 
                ? "bg-accent hover:bg-blue-800" 
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleNext}
            disabled={!selectedPaymentMethod || 
              (selectedPaymentMethod === PAYMENT_METHODS.WALLET && 
               (!hasPin || walletBalance < totalPrice || loadingWallet))}
          >
            Tiếp tục
          </button>
          <button
            className="text-lg rounded bg-neutral-100 h-[50px] text-zinc-400 w-[300px] hover:bg-neutral-200 transition-colors"
            onClick={() => window.history.back()}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step1;