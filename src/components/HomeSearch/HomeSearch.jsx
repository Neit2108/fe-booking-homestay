import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    
    if (!searchQuery.trim()) return; // Don't search if query is empty
    
    // Navigate to the recommendation page with search query as a URL parameter
    navigate(`/homestay-recommend?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-center text-primary mb-6">
        Tìm kiếm nơi ở hoàn hảo của bạn
      </h2>
      
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg 
              className="h-5 w-5 text-gray-400" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9l4.95 4.95a1 1 0 01-1.414 1.414l-4.95-4.95a7 7 0 01-9.9-9.9 7 7 0 010 9.9 7 7 0 010-9.9zm1.414 1.414a5 5 0 107.072 7.072 5 5 0 00-7.072-7.072z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Nhập địa điểm, khu vực hoặc tên homestay..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          className="bg-accent hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Tìm kiếm
        </button>
      </form>
      
      {/* Optional: Popular search suggestions */}
      <div className="mt-4">
        <p className="text-sm text-gray-500 mb-2">Tìm kiếm phổ biến:</p>
        <div className="flex flex-wrap gap-2">
          {['Hà Nội', 'Đà Nẵng', 'Hồ Chí Minh', 'Đà Lạt', 'Nha Trang'].map((location) => (
            <button
              key={location}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
              onClick={() => {
                setSearchQuery(location);
                navigate(`/homestay-recommend?search=${encodeURIComponent(location)}`);
              }}
            >
              {location}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSearch;