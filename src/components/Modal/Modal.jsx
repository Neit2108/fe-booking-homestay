import React from "react";

const ICONS = {
  success: {
    bg: "bg-green-100",
    color: "text-green-500",
    svg: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    ),
  },
  error: {
    bg: "bg-red-100",
    color: "text-red-500",
    svg: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    ),
  },
  warning: {
    bg: "bg-yellow-100",
    color: "text-yellow-500",
    svg: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01M12 6a9 9 0 110 18 9 9 0 010-18z"
      />
    ),
  },
};

function Modal({
  isOpen,
  onClose,
  onContinue,
  status = 'success' | 'error' | 'warning',
  title = "Thông báo",
  message = "",
  confirmText = "Tiếp tục",
  ...rest
}) {
  if (!isOpen) return null;

  const icon = ICONS[status] || ICONS.success;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" {...rest}>
      {/* Overlay */}
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className={`rounded-full p-3 ${icon.bg}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-12 w-12 ${icon.color}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {icon.svg}
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-primary text-center mb-2">{title}</h2>

        {/* Message */}
        <p className="text-center text-zinc-500 mb-6">{message}</p>

        {/* Button */}
        <button
          className="w-full py-3 bg-accent text-white rounded-lg hover:bg-blue-800 transition-colors"
          onClick={onContinue || onClose}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}

export default Modal;
