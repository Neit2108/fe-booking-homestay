// src/components/Hero/Hero.jsx
import React from "react";
import { RiMapPinUserFill } from "react-icons/ri";
import { TbCameraSpark } from "react-icons/tb";
import { GrMapLocation } from "react-icons/gr";
import { FaFlag } from "react-icons/fa";
import DestinationBanner from "../DestinationBanner/DestinationBanner";

function Hero() {
  // Calculate today's date to determine if it's near April 30th
  const today = new Date();
  const isApril = today.getMonth() === 3; // April is month 3 (0-indexed)
  const isNearHoliday = isApril && today.getDate() >= 25;
  const isHoliday = isApril && today.getDate() === 30;

  // Features stats section data
  const features = [
    {
      icon: <RiMapPinUserFill size={32} className="text-blue-500" />,
      count: "2500",
      label: "khách hàng",
    },
    {
      icon: <TbCameraSpark size={32} className="text-blue-500" />,
      count: "200",
      label: "khoảnh khắc",
    },
    {
      icon: <GrMapLocation size={32} className="text-blue-500" />,
      count: "100",
      label: "địa điểm",
    },
  ];

  return (
    <div className="w-full max-w-[1140px] mt-10 max-md:mt-4">
      <div className="flex gap-5 max-md:flex-col max-md:items-center">
        {/* Left Column - Text Content */}
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

            {/* Holiday badge - displayed conditionally near April 30th */}
            {isNearHoliday && (
              <div className="mt-4 bg-red-600 text-white px-4 py-2 rounded-full inline-flex items-center gap-2 animate-pulse">
                <FaFlag className="text-yellow-300" />
                <span>
                  {isHoliday 
                    ? "Chúc mừng ngày Thống nhất 30/4!" 
                    : "Sắp đến ngày Giải phóng miền Nam 30/4"}
                </span>
              </div>
            )}

            <div className="mt-8 flex max-md:justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md px-6 py-3 text-lg text-white font-medium transition-all duration-200 transform hover:scale-105 active:scale-95">
                Xem thêm
              </button>
            </div>

            {/* Stats Feature Section */}
            <div className="mt-20 max-md:mt-10 max-md:flex max-md:justify-center">
              <div className="flex gap-8 max-md:flex-wrap max-md:justify-center">
                {features.map((feature, index) => (
                  <div key={index} className="flex flex-col items-center md:items-start">
                    <div className="bg-blue-50 p-3 rounded-full">
                      {feature.icon}
                    </div>
                    <div className="mt-3 text-center md:text-left">
                      <span className="font-medium text-primary text-xl">{feature.count}</span>
                      <span className="text-gray-600"> {feature.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Banner Section */}
        <div className="w-[57%] max-md:w-full max-md:mt-8 flex items-center justify-center">
          <div className="relative w-full aspect-[4/3]">
            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-full h-full bg-blue-100 rounded-3xl"></div>
            
            {/* Destination Banner Component */}
            <div className="relative z-10 w-full h-full">
              <DestinationBanner />
            </div>
            
            {/* Circular decoration */}
            <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-blue-500 rounded-full z-0 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;