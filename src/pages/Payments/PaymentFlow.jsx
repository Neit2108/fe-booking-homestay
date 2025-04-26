// src/pages/Payments/PaymentFlow.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Step1 from "./Step1.jsx";
import Step2 from "./Step2.jsx";
import Step3 from "./Step3.jsx";
import Loader from "../../components/Loading/Loader.jsx";

function PaymentFlow() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentResultData, setPaymentResultData] = useState(null);

  useEffect(() => {
    try {
      // Check if navigation is from payment result page
      if (location.state?.fromPaymentResult && location.state?.paymentData) {
        console.log('Navigated from payment result', location.state.paymentData);
        setPaymentResultData(location.state.paymentData);
        
        // Reset location state to prevent re-triggering
        window.history.replaceState({}, document.title);
        
        // If we have payment data, go directly to Step 3
        setCurrentStep(3);
      }

      if (location.state?.booking) {
        const booking = location.state.booking;
        
        // Calculate dates if they are provided
        const startDate = booking.startDate ? new Date(booking.startDate) : new Date();
        const endDate = booking.endDate ? new Date(booking.endDate) : new Date(new Date().setDate(startDate.getDate() + 2));
        
        // Calculate days if not explicitly provided
        const daysDiff = booking.days || Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        
        setBookingData({
          id: booking.id,
          property: {
            id: booking.placeId,
            name: booking.placeName || `Homestay #${booking.placeId}`,
            address: booking.placeAddress || 'Địa chỉ không có sẵn',
            price: booking.totalPrice / daysDiff, // Calculate price per day
            mainImage: booking.imageUrl || 'https://via.placeholder.com/300x200?text=Không+có+ảnh'
          },
          people: booking.numberOfGuests || 2,
          days: daysDiff,
          totalPrice: booking.totalPrice || 300,
          startDate: startDate,
          endDate: endDate
        });
      } else {
        // Default property data if not navigated from booking dashboard
        setBookingData({
          id: null, // No booking ID for direct access
          property: {
            id: 1,
            mainImage: "src/assets/Home/place_image_example_2.jpg",
            name: "Mẫu Homestay",
            address: "123 Đường Mẫu, Hà Nội",
            price: 100
          },
          people: 2,
          days: 3,
          totalPrice: 300,
          startDate: new Date(),
          endDate: new Date(new Date().setDate(new Date().getDate() + 2))
        });
      }
    } catch (err) {
      console.error("Error processing booking data:", err);
    } finally {
      setLoading(false);
    }
  }, [location.state]);

  // Handle navigation between steps
  const handleNext = () => {
    console.log("Next button clicked, current step:", currentStep);
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    console.log("Back button clicked, current step:", currentStep);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      // Go back to previous page if at first step
      navigate(-1);
    }
  };

  // Show loading until we have booking data
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader />
        <p className="mt-4 text-gray-600">Đang tải thông tin đặt phòng...</p>
      </div>
    );
  }

  // Ensure booking data exists
  if (!bookingData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-700 mb-4">Lỗi dữ liệu</h2>
          <p className="text-gray-600 mb-6">Không thể tải thông tin đặt phòng. Vui lòng thử lại sau.</p>
          <button
            onClick={() => navigate(-1)}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  console.log("Current step:", currentStep, "Payment method:", paymentMethod);
  
  return (
    <>
      {currentStep === 1 && (
        <Step1
          onNext={handleNext}
          setPaymentMethod={setPaymentMethod}
          property={bookingData.property}
          people={bookingData.people}
          days={bookingData.days}
          totalPrice={bookingData.totalPrice}
          startDate={bookingData.startDate}
          endDate={bookingData.endDate}
        />
      )}
      
      {currentStep === 2 && (
        <Step2
          onNext={handleNext}
          onBack={handleBack}
          paymentMethod={paymentMethod}
          property={bookingData.property}
          days={bookingData.days}
          totalPrice={bookingData.totalPrice}
          people={bookingData.people}
          bookingId={bookingData.id} // Pass booking ID to Step2
        />
      )}
      
      {currentStep === 3 && (
        <Step3
          onBack={handleBack}
          paymentData={paymentResultData || {
            id: bookingData.id,
            bookingId: bookingData.id,
            amount: bookingData.totalPrice
          }}
        />
      )}
    </>
  );
}

export default PaymentFlow;