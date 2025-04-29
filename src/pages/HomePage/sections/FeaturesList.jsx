// src/pages/HomePage/sections/FeaturesList.jsx
import React from 'react';
import { RiMapPinUserFill } from "react-icons/ri";
import { TbCameraSpark } from "react-icons/tb";
import { GrMapLocation } from "react-icons/gr";

const FeaturesList = () => {
  const features = [
    {
      icon: <RiMapPinUserFill size={32} className="text-accent"/>,
      count: "2500",
      label: "khách hàng",
      description: "đã sử dụng dịch vụ",
    },
    {
      icon: <TbCameraSpark size={32} className="text-accent"/>,
      count: "200",
      label: "khoảnh khắc",
      description: "được lưu lại mỗi ngày",
    },
    {
      icon: <GrMapLocation size={32} className="text-accent"/>,
      count: "100",
      label: "địa điểm",
      description: "trên khắp Việt Nam",
    },
  ];

  return (
    <section className="mt-20 py-10 bg-gray-50 rounded-2xl">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-medium text-primary text-center mb-8">
          Trải nghiệm cùng HomiesStay
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-blue-50 p-4 rounded-full mb-4">
                {feature.icon}
              </div>
              
              <div className="mt-2">
                <span className="text-3xl font-bold text-accent">{feature.count}</span>
                <span className="text-lg text-primary ml-2">{feature.label}</span>
              </div>
              
              <p className="text-gray-500 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesList;