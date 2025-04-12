import React from "react";
import Modal from "../../components/Modal/Modal";

const HostRegisterSuccess = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col items-center p-8 text-center">
        <div className="w-20 h-20 text-emerald-500 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Registration Successful!
        </h2>
        <p className="text-base text-gray-600 mb-6 max-w-md leading-relaxed">
          Your hotel registration has been submitted successfully. Our team will
          review your information and contact you shortly.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-accent hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        >
          Go to Login
        </button>
      </div>
    </Modal>
  );
};

export default HostRegisterSuccess;
