import React, { useState } from "react";
import { API_URL } from "../../../constant/config";
import axios from "axios";

const ExportDropdownButton = ({ dateRange, loading, user }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [exporting, setExporting] = useState(false);

  const formatDate = (date) => (date ? date.toISOString().split("T")[0] : "");

  const handleExport = async (mode) => {
  setShowDropdown(false);
  setExporting(true);

  try {
    let url = `${API_URL}/bookings/export-bookings`;
    let fileName = "Bookings.xlsx";
    if (mode === "range") {
      const start = formatDate(dateRange.startDate);
      const end = formatDate(dateRange.endDate);
      url += `?startDate=${encodeURIComponent(start)}&endDate=${encodeURIComponent(end)}`;
      fileName = `Bookings_${start}_${end}.xlsx`;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      responseType: "blob",
    });

    const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(urlBlob);
  } catch (err) {
    alert("Có lỗi khi xuất file thống kê: " + err.message);
  } finally {
    setExporting(false);
  }
};


  return (
    <div className="relative">
      <button
        disabled={loading || exporting}
        className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center hover:bg-green-700 transition-colors"
        onClick={() => setShowDropdown((v) => !v)}
        type="button"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            d="M12 16V4m0 0L8 8m4-4l4 4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {exporting ? "Đang xuất..." : "Xuất thống kê"}
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            d="M19 9l-7 7-7-7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {showDropdown && (
        <div className="absolute right-0 z-20 mt-2 bg-white border rounded-lg shadow-lg min-w-[200px]">
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => handleExport("all")}
            disabled={exporting}
          >
            Xuất tất cả
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => handleExport("range")}
            disabled={exporting}
          >
            Xuất theo ngày
            <span className="block text-xs text-gray-500">
              {dateRange.startDate && dateRange.endDate
                ? `${formatDate(dateRange.startDate)} đến ${formatDate(
                    dateRange.endDate
                  )}`
                : "Chọn khoảng ngày"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportDropdownButton;
