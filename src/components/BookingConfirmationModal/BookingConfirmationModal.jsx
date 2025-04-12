import React from "react";

function BookingConfirmationModal({ isOpen, onClose, onContinue }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay - very light with blur */}
      <div
        className="absolute inset-0 bg-opacity-10 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="bg-white rounded-xl p-8 shadow-xl z-10 max-w-md w-full mx-4 relative border border-gray-200">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Success icon */}
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-green-100 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-primary text-center mb-2">
          Booking Successful!
        </h2>

        {/* Message */}
        <p className="text-center text-zinc-500 mb-6">
          The booking has been sent to the host. You will receive a confirmation
          shortly.
        </p>

        {/* Button */}
        <button
          className="w-full py-3 bg-accent text-white rounded-lg hover:bg-blue-800 transition-colors"
          onClick={onContinue || onClose}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default BookingConfirmationModal;
