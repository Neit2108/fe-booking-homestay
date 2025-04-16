// src/components/Step1.jsx
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ProcessBar from "../../components/ProcessBar/ProcessBar.jsx";

function Step1({ onNext, setPaymentMethod, property, people, days, totalPrice, startDate, endDate }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const formatDateRange = () => {
    if (!startDate || !endDate) return "";
    const formatDate = (date) => {
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "short" });
      return `${day} ${month}`;
    };
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const handleNext = () => {
    if (selectedPaymentMethod) {
      setPaymentMethod(selectedPaymentMethod);
      onNext(); 
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
          <ProcessBar currentStep={1} />
          <div className="mb-2.5 text-4xl font-semibold text-primary">
            Booking Information
          </div>
          <div className="text-lg text-zinc-400">
            Please review your booking details
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
              <div className="text-base text-primary">Number of People</div>
              <div className="flex items-center rounded bg-neutral-100 h-[45px] justify-center">
                <div className="text-base text-center text-primary">
                  {people} {people === 1 ? "Person" : "People"}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-base text-primary">Date</div>
              <div className="relative flex items-center rounded bg-neutral-100 h-[45px]">
                <div className="flex justify-center items-center rounded bg-black h-[45px] w-[45px]">
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
              <div className="text-base text-primary">Payment Method</div>
              <div className="flex items-center rounded bg-neutral-100 h-[45px] overflow-hidden">
                <select
                  className="flex-1 h-full px-4 bg-transparent outline-none text-primary"
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                >
                  <option value="" disabled>
                    Select payment method
                  </option>
                  <option value="credit_card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
              </div>
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
            onClick={handleNext}
            disabled={!selectedPaymentMethod}
          >
            Next
          </button>
          <button
            className="text-lg rounded bg-neutral-100 h-[50px] text-zinc-400 w-[300px] hover:bg-neutral-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step1;