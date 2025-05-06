// src/components/Banners/DestinationBanner.jsx
import React, { useState, useEffect } from 'react';
import RealisticVietnameseFlag from '../Banner/VietnameseFlag';

const DestinationBanner = ({ 
  images = {
    halongBay: "https://res.cloudinary.com/dbswzktwo/image/upload/v1745398086/places/satrwrb8nh698pc07mld.jpg",
    sapaMountains: "https://res.cloudinary.com/dbswzktwo/image/upload/v1745398146/places/fwhmspmsqmcpsrfujh4h.jpg",
    culturalImage: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1000"
  },
  labels = {
    flag: null, // Will use default
    halongBay: "Vịnh Hạ Long - Di sản thiên nhiên thế giới",
    sapaMountains: "Miền núi Sapa hùng vĩ",
    culturalImage: "Văn hóa Việt Nam đặc sắc"
  },
  rotateDuration = 10000, // Duration each banner appears (in milliseconds)
  includeCulturalBanner = false // Option to include a 4th cultural banner
}) => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Calculate today's date to determine if it's near April 30th
  const today = new Date();
  const isApril = today.getMonth() === 3; // April is month 3 (0-indexed)
  const isNearHoliday = isApril && today.getDate() >= 25;
  
  // Default flag label based on date
  const defaultFlagLabel = isNearHoliday 
    ? "Chào mừng ngày Thống nhất đất nước 30/4" 
    : "Cờ Tổ quốc Việt Nam";
  
  // Generate banners array using provided images and labels
  const generateBanners = () => {
    const bannersArray = [
      {
        id: 1,
        type: 'component',
        component: <RealisticVietnameseFlag />,
        label: labels.flag || defaultFlagLabel
      },
      {
        id: 2,
        type: 'image',
        imageUrl: images.halongBay,
        label: labels.halongBay
      },
      {
        id: 3,
        type: 'image',
        imageUrl: images.sapaMountains,
        label: labels.sapaMountains
      }
    ];
    
    if (includeCulturalBanner) {
      bannersArray.push({
        id: 4,
        type: 'image',
        imageUrl: images.culturalImage,
        label: labels.culturalImage
      });
    }
    
    return bannersArray;
  }
  
  // Generate banners using config props
  const banners = generateBanners();

  // Effect for rotating banner images
  useEffect(() => {
    if (isPaused) return;

    const intervalId = setInterval(() => {
      setCurrentBanner((prevIndex) => (prevIndex + 1) % banners.length);
    }, rotateDuration);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [isPaused, banners.length, rotateDuration]);

  // Handle manually changing the banner
  const goToBanner = (index) => {
    setCurrentBanner(index);
  };

  // Render the banner content based on type (component or image)
  const renderBannerContent = (banner) => {
    if (banner.type === 'component') {
      return banner.component;
    } else if (banner.type === 'image') {
      return (
        <div className="w-full h-full">
          <img 
            src={banner.imageUrl} 
            alt={banner.label} 
            className="w-full h-full object-cover"
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      className="relative w-full h-full rounded-xl shadow-md overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Banner content */}
      {banners.map((banner, index) => (
        <div 
          key={banner.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            currentBanner === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          aria-hidden={currentBanner !== index}
        >
          {renderBannerContent(banner)}
        </div>
      ))}
      
      {/* Banner label */}
      <div className="absolute bottom-6 left-6 right-6 z-40">
        <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg px-4 py-3 text-white text-center font-medium">
          {banners[currentBanner].label}
        </div>
      </div>
      
      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex space-x-2">
        {banners.map((banner, index) => (
          <button
            key={banner.id}
            onClick={() => goToBanner(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentBanner ? "bg-white w-4" : "bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`View banner ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Timer progress indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 z-50">
        <div 
          className={`bg-blue-500 h-full ${isPaused ? 'transition-none' : 'animate-progress'}`}
          style={{
            animationDuration: `${rotateDuration}ms`
          }}
        ></div>
      </div>
      
      {/* CSS animations */}
      <style jsx="true">{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .animate-progress {
          animation: progress linear infinite;
          animation-play-state: ${isPaused ? 'paused' : 'running'};
        }
      `}</style>
    </div>
  );
};

export default DestinationBanner;