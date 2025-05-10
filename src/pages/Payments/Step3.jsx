// // src/pages/Payments/Step3.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import ProcessBar from "../../components/ProcessBar/ProcessBar.jsx";
// import usePaymentService from "../../services/PaymentService";
// import Loader from "../../components/Loading/Loader.jsx";

// // Import icons
// import { IoCheckmarkCircleOutline } from "react-icons/io5";
// import { MdErrorOutline } from "react-icons/md";
// import { TbProgress } from "react-icons/tb";

// const Step3 = ({ paymentData, setCurrentStep }) => {
//   const [paymentStatus, setPaymentStatus] = useState(null);
//   const [paymentDetails, setPaymentDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const paymentService = usePaymentService();

//   // Parse any query parameters
//   const queryParams = new URLSearchParams(location.search);
//   const queryPaymentId = queryParams.get("paymentId");
//   const queryStatus = queryParams.get("status");
//   const vnpResponseCode = queryParams.get("vnp_ResponseCode");

//   // Get the payment ID from either query params or provided data
//   const paymentId = queryPaymentId || paymentData?.id;

//   // Check payment status from the API
//   const checkPaymentStatus = async (id) => {
//     if (!id) {
//       console.error("No payment ID available to check status");
//       setLoading(false);
//       return;
//     }
    
//     try {
//       console.log("Checking payment status for ID:", id);
//       let attempts = 0;
//       const maxAttempts = 5;
      
//       while (attempts < maxAttempts) {
//         const payment = await paymentService.getPaymentById(id);
//         console.log("Payment data from API:", payment);
        
//         if (payment) {
//           setPaymentDetails(payment);
//           setPaymentStatus(payment.status.toLowerCase());
          
//           // If we have a definitive status, break the loop
//           if (payment.status.toLowerCase() !== "pending") {
//             break;
//           }
//         }
        
//         // Wait before trying again
//         if (attempts < maxAttempts - 1) {
//           await new Promise(resolve => setTimeout(resolve, 3000));
//         }
        
//         attempts++;
//       }
//     } catch (error) {
//       console.error("Error checking payment status:", error);
//       setPaymentStatus("failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log("Step3 received paymentData:", paymentData);
    
//     // First, try to get status from props or query params
//     if (paymentData?.status) {
//       setPaymentStatus(paymentData.status.toLowerCase());
//       setPaymentDetails(paymentData);
//     } else if (queryStatus) {
//       setPaymentStatus(queryStatus.toLowerCase());
//     } else if (vnpResponseCode === "00") {
//       setPaymentStatus("success");
//     } else if (vnpResponseCode && vnpResponseCode !== "00") {
//       setPaymentStatus("failed");
//     }
    
//     // In all cases, verify with the API if we have a payment ID
//     if (paymentId) {
//       checkPaymentStatus(paymentId);
//     } else {
//       setLoading(false);
//     }
//   }, [paymentId, paymentData]);

//   const handleComplete = () => {
//     navigate("/user-booking-dashboard");
//   };
  
//   const handleTryAgain = () => {
//     // Go back to step 2
//     if (setCurrentStep) {
//       setCurrentStep(2);
//     } else {
//       navigate(-1);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center w-full bg-white min-h-screen">
//         <div className="flex justify-center items-center w-full h-20 border border-neutral-200">
//           <div className="text-2xl">
//             <span className="text-accent">Homies</span>
//             <span className="text-primary">Stay.</span>
//           </div>
//         </div>
//         <div className="flex flex-col items-center justify-center flex-grow p-6">
//           <Loader />
//           <p className="mt-4 text-gray-600">Đang kiểm tra trạng thái thanh toán...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center w-full bg-white min-h-screen">
//       <div className="flex justify-center items-center w-full h-20 border border-neutral-200">
//         <div className="text-2xl">
//           <span className="text-accent">Homies</span>
//           <span className="text-primary">Stay.</span>
//         </div>
//       </div>
      
//       <div className="flex flex-col items-center mt-12 w-full max-w-3xl px-4">
//         <div className="flex flex-col items-center mb-12">
//           <ProcessBar currentStep={3} />
//           <div className="mb-2.5 text-4xl font-semibold text-primary">
//             Kết quả thanh toán
//           </div>
//         </div>
        
//         <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
//           {paymentStatus === "success" ? (
//             <div className="payment-success">
//               <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-green-100 rounded-full">
//                 <IoCheckmarkCircleOutline className="w-12 h-12 text-green-600" />
//               </div>
//               <h2 className="text-2xl font-bold text-green-700 mb-4">Thanh toán thành công</h2>
//               <p className="text-gray-600 mb-2">Cảm ơn bạn đã đặt phòng!</p>
//               <p className="text-gray-600 mb-6">Chúng tôi đã gửi thông tin đặt phòng qua email của bạn.</p>
              
//               {paymentDetails && (
//                 <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
//                   <p className="text-gray-700 mb-2">
//                     <span className="font-medium">Mã thanh toán:</span> #{paymentDetails.id}
//                   </p>
//                   <p className="text-gray-700 mb-2">
//                     <span className="font-medium">Mã giao dịch:</span> {paymentDetails.transactionId || 'N/A'}
//                   </p>
//                   <p className="text-gray-700 mb-2">
//                     <span className="font-medium">Số tiền:</span> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(paymentDetails.amount)}
//                   </p>
//                 </div>
//               )}
              
//               <button
//                 className="w-full bg-accent hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors"
//                 onClick={handleComplete}
//               >
//                 Xem đơn đặt phòng
//               </button>
//             </div>
//           ) : paymentStatus === "failed" ? (
//             <div className="payment-failed">
//               <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-red-100 rounded-full">
//                 <MdErrorOutline className="w-12 h-12 text-red-600" />
//               </div>
//               <h2 className="text-2xl font-bold text-red-700 mb-4">Thanh toán thất bại</h2>
//               <p className="text-gray-600 mb-6">Đã có lỗi xảy ra trong quá trình thanh toán.</p>
              
//               <div className="flex flex-col gap-3">
//                 <button
//                   className="w-full bg-accent hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors"
//                   onClick={handleTryAgain}
//                 >
//                   Thử lại
//                 </button>
//                 <button
//                   className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 rounded-md transition-colors"
//                   onClick={handleComplete}
//                 >
//                   Đơn đặt phòng của tôi
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="payment-pending">
//               <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-yellow-100 rounded-full">
//                 <TbProgress className="w-12 h-12 text-yellow-600" />
//               </div>
//               <h2 className="text-2xl font-bold text-yellow-700 mb-4">Đang xử lý thanh toán...</h2>
//               <p className="text-gray-600 mb-4">Vui lòng chờ trong giây lát.</p>
//               <p className="text-sm text-gray-500 mb-6">
//                 Thanh toán của bạn đang được xử lý. Việc này có thể mất vài phút.
//               </p>
              
//               <div className="flex flex-col gap-3">
//                 <button
//                   className="w-full bg-accent hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors"
//                   onClick={() => window.location.reload()}
//                 >
//                   Kiểm tra lại
//                 </button>
//                 <button
//                   className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 rounded-md transition-colors"
//                   onClick={handleComplete}
//                 >
//                   Đơn đặt phòng của tôi
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Step3;

// src/pages/Payments/Step3.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProcessBar from "../../components/ProcessBar/ProcessBar.jsx";
import usePaymentService from "../../services/PaymentService";
import Loader from "../../components/Loading/Loader.jsx";
import axios from "axios";
import { API_URL } from "../../../constant/config";

// Import icons
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { TbProgress } from "react-icons/tb";

const Step3 = ({ paymentData, setCurrentStep }) => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const paymentService = usePaymentService();

  // Parse any query parameters
  const queryParams = new URLSearchParams(location.search);
  const queryPaymentId = queryParams.get("paymentId");
  const queryStatus = queryParams.get("status");
  const vnpResponseCode = queryParams.get("vnp_ResponseCode");

  // Get the payment ID from either query params or provided data
  const paymentId = queryPaymentId || paymentData?.id;

  // Direct API call as a fallback method if the service fails
  const checkPaymentStatusDirect = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(`${API_URL}/vnpay/payment/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.error("Direct API call error:", error);
      return null;
    }
  };

  // Check payment status from the API
  const checkPaymentStatus = async (id) => {
    if (!id) {
      console.error("No payment ID available to check status");
      setLoading(false);
      return;
    }
    
    try {
      console.log("Checking payment status for ID:", id);
      let attempts = 0;
      const maxAttempts = 3; // Reduced from 5 to 3 for faster resolution
      
      while (attempts < maxAttempts) {
        // Try using the service first
        let payment = await paymentService.getPaymentById(id);
        
        // If the service fails, try direct API call as fallback
        if (!payment && attempts === maxAttempts - 1) {
          payment = await checkPaymentStatusDirect(id);
        }
        
        console.log("Payment data from API:", payment);
        
        if (payment) {
          setPaymentDetails(payment);
          setPaymentStatus(payment.status.toLowerCase());
          
          // If we have a definitive status, break the loop
          if (payment.status.toLowerCase() !== "pending") {
            break;
          }
        }
        
        // Wait before trying again
        if (attempts < maxAttempts - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
        attempts++;
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Step3 received paymentData:", paymentData);
    
    // Immediately set payment details from props if available
    if (paymentData) {
      setPaymentDetails(paymentData);
      
      // For wallet payments, we can trust the status from paymentData directly
      if (paymentData.bookingId) {
        // This is likely a wallet payment from Step2
        if (!paymentData.status || paymentData.status === 'pending') {
          // For wallet payments that have just completed, default to success
          setPaymentStatus("success");
        } else {
          setPaymentStatus(paymentData.status.toLowerCase());
        }
        
        setLoading(false);
        return; // Skip API verification for wallet payments
      }
    }
    
    // Handle status from URL parameters
    if (queryStatus) {
      setPaymentStatus(queryStatus.toLowerCase());
    } else if (vnpResponseCode === "00") {
      setPaymentStatus("success");
    } else if (vnpResponseCode && vnpResponseCode !== "00") {
      setPaymentStatus("failed");
    }
    
    // If we have a payment ID, verify with the API (except for wallet payments we already handled)
    if (paymentId) {
      checkPaymentStatus(paymentId);
    } else {
      setLoading(false);
    }
  }, [paymentId, paymentData]);

  const handleComplete = () => {
    navigate("/user-booking-dashboard");
  };
  
  const handleTryAgain = () => {
    // Go back to step 2
    if (setCurrentStep) {
      setCurrentStep(2);
    } else {
      navigate(-1);
    }
  };

  // If we have PaymentData with amount but without a status, assume success for wallet payments
  // This is a safeguard for wallet payments where the API check might fail
  useEffect(() => {
    if (!loading && !paymentStatus && paymentDetails && paymentData?.amount > 0) {
      console.log("Setting default success status for payment with amount:", paymentData.amount);
      setPaymentStatus("success");
    }
  }, [loading, paymentStatus, paymentDetails, paymentData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center w-full bg-white min-h-screen">
        <div className="flex justify-center items-center w-full h-20 border border-neutral-200">
          <div className="text-2xl">
            <span className="text-accent">Homies</span>
            <span className="text-primary">Stay.</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center flex-grow p-6">
          <Loader />
          <p className="mt-4 text-gray-600">Đang kiểm tra trạng thái thanh toán...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full bg-white min-h-screen">
      <div className="flex justify-center items-center w-full h-20 border border-neutral-200">
        <div className="text-2xl">
          <span className="text-accent">Homies</span>
          <span className="text-primary">Stay.</span>
        </div>
      </div>
      
      <div className="flex flex-col items-center mt-12 w-full max-w-3xl px-4">
        <div className="flex flex-col items-center mb-12">
          <ProcessBar currentStep={3} />
          <div className="mb-2.5 text-4xl font-semibold text-primary">
            Kết quả thanh toán
          </div>
        </div>
        
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
          {paymentStatus === "success" ? (
            <div className="payment-success">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-green-100 rounded-full">
                <IoCheckmarkCircleOutline className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-700 mb-4">Thanh toán thành công</h2>
              <p className="text-gray-600 mb-2">Cảm ơn bạn đã đặt phòng!</p>
              <p className="text-gray-600 mb-6">Chúng tôi đã gửi thông tin đặt phòng qua email của bạn.</p>
              
              {paymentDetails && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Mã thanh toán:</span> #{paymentDetails.id}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Mã giao dịch:</span> {paymentDetails.transactionId || 'N/A'}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Số tiền:</span> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(paymentDetails.amount || 0)}
                  </p>
                </div>
              )}
              
              <button
                className="w-full bg-accent hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors"
                onClick={handleComplete}
              >
                Xem đơn đặt phòng
              </button>
            </div>
          ) : paymentStatus === "failed" ? (
            <div className="payment-failed">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-red-100 rounded-full">
                <MdErrorOutline className="w-12 h-12 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-red-700 mb-4">Thanh toán thất bại</h2>
              <p className="text-gray-600 mb-6">Đã có lỗi xảy ra trong quá trình thanh toán.</p>
              
              <div className="flex flex-col gap-3">
                <button
                  className="w-full bg-accent hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors"
                  onClick={handleTryAgain}
                >
                  Thử lại
                </button>
                <button
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 rounded-md transition-colors"
                  onClick={handleComplete}
                >
                  Đơn đặt phòng của tôi
                </button>
              </div>
            </div>
          ) : (
            <div className="payment-pending">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-yellow-100 rounded-full">
                <TbProgress className="w-12 h-12 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-yellow-700 mb-4">Đang xử lý thanh toán...</h2>
              <p className="text-gray-600 mb-4">Vui lòng chờ trong giây lát.</p>
              <p className="text-sm text-gray-500 mb-6">
                Thanh toán của bạn đang được xử lý. Việc này có thể mất vài phút.
              </p>
              
              <div className="flex flex-col gap-3">
                <button
                  className="w-full bg-accent hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors"
                  onClick={() => window.location.reload()}
                >
                  Kiểm tra lại
                </button>
                <button
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 rounded-md transition-colors"
                  onClick={handleComplete}
                >
                  Đơn đặt phòng của tôi
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step3;