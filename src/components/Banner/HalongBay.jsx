// src/components/Banners/HalongBay.jsx
import React from 'react';
import { FaStar } from 'react-icons/fa';

const HalongBay = () => {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-300 to-sky-400"></div>
      
      {/* Water gradient - takes up 70% of the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-b from-blue-400 to-blue-600 water"></div>
      
      {/* Limestone karsts/islands */}
      <div className="absolute left-[5%] bottom-[30%] w-[15%] h-[60%] bg-emerald-900 rounded-t-3xl shadow-lg"></div>
      <div className="absolute left-[15%] bottom-[30%] w-[18%] h-[55%] bg-emerald-800 rounded-t-3xl shadow-lg"></div>
      <div className="absolute left-[30%] bottom-[30%] w-[12%] h-[50%] bg-emerald-700 rounded-t-3xl shadow-lg"></div>
      <div className="absolute left-[45%] bottom-[30%] w-[20%] h-[65%] bg-emerald-800 rounded-t-3xl shadow-lg"></div>
      <div className="absolute right-[10%] bottom-[30%] w-[22%] h-[60%] bg-emerald-900 rounded-t-3xl shadow-lg"></div>
      
      {/* Vegetation on karsts */}
      <div className="absolute left-[5%] bottom-[60%] w-[15%] h-[30%] bg-green-800 rounded-t-3xl"></div>
      <div className="absolute left-[15%] bottom-[55%] w-[18%] h-[25%] bg-green-700 rounded-t-3xl"></div>
      <div className="absolute left-[30%] bottom-[50%] w-[12%] h-[20%] bg-green-800 rounded-t-3xl"></div>
      <div className="absolute left-[45%] bottom-[65%] w-[20%] h-[30%] bg-green-700 rounded-t-3xl"></div>
      <div className="absolute right-[10%] bottom-[60%] w-[22%] h-[30%] bg-green-800 rounded-t-3xl"></div>
      
      {/* Traditional boats */}
      <div className="absolute bottom-[35%] left-[25%]">
        <div className="relative w-20 h-6 bg-gray-200 rounded-sm boat"></div>
        <div className="absolute top-[-8px] left-[8px] w-1 h-10 bg-gray-700"></div>
        <div className="absolute top-[-8px] right-[8px] w-1 h-10 bg-gray-700"></div>
      </div>
      
      <div className="absolute bottom-[40%] left-[60%]">
        <div className="relative w-24 h-7 bg-gray-100 rounded-sm boat"></div>
        <div className="absolute top-[-10px] left-[10px] w-1 h-12 bg-gray-800"></div>
        <div className="absolute top-[-10px] right-[10px] w-1 h-12 bg-gray-800"></div>
        
        {/* Vietnamese flag on boat */}
        <div className="absolute top-[-20px] left-[10px] w-3 h-2">
          <div className="w-full h-full bg-red-600 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <FaStar className="text-yellow-400 w-full h-full" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-[38%] left-[40%]">
        <div className="relative w-16 h-5 bg-gray-300 rounded-sm boat"></div>
        <div className="absolute top-[-6px] left-[6px] w-1 h-8 bg-gray-700"></div>
      </div>
      
      {/* Larger tourist boat */}
      <div className="absolute bottom-[37%] right-[30%]">
        <div className="relative w-32 h-12 bg-white rounded-md boat">
          <div className="absolute top-2 left-2 right-2 h-4 bg-blue-500 rounded"></div>
          <div className="absolute top-7 left-4 right-4 h-2 bg-blue-400 rounded"></div>
        </div>
        <div className="absolute top-[-8px] left-[16px] w-1 h-10 bg-gray-800"></div>
        
        {/* Vietnamese flag on boat */}
        <div className="absolute top-[-18px] left-[16px] w-3 h-2">
          <div className="w-full h-full bg-red-600 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <FaStar className="text-yellow-400 w-full h-full" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Water reflections and ripples */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] opacity-30">
        <div className="ripple-1"></div>
        <div className="ripple-2"></div>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        .boat {
          animation: gentle-float 4s ease-in-out infinite;
        }
        
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        .water {
          background-size: 200% 200%;
          animation: water-shimmer 10s linear infinite;
        }
        
        @keyframes water-shimmer {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 0%; }
          100% { background-position: 0% 0%; }
        }
        
        .ripple-1, .ripple-2 {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 60%, rgba(255, 255, 255, 0.2) 0%, transparent 60%);
        }
        
        .ripple-2 {
          background: radial-gradient(circle at 70% 40%, rgba(255, 255, 255, 0.15) 0%, transparent 50%);
        }
      `}</style>
    </div>
  );
};

export default HalongBay;