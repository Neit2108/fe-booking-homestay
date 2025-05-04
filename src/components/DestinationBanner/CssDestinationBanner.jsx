// src/components/DestinationBanner/CssDestinationBanner.jsx
import { useState, useEffect } from 'react';
import { FaStar, FaFlag, FaHome, FaMountain, FaUmbrellaBeach } from 'react-icons/fa';
import "./DestinationBanner.css";

const CssDestinationBanner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Calculate today's date to determine if it's near April 30th
  const today = new Date();
  const isApril = today.getMonth() === 3; // April is month 3 (0-indexed)
  const isNearHoliday = isApril && today.getDate() >= 25;
  
  // Destination banners content - all created with CSS
  const banners = [
    {
      id: 1,
      name: "Vietnamese Flag",
      render: () => (
        <div className="relative w-full h-full bg-[#d81921] overflow-hidden">
          {/* Yellow star */}
          <div className="absolute inset-0 flex items-center justify-center animate-gentle-wave">
            <div className="w-1/3 h-1/3 text-[#ffd900]">
              <svg viewBox="0 0 512 512" fill="currentColor">
                <path d="M256,0l58.9,190.5H512L354.5,308.5L413.4,499L256,381L98.6,499l58.9-190.5L0,190.5h197.1L256,0z"/>
              </svg>
            </div>
          </div>
          
          {/* Wave animation overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="wave-pattern"></div>
          </div>
        </div>
      ),
      label: isNearHoliday 
        ? "Chào mừng ngày Thống nhất đất nước 30/4" 
        : "Cờ Tổ quốc Việt Nam"
    },
    {
      id: 2,
      name: "Ha Long Bay",
      render: () => (
        <div className="relative w-full h-full overflow-hidden">
          {/* Sky and sea gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-blue-400 to-blue-600"></div>
          
          {/* Rock formations */}
          <div className="absolute top-[10%] left-[5%] w-[20%] h-[70%] bg-emerald-800 rounded-t-3xl"></div>
          <div className="absolute top-[15%] left-[15%] w-[15%] h-[65%] bg-emerald-800 rounded-t-2xl"></div>
          <div className="absolute top-[20%] left-[25%] w-[18%] h-[60%] bg-emerald-700 rounded-t-3xl"></div>
          <div className="absolute top-[15%] right-[5%] w-[22%] h-[65%] bg-emerald-800 rounded-t-2xl"></div>
          <div className="absolute top-[10%] right-[20%] w-[15%] h-[70%] bg-emerald-900 rounded-t-3xl"></div>
          
          {/* Waves */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3">
            <div className="wave-animation"></div>
          </div>
          
          {/* Boats */}
          <div className="absolute bottom-[20%] left-[30%] w-[15%] h-[10%]">
            <div className="w-full h-full bg-gray-200 rounded-md"></div>
            <div className="absolute top-[-30%] left-[45%] w-[10%] h-[50%] bg-gray-600"></div>
          </div>
          
          <div className="absolute bottom-[22%] right-[35%] w-[10%] h-[8%]">
            <div className="w-full h-full bg-gray-300 rounded-md"></div>
            <div className="absolute top-[-40%] left-[45%] w-[10%] h-[60%] bg-gray-700"></div>
          </div>
          
          {/* Smaller boats */}
          <div className="absolute bottom-[18%] left-[10%] w-[8%] h-[4%] bg-gray-400 rounded-md"></div>
          <div className="absolute bottom-[16%] right-[15%] w-[6%] h-[3%] bg-gray-400 rounded-md"></div>
          
          {/* Vietnamese flag on boat */}
          <div className="absolute bottom-[30%] left-[35%] w-[3%] h-[5%]">
            <div className="w-full h-full bg-red-600 relative animate-gentle-sway">
              <div className="absolute inset-0 flex items-center justify-center">
                <FaStar className="text-yellow-400 w-3/5 h-3/5" />
              </div>
            </div>
          </div>
        </div>
      ),
      label: "Vịnh Hạ Long - Di sản thiên nhiên thế giới"
    },
    {
      id: 3,
      name: "Mountain Landscape",
      render: () => (
        <div className="relative w-full h-full overflow-hidden">
          {/* Sky background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-200 to-gray-100"></div>
          
          {/* Clouds */}
          <div className="absolute top-[15%] left-[10%] w-[30%] h-[20%] bg-white rounded-full opacity-80 animate-gentle-clouds"></div>
          <div className="absolute top-[25%] left-[25%] w-[40%] h-[15%] bg-white rounded-full opacity-90 animate-gentle-clouds delay-300"></div>
          <div className="absolute top-[10%] right-[15%] w-[25%] h-[18%] bg-white rounded-full opacity-70 animate-gentle-clouds delay-500"></div>
          
          {/* Far mountains */}
          <div className="absolute bottom-[30%] left-0 right-0 h-[40%]">
            <div className="absolute inset-0 bg-emerald-900 mountain-range opacity-80"></div>
          </div>
          
          {/* Middle mountains */}
          <div className="absolute bottom-[25%] left-0 right-0 h-[35%]">
            <div className="absolute inset-0 bg-emerald-800 mountain-range-2 opacity-90"></div>
          </div>
          
          {/* Near mountains */}
          <div className="absolute bottom-[20%] left-0 right-0 h-[30%]">
            <div className="absolute inset-0 bg-emerald-700 mountain-range-3"></div>
          </div>
          
          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-emerald-600"></div>
          
          {/* Rice paddies */}
          <div className="absolute bottom-[20%] left-[30%] right-[30%] h-[5%]">
            <div className="h-full w-full bg-emerald-400 rounded-md"></div>
          </div>
          
          <div className="absolute bottom-[25%] left-[35%] right-[40%] h-[5%]">
            <div className="h-full w-full bg-emerald-300 rounded-md"></div>
          </div>
          
          {/* Traditional mountain house */}
          <div className="absolute bottom-[18%] left-1/2 transform -translate-x-1/2 w-1/6 h-1/6">
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gray-800 skew-y-12"></div>
            <div className="absolute top-1/4 left-[5%] right-[5%] bottom-0 bg-amber-700"></div>
          </div>
          
          {/* Trees */}
          <div className="absolute bottom-[20%] left-[20%] w-[5%] h-[10%]">
            <div className="w-[20%] h-[40%] bg-amber-900 mx-auto"></div>
            <div className="w-full h-[60%] bg-green-800 rounded-full absolute top-0 -translate-y-1/2"></div>
          </div>
          
          <div className="absolute bottom-[20%] right-[25%] w-[4%] h-[8%]">
            <div className="w-[20%] h-[40%] bg-amber-900 mx-auto"></div>
            <div className="w-full h-[60%] bg-green-800 rounded-full absolute top-0 -translate-y-1/2"></div>
          </div>
        </div>
      ),
      label: "Miền núi Sapa hùng vĩ"
    },
    {
      id: 4,
      name: "Cultural Experience",
      render: () => (
        <div className="relative w-full h-full overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-200"></div>
          
          {/* Traditional patterns */}
          <div className="absolute inset-0 opacity-10 cultural-pattern"></div>
          
          {/* Traditional Vietnamese house */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-1/2">
            {/* Main roof */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1/3 bg-gradient-to-b from-red-800 to-red-900 curved-roof"></div>
            
            {/* House body */}
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-4/5 h-3/4 bg-amber-700 flex flex-col items-center">
              {/* Windows and door arrangement */}
              <div className="flex justify-between w-full h-full p-4">
                {/* Left window */}
                <div className="w-1/4 h-1/3 border-2 border-amber-900 bg-amber-300 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 border border-amber-900 grid grid-cols-2 grid-rows-2">
                    <div className="border border-amber-900"></div>
                    <div className="border border-amber-900"></div>
                    <div className="border border-amber-900"></div>
                    <div className="border border-amber-900"></div>
                  </div>
                </div>
                
                {/* Central door */}
                <div className="w-1/3 h-2/3 bg-red-900 rounded-t-lg flex items-center justify-center">
                  <div className="w-2/3 h-2/3 border-2 border-yellow-800 flex flex-col">
                    <div className="h-1/2 border-b border-yellow-800"></div>
                  </div>
                </div>
                
                {/* Right window */}
                <div className="w-1/4 h-1/3 border-2 border-amber-900 bg-amber-300 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 border border-amber-900 grid grid-cols-2 grid-rows-2">
                    <div className="border border-amber-900"></div>
                    <div className="border border-amber-900"></div>
                    <div className="border border-amber-900"></div>
                    <div className="border border-amber-900"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pillars */}
            <div className="absolute bottom-0 left-[15%] w-[5%] h-3/4 bg-red-900"></div>
            <div className="absolute bottom-0 right-[15%] w-[5%] h-3/4 bg-red-900"></div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-[20%] left-[20%] w-12 h-12 bg-red-600 rounded-full opacity-20"></div>
          <div className="absolute bottom-[20%] right-[20%] w-16 h-16 bg-yellow-500 rounded-full opacity-30"></div>
          
          {/* Lanterns */}
          <div className="absolute top-[15%] right-[30%] w-8 h-12 bg-red-600 rounded-full animate-gentle-float">
            <div className="w-[2px] h-4 bg-amber-900 absolute -top-4 left-1/2 transform -translate-x-1/2"></div>
          </div>
          
          <div className="absolute top-[25%] right-[25%] w-6 h-10 bg-yellow-600 rounded-full animate-gentle-float delay-300">
            <div className="w-[2px] h-3 bg-amber-900 absolute -top-3 left-1/2 transform -translate-x-1/2"></div>
          </div>
          
          {/* Vietnamese flag */}
          <div className="absolute top-[10%] left-[25%] w-[10%] h-[12%]">
            <div className="w-full h-full bg-red-600 relative animate-gentle-sway">
              <div className="absolute inset-0 flex items-center justify-center">
                <FaStar className="text-yellow-400 w-1/2 h-1/2" />
              </div>
            </div>
          </div>
          
          {/* Traditional decorative plants */}
          <div className="absolute bottom-[15%] left-[15%] w-[8%] h-[15%]">
            <div className="w-[15%] h-full bg-green-800 mx-auto"></div>
            <div className="absolute top-0 left-0 w-full h-[40%] bg-green-700 rounded-full transform -translate-y-1/3"></div>
          </div>
          
          <div className="absolute bottom-[15%] right-[15%] w-[8%] h-[15%]">
            <div className="w-[15%] h-full bg-green-800 mx-auto"></div>
            <div className="absolute top-0 left-0 w-full h-[40%] bg-green-700 rounded-full transform -translate-y-1/3"></div>
          </div>
        </div>
      ),
      label: "Trải nghiệm văn hóa dân tộc"
    },
    {
      id: 5,
      name: "Beach Landscape",
      render: () => (
        <div className="relative w-full h-full overflow-hidden">
          {/* Sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500"></div>
          
          {/* Sun */}
          <div className="absolute top-[15%] right-[20%] w-16 h-16 bg-yellow-300 rounded-full animate-pulse"></div>
          
          {/* Clouds */}
          <div className="absolute top-[10%] left-[15%] w-24 h-8 bg-white rounded-full"></div>
          <div className="absolute top-[15%] left-[10%] w-16 h-6 bg-white rounded-full"></div>
          <div className="absolute top-[8%] left-[25%] w-20 h-7 bg-white rounded-full"></div>
          
          {/* Ocean */}
          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-blue-500"></div>
          
          {/* Beach */}
          <div className="absolute bottom-0 left-0 right-0 h-[15%]">
            <div className="absolute bottom-0 left-0 right-0 h-full bg-amber-100 rounded-tl-[100%] rounded-tr-[100%]"></div>
          </div>
          
          {/* Palm trees */}
          <div className="absolute bottom-[15%] left-[20%]">
            <div className="w-3 h-24 bg-amber-800 rounded-full mx-auto"></div>
            <div className="absolute -top-6 -left-8 w-16 h-12 bg-green-800 rounded-tl-full rounded-tr-none rounded-bl-none rounded-br-full transform rotate-15"></div>
            <div className="absolute -top-12 -left-2 w-16 h-12 bg-green-800 rounded-tl-full rounded-tr-none rounded-bl-none rounded-br-full transform -rotate-15"></div>
            <div className="absolute -top-6 -right-8 w-16 h-12 bg-green-800 rounded-tl-none rounded-tr-full rounded-bl-full rounded-br-none transform -rotate-15"></div>
          </div>
          
          <div className="absolute bottom-[15%] right-[25%]">
            <div className="w-3 h-28 bg-amber-800 rounded-full mx-auto"></div>
            <div className="absolute -top-6 -left-8 w-16 h-12 bg-green-800 rounded-tl-full rounded-tr-none rounded-bl-none rounded-br-full transform rotate-15"></div>
            <div className="absolute -top-12 -left-2 w-16 h-12 bg-green-800 rounded-tl-full rounded-tr-none rounded-bl-none rounded-br-full transform -rotate-10"></div>
            <div className="absolute -top-6 -right-8 w-16 h-12 bg-green-800 rounded-tl-none rounded-tr-full rounded-bl-full rounded-br-none transform -rotate-15"></div>
          </div>
          
          {/* Beach hut */}
          <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 w-[15%] h-[15%]">
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-amber-800 rounded-t-lg"></div>
            <div className="absolute top-1/3 left-[10%] right-[10%] bottom-0 bg-amber-300"></div>
          </div>
          
          {/* Vietnamese flag */}
          <div className="absolute top-[20%] left-[40%] w-[5%] h-[7%]">
            <div className="w-full h-full bg-red-600 relative animate-gentle-sway">
              <div className="absolute inset-0 flex items-center justify-center">
                <FaStar className="text-yellow-400 w-1/2 h-1/2" />
              </div>
            </div>
          </div>
          
          {/* Waves */}
          <div className="absolute bottom-[15%] left-0 right-0 h-[3%]">
            <div className="w-full h-full bg-blue-400 opacity-70 wave-pattern"></div>
          </div>
          
          <div className="absolute bottom-[18%] left-0 right-0 h-[2%]">
            <div className="w-full h-full bg-blue-300 opacity-50 wave-pattern-2"></div>
          </div>
        </div>
      ),
      label: "Biển đảo Việt Nam"
    }
  ];

  // Effect for rotating banner images every 10 seconds
  useEffect(() => {
    if (isPaused) return;

    const intervalId = setInterval(() => {
      setCurrentBanner((prevIndex) => (prevIndex + 1) % banners.length);
    }, 10000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [isPaused, banners.length]);

  // Handle manually changing the banner
  const goToBanner = (index) => {
    setCurrentBanner(index);
  };

  return (
    <div 
      className="relative w-full h-full rounded-3xl shadow-lg overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Banner content - CSS-based designs */}
      {banners.map((banner, index) => (
        <div 
          key={banner.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            currentBanner === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {banner.render()}
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
          className={`bg-accent h-full ${isPaused ? '' : 'animate-progress'}`}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        ></div>
      </div>
      
      {/* Extra CSS definitions for patterns and shapes */}
      <style jsx>{`
        .delay-300 {
          animation-delay: 300ms;
        }
        
        .delay-500 {
          animation-delay: 500ms;
        }
        
        .wave-pattern {
          background: linear-gradient(45deg, transparent 45%, rgba(255, 255, 255, 0.2) 45%, rgba(255, 255, 255, 0.2) 55%, transparent 55%);
          background-size: 20px 20px;
          width: 100%;
          height: 100%;
          animation: gentle-wave 10s linear infinite;
        }
        
        .wave-pattern-2 {
          background: linear-gradient(45deg, transparent 45%, rgba(255, 255, 255, 0.3) 45%, rgba(255, 255, 255, 0.3) 55%, transparent 55%);
          background-size: 15px 15px;
          width: 100%;
          height: 100%;
          animation: gentle-wave 7s linear infinite reverse;
        }
        
        .cultural-pattern {
          background-image: 
            linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%), 
            linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
        
        .wave-animation {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, #3b82f6 0%, #0ea5e9 80%, #38bdf8 100%);
          clip-path: polygon(
            0% 0%,
            5% 10%,
            10% 0%,
            20% 15%,
            30% 5%,
            40% 20%,
            50% 0%,
            60% 15%,
            70% 5%,
            80% 10%,
            90% 0%,
            100% 5%,
            100% 100%,
            0% 100%
          );
          animation: gentle-wave 8s linear infinite;
        }
        
        .mountain-range {
          clip-path: polygon(
            0% 100%,
            0% 60%,
            10% 70%,
            20% 40%,
            30% 55%,
            40% 30%,
            50% 65%,
            60% 50%,
            70% 60%,
            80% 45%,
            90% 70%,
            100% 60%,
            100% 100%
          );
        }
        
        .mountain-range-2 {
          clip-path: polygon(
            0% 100%,
            0% 70%,
            5% 60%,
            15% 75%,
            25% 55%,
            35% 65%,
            45% 45%,
            55% 60%,
            65% 40%,
            75% 55%,
            85% 65%,
            95% 50%,
            100% 60%,
            100% 100%
          );
        }
        
        .mountain-range-3 {
          clip-path: polygon(
            0% 100%,
            0% 80%,
            10% 65%,
            20% 75%,
            30% 60%,
            40% 80%,
            50% 50%,
            60% 70%,
            70% 65%,
            80% 75%,
            90% 60%,
            100% 80%,
            100% 100%
          );
        }
        
        .curved-roof {
          border-radius: 50% 50% 0 0 / 20% 20% 0 0;
        }
      `}</style>
    </div>
  );
};

export default CssDestinationBanner;