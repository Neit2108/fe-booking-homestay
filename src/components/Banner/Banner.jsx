// src/components/Banner/ImprovedBanner.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ImprovedBanner = () => {
  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Main banner image */}
      <img 
        src="/path/to/your-new-banner.jpg" // Replace with your new banner image
        alt="Explore beautiful homestays across Vietnam"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
      
      {/* Content container */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Khám phá nơi ở độc đáo tại Việt Nam
            </h1>
            
            <p className="text-xl text-white/90 mb-8">
              Trải nghiệm văn hóa địa phương và tận hưởng kỳ nghỉ tuyệt vời với những lựa chọn homestay hàng đầu
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/homestay-recommend" 
                className="px-6 py-3 bg-accent hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 text-lg"
              >
                Tìm kiếm ngay
              </Link>
              
              <Link 
                to="/about" 
                className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg backdrop-blur-sm transition-colors duration-300 text-lg"
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Optional: Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-20 text-white fill-current">
          <path fillOpacity="0.2" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default ImprovedBanner;