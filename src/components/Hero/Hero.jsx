import { useState, useEffect } from "react";
import { RiMapPinUserFill } from "react-icons/ri";
import { TbCameraSpark } from "react-icons/tb";
import { GrMapLocation } from "react-icons/gr";
import { FaFlag, FaHome, FaMountain, FaUmbrellaBeach, FaStar } from "react-icons/fa";

function Hero() {
  // Banner designs - all created with CSS
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
      label: "Chào mừng ngày Thống nhất đất nước 30/4"
    },
    {
      id: 2,
      name: "Historical Homestay",
      render: () => (
        <div className="relative w-full h-full overflow-hidden">
          {/* Background gradient representing traditional architecture */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900"></div>
          
          {/* Traditional wooden patterns */}
          <div className="absolute inset-0 opacity-30 wooden-pattern"></div>
          
          {/* Stylized house */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-4/5 h-3/5">
              {/* Roof */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1/4 bg-red-800 skew-y-12"></div>
              
              {/* House body */}
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-4/5 h-3/4 bg-amber-600 border-2 border-amber-900 flex flex-col items-center justify-center">
                {/* Door */}
                <div className="w-1/4 h-2/5 bg-amber-900 rounded-t-lg flex items-center justify-center">
                  <div className="w-1/3 h-1/3 rounded-full bg-yellow-400"></div>
                </div>
                
                {/* Windows */}
                <div className="flex justify-between w-4/5 mt-4">
                  <div className="w-1/4 h-8 bg-blue-200 border border-amber-900"></div>
                  <div className="w-1/4 h-8 bg-blue-200 border border-amber-900"></div>
                </div>
              </div>
              
              {/* Vietnamese flag on top */}
              <div className="absolute top-[-5%] right-[20%] w-1/6 h-1/4">
                <div className="h-full w-full bg-red-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FaStar className="text-yellow-400 w-3/5 h-3/5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Small decorative elements */}
          <div className="absolute bottom-4 left-6 w-16 h-16 bg-green-700 rounded-full opacity-70"></div>
          <div className="absolute top-10 left-10 w-10 h-10 bg-green-600 rounded-full opacity-40"></div>
          <div className="absolute bottom-10 right-10 w-12 h-12 bg-green-800 rounded-full opacity-60"></div>
        </div>
      ),
      label: "Nghỉ dưỡng tại những địa điểm lịch sử"
    },
    {
      id: 3,
      name: "Coastal Heritage",
      render: () => (
        <div className="relative w-full h-full overflow-hidden">
          {/* Sky and sea gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-blue-400 to-blue-600"></div>
          
          {/* Waves */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3">
            <div className="wave-animation"></div>
          </div>
          
          {/* Sand */}
          <div className="absolute bottom-0 left-0 right-0 h-1/6 bg-amber-200 rounded-tl-full rounded-tr-full"></div>
          
          {/* Beach hut */}
          <div className="absolute bottom-[16%] left-1/4 w-1/3 h-1/3">
            {/* Roof */}
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-orange-700 rounded-t-lg"></div>
            {/* Base */}
            <div className="absolute top-1/3 left-[10%] right-[10%] bottom-0 bg-orange-300 flex items-center justify-center">
              {/* Door */}
              <div className="w-1/3 h-1/2 bg-orange-900 rounded-t-sm"></div>
            </div>
            {/* Pillars */}
            <div className="absolute bottom-0 left-[5%] w-[5%] h-1/4 bg-orange-800"></div>
            <div className="absolute bottom-0 right-[5%] w-[5%] h-1/4 bg-orange-800"></div>
          </div>
          
          {/* Vietnamese flag */}
          <div className="absolute top-[20%] right-[30%] w-1/6 h-1/6">
            <div className="w-full h-full bg-red-600 relative animate-gentle-sway overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <FaStar className="text-yellow-400 w-3/5 h-3/5" />
              </div>
            </div>
          </div>
          
          {/* Sun */}
          <div className="absolute top-[15%] right-[15%] w-16 h-16 bg-yellow-400 rounded-full animate-pulse"></div>
          
          {/* Palm tree */}
          <div className="absolute bottom-[16%] right-[20%]">
            {/* Trunk */}
            <div className="w-4 h-24 bg-amber-800 rounded-full mx-auto"></div>
            {/* Leaves */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 -rotate-45">
              <div className="w-12 h-16 bg-green-700 rounded-tl-full rounded-tr-none rounded-bl-none rounded-br-full"></div>
            </div>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 rotate-15">
              <div className="w-16 h-12 bg-green-700 rounded-tl-full rounded-tr-none rounded-bl-none rounded-br-full"></div>
            </div>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 rotate-45">
              <div className="w-12 h-16 bg-green-700 rounded-tl-full rounded-tr-none rounded-bl-none rounded-br-full"></div>
            </div>
          </div>
        </div>
      ),
      label: "Biển đảo quê hương"
    },
    {
      id: 4,
      name: "Mountain Retreat",
      render: () => (
        <div className="relative w-full h-full overflow-hidden">
          {/* Sky background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-200 to-gray-100"></div>
          
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
          
          {/* Traditional mountain house */}
          <div className="absolute bottom-[18%] left-1/2 transform -translate-x-1/2 w-1/3 h-1/4">
            {/* Roof */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gray-800 skew-y-12"></div>
            {/* House */}
            <div className="absolute top-1/3 left-[5%] right-[5%] bottom-0 bg-amber-700 flex items-center justify-center">
              <div className="w-1/3 h-2/5 bg-amber-900 rounded-t-lg"></div>
            </div>
          </div>
          
          {/* Vietnamese flag */}
          <div className="absolute top-[40%] right-[20%] w-[8%] h-[10%]">
            <div className="w-full h-full bg-red-600 relative animate-gentle-sway">
              <div className="absolute inset-0 flex items-center justify-center">
                <FaStar className="text-yellow-400 w-3/5 h-3/5" />
              </div>
            </div>
          </div>
          
          {/* Trees */}
          <div className="absolute bottom-[20%] left-[15%] w-12 h-16">
            <div className="w-4 h-6 bg-brown-800 mx-auto"></div>
            <div className="w-12 h-12 bg-green-800 rounded-full absolute -top-8"></div>
          </div>
          <div className="absolute bottom-[20%] right-[15%] w-10 h-14">
            <div className="w-3 h-5 bg-brown-800 mx-auto"></div>
            <div className="w-10 h-10 bg-green-800 rounded-full absolute -top-7"></div>
          </div>
        </div>
      ),
      label: "Miền núi hùng vĩ"
    },
    {
      id: 5,
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
          <div className="absolute top-[15%] right-[30%] w-8 h-12 bg-red-600 rounded-full animate-gentle-float"></div>
          <div className="absolute top-[25%] right-[25%] w-6 h-10 bg-yellow-600 rounded-full animate-gentle-float delay-300"></div>
          
          {/* Vietnamese flag */}
          <div className="absolute top-[10%] left-[25%] w-[10%] h-[12%]">
            <div className="w-full h-full bg-red-600 relative animate-gentle-sway">
              <div className="absolute inset-0 flex items-center justify-center">
                <FaStar className="text-yellow-400 w-1/2 h-1/2" />
              </div>
            </div>
          </div>
        </div>
      ),
      label: "Trải nghiệm văn hóa dân tộc"
    }
  ];

  // State to track the current banner index
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Calculate today's date to determine if it's near April 30th
  const today = new Date();
  const isApril = today.getMonth() === 3; // April is month 3 (0-indexed)
  const isNearHoliday = isApril && today.getDate() >= 25;
  const isHoliday = isApril && today.getDate() === 30;

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

  const currentBannerObj = banners[currentBanner];

  return (
    <div className="w-full max-w-[1140px] mt-10 max-md:mt-4">
      <div className="flex gap-5 max-md:flex-col max-md:items-center">
        <div className="flex flex-col w-[43%] max-md:w-full">
          <div className="font-poppins max-md:text-center">
            <h1 className="text-primary text-4xl md:text-[42px] font-bold leading-tight">
              <span className="block">Quên bận rộn,</span>
              <span className="block">nghỉ dưỡng vui nhộn</span>
            </h1>

            <p className="text-[#B0B0B0] font-light leading-relaxed mt-6 text-base">
              <span className="block">Chúng tôi cung cấp những gì bạn cần</span>
              <span className="block">để tận hưởng cùng với gia đình. </span>
              <span className="block">Thời gian để tạo nên những kỷ niệm đáng nhớ.</span>
            </p>

            {/* Holiday badge */}
            {isNearHoliday && (
              <div className="mt-4 bg-red-600 text-white px-4 py-2 rounded-full inline-flex items-center gap-2 animate-pulse">
                <FaFlag className="text-yellow-300" />
                <span>{isHoliday ? "Chúc mừng ngày Thống nhất 30/4!" : "Sắp đến ngày Giải phóng miền Nam 30/4"}</span>
              </div>
            )}

            <div className="mt-8 flex max-md:justify-center">
              <button className="bg-accent hover:bg-blue-700 rounded-lg shadow-md px-6 py-3 text-lg text-white font-medium transition-all duration-200 transform hover:scale-105 active:scale-95">
                Xem thêm
              </button>
            </div>

            <div className="mt-20 max-md:mt-10 max-md:flex max-md:justify-center">
              <div className="flex gap-8 max-md:flex-wrap max-md:justify-center">
                <div className="flex flex-col items-center md:items-start">
                  <div className="bg-blue-50 p-3 rounded-full">
                    <RiMapPinUserFill size={32} className="text-accent"/>
                  </div>
                  <div className="mt-3 text-center md:text-left">
                    <span className="font-medium text-primary text-xl">2500</span>
                    <span className="text-gray-600"> khách hàng</span>
                  </div>
                </div>

                <div className="flex flex-col items-center md:items-start">
                  <div className="bg-blue-50 p-3 rounded-full">
                    <TbCameraSpark size={32} className="text-accent"/>
                  </div>
                  <div className="mt-3 text-center md:text-left">
                    <span className="font-medium text-primary text-xl">200</span>
                    <span className="text-gray-600"> khoảnh khắc</span>
                  </div>
                </div>

                <div className="flex flex-col items-center md:items-start">
                  <div className="bg-blue-50 p-3 rounded-full">
                    <GrMapLocation size={32} className="text-accent"/>
                  </div>
                  <div className="mt-3 text-center md:text-left">
                    <span className="font-medium text-primary text-xl">100</span>
                    <span className="text-gray-600"> địa điểm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div 
          className="w-[57%] max-md:w-full max-md:mt-8 flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative w-full aspect-[4/3]">
            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-full h-full bg-blue-100 rounded-3xl"></div>
            
            {/* Banner content - CSS-based designs */}
            <div className="relative z-10 w-full h-full rounded-3xl shadow-lg overflow-hidden">
              {currentBannerObj.render()}
              
              {/* Banner label */}
              <div className="absolute bottom-6 left-6 right-6 z-40">
                <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg px-4 py-3 text-white text-center font-medium">
                  {currentBannerObj.label}
                </div>
              </div>
            </div>
            
            {/* Circular decoration */}
            <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-accent rounded-full z-0 animate-pulse"></div>
            
            {/* Banner navigation dots */}
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
                className={`bg-accent h-full ${isPaused ? 'pause-animation' : ''}`}
                style={{
                  animation: isPaused ? 'none' : 'progress 10s linear infinite',
                  animationPlayState: isPaused ? 'paused' : 'running'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS animations and patterns */}
      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        @keyframes gentle-wave {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-5px) translateX(2px); }
          50% { transform: translateY(0) translateX(0); }
          75% { transform: translateY(5px) translateX(-2px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        @keyframes gentle-sway {
          0% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
          100% { transform: rotate(-2deg); }
        }
        
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
        
        .animate-gentle-wave {
          animation: gentle-wave 6s ease-in-out infinite;
        }
        
        .animate-gentle-sway {
          animation: gentle-sway 4s ease-in-out infinite;
        }
        
        .animate-gentle-float {
          animation: gentle-float 5s ease-in-out infinite;
        }
        
        .wave-pattern {
          background: linear-gradient(45deg, transparent 45%, rgba(255, 255, 255, 0.2) 45%, rgba(255, 255, 255, 0.2) 55%, transparent 55%);
          background-size: 20px 20px;
          width: 100%;
          height: 100%;
          animation: gentle-wave 10s linear infinite;
        }
        
        .wooden-pattern {
          background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 20px,
            rgba(0, 0, 0, 0.1) 20px,
            rgba(0, 0, 0, 0.1) 40px
          );
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
}

export default Hero;