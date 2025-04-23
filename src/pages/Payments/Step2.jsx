// src/components/Step2.jsx
import React from "react";
import ProcessBar from "../../components/ProcessBar/ProcessBar.jsx";
import { formatPrice } from "../../Utils/PriceUtils.js";

function Step2({ onNext, onBack, paymentMethod, property, days, totalPrice, people }) {
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
            <div className="text-base text-primary">Bank Transfer - QR Code</div>
            <img
              src="https://via.placeholder.com/200x200?text=QR+Code"
              alt="QR Code"
              className="w-[200px] h-[200px] rounded-[15px] object-cover"
            />
            <div className="text-sm text-primary">
              Scan the QR code to make a payment.
            </div>
            <div className="text-sm text-primary">
              Bank: Sample Bank <br />
              Account Number: 1234567890 <br />
              Account Name: Homies Stay
            </div>
          </div>
        );
      case "credit_card":
        return (
          <div className="flex flex-col gap-4">
            <div className="text-base text-primary">Credit Card Information</div>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Card Number"
                className="rounded bg-neutral-100 h-[45px] px-4 text-primary outline-none"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Expiry Date (MM/YY)"
                  className="flex-1 rounded bg-neutral-100 h-[45px] px-4 text-primary outline-none"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-20 rounded bg-neutral-100 h-[45px] px-4 text-primary outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="Cardholder Name"
                className="rounded bg-neutral-100 h-[45px] px-4 text-primary outline-none"
              />
            </div>
          </div>
        );
      case "paypal":
        return (
          <div className="flex flex-col gap-4">
            <div className="text-base text-primary">Pay at Reception</div>
            <div className="text-sm text-primary">
              Please visit our reception to complete the payment.
            </div>
            <div className="text-sm text-primary">
              Reception Address: 123 Sample Street, Main Building, Floor 1 <br />
              Opening Hours: 8:00 AM - 8:00 PM <br />
              Contact: +123-456-7890
            </div>
          </div>
        );
      default:
        return <div className="text-base text-primary">Please select a payment method in Step 1.</div>;
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
            Payment Details
          </div>
          <div className="text-lg text-zinc-400">
            Please provide your payment information
          </div>
        </div>
        <div className="flex px-5 max-md:flex-col relative">
          {/* Bên trái: Tên địa điểm, Số người, Số ngày, Tổng tiền */}
          <div className="w-[420px] max-md:w-full pr-5 max-md:pr-0">
            <div className="flex flex-col gap-4">
              <div className="text-xl text-primary">{property.name}</div>
              <div className="text-base text-primary">
                Số khách: {people} {people === 1 ? "Person" : "People"}
              </div>
              <div className="text-base text-primary">
                Số ngày: {days} {days === 1 ? "Day" : "Days"}
              </div>
              <div className="text-base text-primary">
                Tổng thanh toán: ${formatPrice(totalPrice)} USD
              </div>
            </div>
          </div>

          {/* Đường dọc ngăn cách */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-[200px] border-l-2 border-neutral-200"></div>

          {/* Bên phải: Nội dung dựa trên phương thức thanh toán */}
          <div className="flex flex-col gap-6 w-80 max-md:w-full pl-5 max-md:pl-0 max-md:mt-6">
            {renderPaymentDetails()}
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center mt-16 mb-10">
          <button
            className="text-2xl bg-accent rounded-xl h-[58px] text-neutral-50 w-[323px] hover:bg-blue-800 transition-colors"
            onClick={handleNext}
          >
            Next
          </button>
          <button
            className="text-lg rounded bg-neutral-100 h-[50px] text-zinc-400 w-[300px] hover:bg-neutral-200 transition-colors"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step2;