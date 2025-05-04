// src/pages/HomePage/sections/PromotionSection.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PromotionBanner from '../../../components/Promotion/PromotionBanner';

const PromotionSection = () => {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(true);
  
  // Promotion data (can be fetched from API in future)
  const promotionData = {
    title: "Ưu đãi mùa hè 2025",
    subtitle: "Giảm giá đến 30% cho tất cả các đặt phòng từ 15/5 đến 30/5",
    buttonText: "Xem ngay",
    backgroundClass: "bg-gradient-to-r from-[#4182F9] to-[#3671E8]",
  };
  
  const handleViewAllPromotions = () => {
    navigate('/promotion');
  };
  
  if (!showBanner) return null;
  
  return (
    <section className="mt-16 w-full max-w-[1140px]">
      <div className="mb-8">
        <PromotionBanner
          title={promotionData.title}
          subtitle={promotionData.subtitle}
          buttonText={promotionData.buttonText}
          backgroundClass={promotionData.backgroundClass}
          onClose={() => setShowBanner(false)}
        />
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium text-[#152C5B]">Khuyến mãi đặc biệt</h2>
        <button 
          onClick={handleViewAllPromotions}
          className="text-[#4182F9] hover:underline font-medium flex items-center"
        >
          Xem tất cả
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Featured promotions display - can be expanded with actual promotions data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First promotion card */}
        <div 
          className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={handleViewAllPromotions}
        >
          <div className="h-24 bg-gradient-to-r from-red-600 to-red-400 p-6 relative">
            <h3 className="text-xl font-bold text-white">Kỳ nghỉ lễ 30/4 - 1/5</h3>
            <span className="absolute top-2 right-2 bg-white text-red-600 font-bold rounded-full px-3 py-1 text-sm">
              -20%
            </span>
          </div>
          <div className="p-6">
            <p className="text-[#B0B0B0] mb-6">Ưu đãi đặc biệt cho kỳ nghỉ lễ với nhiều quà tặng hấp dẫn và dịch vụ cao cấp.</p>
            <div className="flex gap-2">
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm text-[#152C5B]">Đà Nẵng</span>
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm text-[#152C5B]">Nha Trang</span>
            </div>
          </div>
        </div>
        
        {/* Second promotion card */}
        <div 
          className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={handleViewAllPromotions}
        >
          <div className="h-24 bg-gradient-to-r from-blue-600 to-blue-400 p-6 relative">
            <h3 className="text-xl font-bold text-white">Ưu đãi cho nhóm</h3>
            <span className="absolute top-2 right-2 bg-white text-blue-600 font-bold rounded-full px-3 py-1 text-sm">
              -15%
            </span>
          </div>
          <div className="p-6">
            <p className="text-[#B0B0B0] mb-6">Đặt phòng cho nhóm từ 6 người trở lên, nhận ngay ưu đãi 15% tổng hóa đơn và dịch vụ đưa đón miễn phí.</p>
            <div className="flex gap-2">
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm text-[#152C5B]">Toàn quốc</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionSection;