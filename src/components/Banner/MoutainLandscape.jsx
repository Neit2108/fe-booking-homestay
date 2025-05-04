// src/components/Banners/MountainLandscape.jsx
import React from 'react';
import { FaStar } from 'react-icons/fa';

const MountainLandscape = () => {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      {/* Sky gradient with a blue tone */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-blue-200 to-blue-100"></div>
      
      {/* Clouds */}
      <div className="absolute top-[8%] left-[10%] w-[60%] h-[20%] cloud-1">
        <div className="w-full h-full bg-white rounded-full"></div>
      </div>
      <div className="absolute top-[15%] left-[25%] w-[70%] h-[25%] cloud-2">
        <div className="w-full h-full bg-white rounded-full"></div>
      </div>
      <div className="absolute top-[5%] right-[20%] w-[40%] h-[15%] cloud-3">
        <div className="w-full h-full bg-white rounded-full"></div>
      </div>
      
      {/* Far mountains (blue tones) */}
      <div className="absolute bottom-[45%] left-0 right-0 h-[35%]">
        <div className="absolute inset-0 bg-blue-800 mountain-range opacity-80"></div>
      </div>
      
      {/* Middle mountains (darker green) */}
      <div className="absolute bottom-[35%] left-0 right-0 h-[30%]">
        <div className="absolute inset-0 bg-green-900 mountain-range-2 opacity-90"></div>
      </div>
      
      {/* Near mountains (green) */}
      <div className="absolute bottom-[25%] left-0 right-0 h-[25%]">
        <div className="absolute inset-0 bg-green-800 mountain-range-3"></div>
      </div>
      
      {/* Foreground hills */}
      <div className="absolute bottom-[15%] left-0 right-0 h-[20%]">
        <div className="absolute inset-0 bg-green-700 mountain-range-4"></div>
      </div>
      
      {/* Valley and rice terraces */}
      <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-gradient-to-b from-green-600 to-green-700">
        {/* Rice terraces */}
        <div className="absolute top-[10%] left-[30%] right-[30%] h-[10%] bg-green-500 rounded-md"></div>
        <div className="absolute top-[25%] left-[25%] right-[35%] h-[10%] bg-green-400 rounded-md"></div>
        <div className="absolute top-[40%] left-[20%] right-[40%] h-[10%] bg-green-300 rounded-md"></div>
      </div>
      
      {/* Houses/lodges in the valley */}
      <div className="absolute bottom-[15%] right-[35%]">
        <div className="relative w-8 h-6 bg-white rounded-sm"></div>
        <div className="absolute -top-2 left-0 right-0 h-3 bg-red-800 transform skew-x-6 rounded-t-sm"></div>
      </div>
      
      <div className="absolute bottom-[18%] right-[28%]">
        <div className="relative w-10 h-8 bg-gray-100 rounded-sm"></div>
        <div className="absolute -top-3 left-0 right-0 h-4 bg-red-700 transform skew-x-6 rounded-t-sm"></div>
      </div>
      
      {/* Trees */}
      <div className="absolute bottom-[15%] left-[25%] w-3 h-6">
        <div className="w-1 h-3 bg-amber-900 mx-auto"></div>
        <div className="w-3 h-3 bg-green-800 rounded-full absolute top-0 -translate-y-1/2"></div>
      </div>
      
      <div className="absolute bottom-[17%] left-[28%] w-3 h-5">
        <div className="w-1 h-2 bg-amber-900 mx-auto"></div>
        <div className="w-3 h-3 bg-green-800 rounded-full absolute top-0 -translate-y-1/2"></div>
      </div>
      
      <div className="absolute bottom-[19%] left-[22%] w-2 h-4">
        <div className="w-1 h-2 bg-amber-900 mx-auto"></div>
        <div className="w-2 h-2 bg-green-800 rounded-full absolute top-0 -translate-y-1/2"></div>
      </div>
      
      {/* Mist/clouds between mountains */}
      <div className="absolute bottom-[35%] left-[10%] w-[30%] h-[5%] bg-white rounded-full opacity-70 mist-1"></div>
      <div className="absolute bottom-[40%] left-[40%] w-[40%] h-[7%] bg-white rounded-full opacity-60 mist-2"></div>
      <div className="absolute bottom-[30%] right-[20%] w-[25%] h-[5%] bg-white rounded-full opacity-70 mist-3"></div>
      
      {/* CSS for mountain shapes and animations */}
      <style jsx>{`
        .mountain-range {
          clip-path: polygon(
            0% 100%,
            0% 30%,
            5% 40%,
            10% 35%,
            15% 45%,
            20% 30%,
            25% 45%,
            30% 25%,
            35% 40%,
            40% 20%,
            45% 35%,
            50% 25%,
            55% 40%,
            60% 20%,
            65% 30%,
            70% 40%,
            75% 25%,
            80% 35%,
            85% 45%,
            90% 30%,
            95% 40%,
            100% 35%,
            100% 100%
          );
        }
        
        .mountain-range-2 {
          clip-path: polygon(
            0% 100%,
            0% 40%,
            5% 45%,
            10% 30%,
            15% 50%,
            20% 35%,
            25% 50%,
            30% 30%,
            35% 45%,
            40% 25%,
            45% 40%,
            50% 30%,
            55% 45%,
            60% 25%,
            65% 35%,
            70% 45%,
            75% 30%,
            80% 40%,
            85% 50%,
            90% 35%,
            95% 45%,
            100% 30%,
            100% 100%
          );
        }
        
        .mountain-range-3 {
          clip-path: polygon(
            0% 100%,
            0% 35%,
            5% 50%,
            10% 40%,
            15% 55%,
            20% 45%,
            25% 60%,
            30% 35%,
            35% 50%,
            40% 30%,
            45% 45%,
            50% 35%,
            55% 50%,
            60% 30%,
            65% 40%,
            70% 50%,
            75% 35%,
            80% 45%,
            85% 55%,
            90% 40%,
            95% 50%,
            100% 35%,
            100% 100%
          );
        }
        
        .mountain-range-4 {
          clip-path: polygon(
            0% 100%,
            0% 45%,
            5% 55%,
            10% 45%,
            15% 60%,
            20% 50%,
            25% 65%,
            30% 40%,
            35% 55%,
            40% 35%,
            45% 50%,
            50% 40%,
            55% 55%,
            60% 35%,
            65% 45%,
            70% 55%,
            75% 40%,
            80% 50%,
            85% 60%,
            90% 45%,
            95% 55%,
            100% 40%,
            100% 100%
          );
        }
        
        .cloud-1 {
          animation: drift-1 30s linear infinite;
          opacity: 0.8;
        }
        
        .cloud-2 {
          animation: drift-2 40s linear infinite;
          opacity: 0.9;
        }
        
        .cloud-3 {
          animation: drift-3 35s linear infinite;
          opacity: 0.7;
        }
        
        .mist-1 {
          animation: mist-float 20s ease-in-out infinite;
        }
        
        .mist-2 {
          animation: mist-float 25s ease-in-out infinite;
          animation-delay: 5s;
        }
        
        .mist-3 {
          animation: mist-float 22s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        @keyframes drift-1 {
          0% { transform: translateX(0); }
          50% { transform: translateX(15%); }
          100% { transform: translateX(0); }
        }
        
        @keyframes drift-2 {
          0% { transform: translateX(0); }
          50% { transform: translateX(-10%); }
          100% { transform: translateX(0); }
        }
        
        @keyframes drift-3 {
          0% { transform: translateX(0); }
          50% { transform: translateX(8%); }
          100% { transform: translateX(0); }
        }
        
        @keyframes mist-float {
          0% { transform: translateY(0) translateX(0); opacity: 0.7; }
          50% { transform: translateY(-10px) translateX(10px); opacity: 0.9; }
          100% { transform: translateY(0) translateX(0); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default MountainLandscape;