import React from "react";
import Modal from "../../components/Modal/Modal";

const HostRegisterFailed = ({ onClose, errorMessage }) => {
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col items-center p-8 text-center">
        <div className="w-20 h-20 text-red-500 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Registration Failed
        </h2>
        <p className="text-base text-gray-600 mb-6 max-w-md leading-relaxed">
          {errorMessage ||
            "There was an error processing your registration. Please try again later."}
        </p>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-accent hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        >
          Try Again
        </button>
      </div>
    </Modal>
  );
};

export default HostRegisterFailed;
