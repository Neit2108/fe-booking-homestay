import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * Enhanced HomeSearch component with proper integration to HomestayRecommendation page
 */
const HomeSearch = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const [mapModalOpen, setMapModalOpen] = useState(false);

  // Search state
  const [searchParams, setSearchParams] = useState({
    location: "",
    dates: [new Date(), new Date(new Date().setDate(new Date().getDate() + 1))],
    persons: 2,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, endDate] = searchParams.dates;

  // Parse URL parameters on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    // Extract search parameters
    const locationParam = params.get("search") || params.get("location");
    const startDateParam = params.get("startDate");
    const endDateParam = params.get("endDate");
    const personsParam = params.get("persons");

    // Update state with URL parameters
    if (locationParam) {
      setSearchParams((prev) => ({ ...prev, location: locationParam }));
    }

    if (startDateParam && endDateParam) {
      try {
        const start = new Date(startDateParam);
        const end = new Date(endDateParam);
        if (!isNaN(start) && !isNaN(end)) {
          setSearchParams((prev) => ({ ...prev, dates: [start, end] }));
        }
      } catch (e) {
        console.error("Invalid date format in URL", e);
      }
    }

    if (personsParam) {
      const persons = parseInt(personsParam);
      if (!isNaN(persons)) {
        setSearchParams((prev) => ({ ...prev, persons }));
      }
    }
  }, [location.search]);

  // Format dates for display
  const formatDates = () => {
    if (!startDate || !endDate) return "Select dates";

    // Format as "Apr 24 - Apr 25"
    return `${startDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${endDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}`;
  };

  // Handle search submission
  const handleSearch = (e) => {
    if (e) e.preventDefault();

    // The key is to use the 'search' parameter that the HomestayRecommendation component is already set up to use
    const queryParams = new URLSearchParams();

    if (searchParams.location) {
      // This is crucial - the component expects 'search' param, not 'location'
      queryParams.set("search", searchParams.location);
    }

    if (startDate && endDate) {
      queryParams.set("startDate", startDate.toISOString().split("T")[0]);
      queryParams.set("endDate", endDate.toISOString().split("T")[0]);
    }

    queryParams.set("persons", searchParams.persons.toString());

    // Navigate to homestay recommendations with search params
    navigate(`/homestay-recommend?${queryParams.toString()}`);

    // Optional: Call external search handler if provided
    if (onSearch) {
      onSearch(searchParams);
    }
  };

  // Handle date selection
  const handleDateChange = (dates) => {
    setSearchParams((prev) => ({
      ...prev,
      dates: dates,
    }));
    setShowDatePicker(false);
  };

  // Handle location input
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setSearchParams((prev) => ({
      ...prev,
      location: value,
    }));
  };

  // Handle person count change
  const handlePersonChange = (increment) => {
    setSearchParams((prev) => {
      const newCount = increment
        ? Math.min(prev.persons + 1, 10) // Maximum 10 people
        : Math.max(prev.persons - 1, 1); // Minimum 1 person

      return {
        ...prev,
        persons: newCount,
      };
    });
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDatePicker(false);
        setMapModalOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle location selection from the map
  const handleLocationSelect = (locationName) => {
    setSearchParams((prev) => ({ ...prev, location: locationName }));
    setMapModalOpen(false);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="bg-blue-50 rounded-full shadow-md p-2" ref={searchRef}>
        <form
          onSubmit={handleSearch}
          className="flex flex-wrap md:flex-nowrap items-center"
        >
          {/* Date Selection */}
          <div className="relative md:flex-1 w-full md:w-auto p-2">
            <div
              className="flex items-center gap-2 bg-white p-3 rounded-full cursor-pointer"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div className="text-gray-700 font-medium">{formatDates()}</div>
            </div>

            {showDatePicker && (
              <div className="absolute top-full left-0 mt-2 z-20 bg-white rounded-lg shadow-lg p-3">
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                  minDate={new Date()}
                />
              </div>
            )}
          </div>

          {/* Person Selection */}
          <div className="md:flex-1 w-full md:w-auto p-2">
            <div className="flex items-center gap-2 bg-white p-3 rounded-full">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <div className="flex-1 text-gray-700 font-medium">
                Số người {searchParams.persons}
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50"
                  onClick={() => handlePersonChange(false)}
                  disabled={searchParams.persons <= 1}
                >
                  <span className="text-xl font-bold">-</span>
                </button>
                <button
                  type="button"
                  className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50"
                  onClick={() => handlePersonChange(true)}
                  disabled={searchParams.persons >= 10}
                >
                  <span className="text-xl font-bold">+</span>
                </button>
              </div>
            </div>
          </div>

          {/* Location Selection */}
          <div className="md:flex-1 w-full md:w-auto p-2">
            <div className="flex items-center gap-2 bg-white p-3 rounded-full">
              <svg
                className="w-5 h-5 text-gray-600 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <input
                type="text"
                className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-500"
                placeholder="Hà Nội"
                value={searchParams.location}
                onChange={handleLocationChange}
              />
              <button
                type="button"
                onClick={() => setMapModalOpen(!mapModalOpen)}
                className="text-blue-500"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Search Button */}
          <div className="w-full md:w-auto p-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-colors"
            >
              Tìm kiếm
            </button>
          </div>
        </form>
      </div>

      {/* Map Modal (Simple Placeholder) */}
      {mapModalOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-10">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-800">Select Location</h3>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setMapModalOpen(false)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="bg-gray-200 rounded-lg h-60 flex items-center justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Vietnam_location_map.svg"
              alt="Bản đồ Việt Nam"
              className="h-full w-full object-contain rounded-lg"
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
              onClick={() => handleLocationSelect("Hà Nội")}
            >
              Hà Nội
            </button>
            <button
              type="button"
              className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
              onClick={() => handleLocationSelect("Hồ Chí Minh")}
            >
              Hồ Chí Minh
            </button>
            <button
              type="button"
              className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
              onClick={() => handleLocationSelect("Đà Nẵng")}
            >
              Đà Nẵng
            </button>
            <button
              type="button"
              className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
              onClick={() => handleLocationSelect("Đà Lạt")}
            >
              Đà Lạt
            </button>
            <button
              type="button"
              className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
              onClick={() => handleLocationSelect("Nha Trang")}
            >
              Nha Trang
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeSearch;
