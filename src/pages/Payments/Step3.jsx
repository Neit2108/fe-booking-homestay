// src/components/Step3.jsx
import React from "react";
import ProcessBar from "../../components/ProcessBar/ProcessBar.jsx";

function Step3({ onBack }) {
  const handleBack = () => {
    console.log("handleBack called in Step3");
    onBack();
  };

  const handleFinish = () => {
    console.log("Finish button clicked in Step3");
    // Logic để quay về trang chính hoặc kết thúc quy trình
    // Ví dụ: window.location.href = "/"; (quay về trang chính)
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
            Payment Successful
          </div>
          <div className="text-lg text-zinc-400">
            Your booking has been confirmed!
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 px-5">
          {/* Icon thành công */}
          <div className="flex justify-center">
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
          </div>

          {/* Thông báo */}
          <div className="text-center text-lg text-primary">
            Thank you for your payment! <br />
            A confirmation email has been sent to your inbox. <br />
            Please check your email for booking details.
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center mt-16 mb-10">
          <button
            className="text-2xl bg-accent rounded-xl h-[58px] text-neutral-50 w-[323px] hover:bg-blue-800 transition-colors"
            onClick={handleFinish}
          >
            Finish
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

export default Step3;