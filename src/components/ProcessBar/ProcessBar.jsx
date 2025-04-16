// src/components/ProgressBar.jsx
import React from "react";

function ProcessBar({ currentStep }) {
  const isStepCompleted = (step) => {
    return step <= currentStep;
  };

  return (
    <div className="flex items-center justify-center mb-6">
      {/* Bước 1 */}
      <div className="flex items-center">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full ${
            isStepCompleted(1) ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
          } text-xl font-bold`}
        >
          {isStepCompleted(1) ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          ) : (
            "1"
          )}
        </div>
        <div className="w-12 h-1 bg-gray-300"></div>
      </div>

      {/* Bước 2 */}
      <div className="flex items-center">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full ${
            isStepCompleted(2) ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
          } text-xl font-bold`}
        >
          {isStepCompleted(2) ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          ) : (
            "2"
          )}
        </div>
        <div className="w-12 h-1 bg-gray-300"></div>
      </div>

      {/* Bước 3 */}
      <div className="flex items-center">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full ${
            isStepCompleted(3) ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
          } text-xl font-bold`}
        >
          {isStepCompleted(3) ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          ) : (
            "3"
          )}
        </div>
      </div>
    </div>
  );
}

export default ProcessBar;