import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {usePlaces} from "../../hooks/usePlaces";
import HomestayFilters from "../../components/HomestayFilters/HomestayFilters";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { BsSliders } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineCleaningServices } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { GoStarFill } from "react-icons/go";
import { TbBulbFilled } from "react-icons/tb";
import { PiStudentFill } from "react-icons/pi";

// Helper function to render star ratings
const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
  }

  // Add half star if needed
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half-star" className="text-yellow-400" />);
  }

  // Add empty stars to complete 5 stars
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FaRegStar key={`empty-star-${i}`} className="text-yellow-400" />
    );
  }

  return <div className="flex">{stars}</div>;
};

// PlaceCard component
const PlaceCard = ({ place, onNavigate }) => {
  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => onNavigate(place.id)}
    >
      <div className="relative">
        {/* Image */}
        <img
          src={
            place.images && place.images.length > 0
              ? place.images[0].imageUrl
              : "https://via.placeholder.com/300x200"
          }
          alt={place.name}
          className="w-full h-48 object-cover"
        />

        {/* Save button */}
        <button
          className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the parent onClick
            // Add to favorites logic here
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </div>

      <div className="p-4">
        {/* Title and Location */}
        <h3 className="font-semibold text-lg mb-1 text-blue-800">
          {place.name}
        </h3>
        <p className="text-gray-500 text-sm mb-2">{place.address}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={place.rating || 0} />
          <span className="text-sm text-gray-600">
            ({place.numOfRating || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex justify-between items-center">
          <div>
            <span className="font-bold text-blue-600">${place.price}</span>
            <span className="text-gray-500 text-sm">/night</span>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm font-medium transition-colors"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the parent onClick
              onNavigate(place.id);
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

// FilterOption component
const FilterOption = ({ icon, title, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 p-3 rounded-md cursor-pointer transition-colors ${
        active
          ? "bg-blue-600 text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      <div className="text-lg">{icon}</div>
      <span className="text-sm font-medium">{title}</span>
    </div>
  );
};

const HomestayRecommendation = () => {
  const navigate = useNavigate();
  const { places, loading, error } = usePlaces({ mode: "public" });

  // State for filtered places
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Most Relevant");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [placesPerPage] = useState(9);

  // Initialize filteredPlaces when places data loads
  useEffect(() => {
    if (places && places.length > 0) {
      setFilteredPlaces(places);
    }
  }, [places]);

  // Get current places for pagination from filteredPlaces
  const indexOfLastPlace = currentPage * placesPerPage;
  const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
  const currentPlaces = filteredPlaces
    ? filteredPlaces.slice(indexOfFirstPlace, indexOfLastPlace)
    : [];

  // Calculate total pages based on filteredPlaces
  const totalPages = filteredPlaces
    ? Math.ceil(filteredPlaces.length / placesPerPage)
    : 0;

  const filters = [
    { id: "preferences", title: "Filter Preferences", icon: <BsSliders /> },
    { id: "relevant", title: "Most Relevant", icon: <BsSliders /> },
  ];

  // Handle navigation to property details
  const handleNavigateToProperty = (placeId) => {
    navigate(`/place-details/${placeId}`);
  };

  // Callback function for filter changes
  const handleFilterChange = (newFilteredPlaces) => {
    setFilteredPlaces(newFilteredPlaces);
    // Reset to first page when filters change
    setCurrentPage(1);
  };

  const sidebarFilters = [
    { id: "location", title: "Price & Location", icon: <IoLocationOutline /> },
    {
      id: "amenities",
      title: "Amenities Offered",
      icon: <MdOutlineCleaningServices />,
    },
    { id: "topRated", title: "Top Rated by Guests", icon: <IoPeopleOutline /> },
    { id: "ratings", title: "Ratings & Reviews", icon: <GoStarFill /> },
    {
      id: "suggestions",
      title: "AI-Powered Suggestions",
      icon: <TbBulbFilled />,
    },
    { id: "students", title: "Best for Students", icon: <PiStudentFill /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Lỗi! </strong>
            <span className="block sm:inline">
              Vui lòng đăng nhập.
            </span>
            
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">
          Gợi ý Homestay
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar with Filters */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h2 className="font-semibold text-lg mb-4 text-blue-800">
                Tùy chỉnh
              </h2>

              {/* Top Filters */}
              {/* <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {filters.map((filter) => (
                  <FilterOption
                    key={filter.id}
                    icon={filter.icon}
                    title={filter.title}
                    active={activeFilter === filter.title}
                    onClick={() => setActiveFilter(filter.title)}
                  />
                ))}
              </div> */}

              {/* ReusableHomestayFilters Component */}
              <HomestayFilters
                data={places}
                onFilterChange={handleFilterChange}
                activeFilter={activeFilter}
                setActiveFilter={() => {}} 
                className="mb-4"
              />

              {/* Sidebar Filters */}
              {/* <div className="space-y-3">
                {sidebarFilters.map((filter) => (
                  <div
                    key={filter.id}
                    className="flex items-center justify-between p-3 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        {filter.icon}
                      </div>
                      <span className="font-medium text-gray-700">
                        {filter.title}
                      </span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </div>
                ))}
              </div> */}
            </div>

            {/* Assistant Image */}
            <div className="hidden md:block relative mt-8">
              <img
                src="/src/assets/woman-illustration.png"
                alt="Assistant"
                className="mx-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/200x300?text=Assistant";
                }}
              />
            </div>
          </div>

          {/* Right Content - Place Listings */}
          <div className="md:w-3/4">
            {/* View Controls */}
            <div className="flex justify-end mb-4">
              <div className="flex border rounded-md overflow-hidden">
                <button
                  className={`px-3 py-1 ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                    />
                  </svg>
                </button>
                <button
                  className={`px-3 py-1 ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile View Filters - Only visible on smaller screens */}
            <div className="md:hidden mb-4">
              <HomestayFilters
                data={places}
                onFilterChange={handleFilterChange}
                filterTypes={["rating", "price"]} // Simplified for mobile
                compactMode={true}
                className="bg-white p-2 rounded-lg shadow-sm"
                buttonClassName="flex-1"
              />
            </div>

            {/* Place Listings */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {currentPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  onNavigate={handleNavigateToProperty}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav className="flex items-center gap-1">
                <button
                  className="px-3 py-1 rounded-md text-gray-500 disabled:opacity-50"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>

                {/* Generate pagination buttons */}
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  // Show first page, last page, and pages around the current page
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 &&
                      pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === pageNumber
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                        onClick={() => setCurrentPage(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    );
                  }
                  // Add ellipsis for skipped pages
                  if (
                    (pageNumber === 2 && currentPage > 3) ||
                    (pageNumber === totalPages - 1 &&
                      currentPage < totalPages - 2)
                  ) {
                    return (
                      <span key={pageNumber} className="px-2 text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                <button
                  className="px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomestayRecommendation;
