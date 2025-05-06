import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { usePlaces } from "../../hooks/usePlaces";
import { useHomestayFiltering } from "../../hooks/useHomestayFiltering";
import HomestayFilters from "../../components/HomestayFilters/HomestayFilters";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineCleaningServices } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { GoStarFill } from "react-icons/go";
import { TbBulbFilled } from "react-icons/tb";
import { PiStudentFill } from "react-icons/pi";
import Loader from "../../components/Loading/Loader";
import { formatPrice } from "../../Utils/PriceUtils";

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
            <span className="font-bold text-blue-600">{formatPrice(place.price)} VNĐ</span>
            <span className="text-gray-500 text-sm">/ngày</span>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm font-medium transition-colors"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the parent onClick
              onNavigate(place.id);
            }}
          >
            Đặt ngay
          </button>
        </div>
      </div>
    </div>
  );
};

const HomestayRecommendation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { places, loading, error } = usePlaces({ mode: "public" });
  const [viewMode, setViewMode] = useState("grid");
  const [placesPerPage] = useState(9);
  
  const searchParams = new URLSearchParams(location.search);
  const urlSearchQuery = searchParams.get('search') || '';

  // Use our custom hook for filtering
  const {
    searchTerm,
    categoryFilter,
    priceRange,
    ratingFilter,
    guestsFilter,
    statusFilter,
    sortOption,
    setSearchTerm,
    setCategoryFilter,
    handlePriceChange,
    setRatingFilter,
    setGuestsFilter,
    setSortOption,
    currentPage,
    setCurrentPage,
    setStatusFilter,
    getPaginatedResults,
    resetFilters
  } = useHomestayFiltering(places);

  useEffect(() => {
    if (urlSearchQuery) {
      setSearchTerm(urlSearchQuery);
    }
  }, [urlSearchQuery, setSearchTerm]);

  useEffect(() => {
    // Only update if the search term is different from URL to avoid loops
    if (searchTerm !== urlSearchQuery) {
      const newUrl = searchTerm 
        ? `${location.pathname}?search=${encodeURIComponent(searchTerm)}`
        : location.pathname;
      
      // Update URL without full page refresh
      navigate(newUrl, { replace: true });
    }
  }, [searchTerm, urlSearchQuery, navigate, location.pathname]);

  // Get paginated data
  const { items: currentPlaces, totalPages } = getPaginatedResults(placesPerPage);

  // Handle navigation to property details
  const handleNavigateToProperty = (placeId) => {
    navigate(`/place-details/${placeId}`);
  };

  // Define sidebar filter options
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
            <Loader />
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
              {error.message || "Có lỗi xảy ra. Vui lòng thử lại sau."}
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
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg text-blue-800">
                  Tùy chỉnh
                </h2>
                <button 
                  onClick={resetFilters}
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  Xóa bộ lọc
                </button>
              </div>

              {/* HomestayFilters Component (Sorting) */}
              <HomestayFilters
                activeFilter={sortOption}
                setActiveFilter={setSortOption}
                className="mb-4"
              />

              {/* Category Filter */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">Tất cả danh mục</option>
                  <option value="homestay">Homestay</option>
                  <option value="resort">Resort</option>
                  <option value="hotel">Hotel</option>
                  <option value="villa">Villa</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tầm giá</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Từ"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Đến"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đánh giá tối thiểu
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                >
                  <option value="">Bất kỳ</option>
                  <option value="3">3+ sao</option>
                  <option value="4">4+ sao</option>
                  <option value="4.5">4.5+ sao</option>
                </select>
              </div>

              {/* Guests Filter */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số khách tối đa
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  value={guestsFilter}
                  onChange={(e) => setGuestsFilter(e.target.value)}
                >
                  <option value="">Bất kỳ</option>
                  <option value="2">2+</option>
                  <option value="4">4+</option>
                  <option value="6">6+</option>
                  <option value="8">8+</option>
                </select>
              </div>
            </div>

            {/* Assistant Image */}
            {/* <div className="hidden md:block relative mt-8">
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
            </div> */}
          </div>

          {/* Right Content - Place Listings */}
          <div className="md:w-3/4">
            {/* Search Bar */}
            <div className="flex mb-6">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tìm kiếm theo tên, địa chỉ, mô tả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Results info and View Controls */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-600">
                {getPaginatedResults(placesPerPage).totalItems > 0 ? (
                  <>
                    Hiển thị {getPaginatedResults(placesPerPage).totalItems} kết quả
                    {searchTerm && <span> cho "{searchTerm}"</span>}
                  </>
                ) : (
                  "Không tìm thấy kết quả nào"
                )}
              </div>
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
                activeFilter={sortOption}
                setActiveFilter={setSortOption}
                compactMode={true}
                className="bg-white p-2 rounded-lg shadow-sm"
              />
            </div>

            {/* Place Listings */}
            {currentPlaces.length > 0 ? (
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
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy kết quả nào</h3>
                <p className="text-gray-500">
                  Không tìm thấy homestay nào phù hợp với bộ lọc hiện tại. Vui lòng thử lại với bộ lọc khác.
                </p>
                <button 
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}

            {/* Pagination */}
            {getPaginatedResults(placesPerPage).totalItems > 0 && (
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
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomestayRecommendation;