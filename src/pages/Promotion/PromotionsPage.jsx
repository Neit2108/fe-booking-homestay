// src/pages/PromotionsPage/PromotionsPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import HomeSearch from "../../components/HomeSearch/HomeSearch";
import PromotionCard from "../../components/Card/PromotionCard";
import CountdownTimer from "../../components/Promotion/CountdownTimer";
import PromoCode from "../../components/Promotion/PromoCode";

// Sample data - replace with actual API data when ready
const promotionData = [
  {
    id: 1,
    title: "Khuyến mãi tháng 5",
    subtitle: "Chào hè cùng HomiesStay",
    description: "Giảm đến 30% cho tất cả các đặt phòng từ 15/5 đến 30/5, áp dụng cho homestay tại các thành phố biển.",
    code: "SUMMER2025",
    discount: "30%",
    expiry: "30/05/2025",
    category: "seasonal",
    featured: true,
    image: "https://res.cloudinary.com/dbswzktwo/image/upload/v1746276903/avatars/q5gujgw7dxldljhnca3i.jpg",
    bgColor: "bg-gradient-to-r from-[#4182F9] to-[#3671E8]",
    locations: ["Đà Nẵng", "Nha Trang", "Phú Quốc"]
  },
  {
    id: 2,
    title: "Ưu đãi nhóm",
    subtitle: "Đi cùng bạn bè, tiết kiệm hơn",
    description: "Đặt phòng cho nhóm từ 6 người trở lên, nhận ngay ưu đãi 15% tổng hóa đơn và dịch vụ đưa đón miễn phí.",
    code: "GROUP2025",
    discount: "15%",
    expiry: "31/12/2025",
    category: "group",
    featured: true,
    image: "https://res.cloudinary.com/dbswzktwo/image/upload/v1746276970/avatars/ueaec3rxczixkqex8xen.jpg",
    bgColor: "bg-gradient-to-r from-amber-500 to-pink-500",
    locations: ["Tất cả địa điểm"]
  },
  {
    id: 3,
    title: "Kỳ nghỉ dài hạn",
    subtitle: "Ở lâu, giá càng tốt",
    description: "Đặt phòng từ 7 đêm trở lên, tự động được giảm 25% tổng hóa đơn và nâng cấp loại phòng miễn phí nếu còn trống.",
    code: "LONGSTAY",
    discount: "25%",
    expiry: "31/12/2025",
    category: "duration",
    featured: true,
    image: "https://via.placeholder.com/800x400?text=Long+Stay+Promotion",
    bgColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
    locations: ["Tất cả địa điểm"]
  },
  {
    id: 4,
    title: "Kỳ nghỉ lễ 30/4 - 1/5",
    description: "Ưu đãi đặc biệt cho kỳ nghỉ lễ với nhiều quà tặng hấp dẫn và dịch vụ cao cấp.",
    discount: "20%",
    expiry: "01/05/2025",
    category: "holiday",
    featured: false,
    image: "https://via.placeholder.com/800x400?text=Holiday+Promotion",
    bgColor: "bg-red-600",
    locations: ["Đà Nẵng", "Nha Trang", "Phú Quốc"]
  },
  {
    id: 5,
    title: "Nghỉ hè sôi động",
    description: "Khám phá những điểm du lịch hot nhất mùa hè với ưu đãi dành riêng cho gia đình.",
    discount: "15%",
    expiry: "31/08/2025",
    category: "seasonal",
    featured: false,
    image: "https://via.placeholder.com/800x400?text=Summer+Holiday",
    bgColor: "bg-blue-600",
    locations: ["Đà Lạt", "Hạ Long", "Sapa"]
  },
  {
    id: 6,
    title: "Nghỉ lễ Quốc Khánh",
    description: "Đặt trước cho kỳ nghỉ lễ Quốc Khánh và nhận ưu đãi độc quyền cùng dịch vụ VIP.",
    discount: "25%",
    expiry: "02/09/2025",
    category: "holiday",
    featured: false,
    image: "https://via.placeholder.com/800x400?text=National+Day",
    bgColor: "bg-green-600",
    locations: ["TP. Hồ Chí Minh", "Hà Nội", "Huế"]
  },
  {
    id: 7,
    title: "Du lịch biển",
    description: "Tận hưởng không gian biển xanh cát trắng với nhiều ưu đãi hấp dẫn.",
    discount: "Giảm 15%",
    expiry: "30/09/2025",
    category: "seasonal",
    featured: false,
    image: "https://via.placeholder.com/800x400?text=Beach+Travel",
    bgColor: "bg-cyan-600",
    locations: ["Nha Trang", "Phú Quốc", "Đà Nẵng"]
  },
  {
    id: 8,
    title: "Du lịch núi",
    description: "Khám phá vẻ đẹp hùng vĩ của những ngọn núi và không khí trong lành.",
    discount: "Giảm 20%",
    expiry: "30/11/2025",
    category: "seasonal",
    featured: false,
    image: "https://via.placeholder.com/800x400?text=Mountain+Travel",
    bgColor: "bg-green-700",
    locations: ["Sapa", "Đà Lạt", "Mộc Châu"]
  }
];

function PromotionsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [currentPromotionIndex, setCurrentPromotionIndex] = useState(0);
  const [showNewsletter, setShowNewsletter] = useState(true);
  const [email, setEmail] = useState('');
  
  // Calculate 24 hours from now for flash sale
  const flashSaleEndDate = useMemo(() => {
    const date = new Date();
    date.setHours(date.getHours() + 24);
    return date;
  }, []);
  
  // Memoize filtered promotions to prevent unnecessary recalculations
  const featuredPromotions = useMemo(() => {
    return promotionData.filter(promo => promo.featured);
  }, []);
  
  const filteredPromotions = useMemo(() => {
    if (activeTab === 'all') return promotionData;
    return promotionData.filter(promo => promo.category === activeTab);
  }, [activeTab]);
  
  const holidayPromotions = useMemo(() => {
    return promotionData.filter(promo => promo.category === 'holiday');
  }, []);
  
  const seasonalPromotions = useMemo(() => {
    return promotionData.filter(promo => promo.category === 'seasonal');
  }, []);
  
  // Set up carousel rotation if we have multiple featured promotions
  useEffect(() => {
    if (featuredPromotions.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentPromotionIndex(prev => 
        prev === featuredPromotions.length - 1 ? 0 : prev + 1
      );
    }, 7000);
    
    return () => clearInterval(interval);
  }, [featuredPromotions.length]);
  
  const handlePromoClick = (id) => {
    console.log(`Clicked promotion: ${id}`);
    // You can implement navigation to promotion details here
    // navigate(`/promotions/${id}`);
  };
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      console.log(`Subscribing email: ${email}`);
      alert('Cảm ơn bạn đã đăng ký nhận thông tin khuyến mãi!');
      setEmail('');
    }
  };
  
  const handleTimerComplete = () => {
    console.log('Flash sale has ended');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        {/* Featured promotion carousel */}
        <section className="w-full py-12 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 max-w-6xl">
            {featuredPromotions.length > 0 ? (
              <div className="relative">
                {featuredPromotions.map((promo, index) => (
                  <div
                    key={promo.id}
                    className={`transition-opacity duration-500 ${
                      index === currentPromotionIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
                    }`}
                  >
                    <PromotionCard
                      variant="featured"
                      data={promo}
                      onClick={() => handlePromoClick(promo.id)}
                    />
                  </div>
                ))}
                
                {/* Carousel indicators */}
                {featuredPromotions.length > 1 && (
                  <div className="flex justify-center gap-2 mt-4">
                    {featuredPromotions.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPromotionIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentPromotionIndex 
                            ? "bg-[#4182F9]" : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Switch to promotion ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-[#B0B0B0]">Không có khuyến mãi đặc biệt</p>
              </div>
            )}
          </div>
        </section>

        {/* Search section */}
        <section className="py-8 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-[#152C5B] mb-4 text-center">
                Tìm homestay với khuyến mãi ưu đãi
              </h2>
              <HomeSearch />
            </div>
          </div>
        </section>

        {/* Flash sale countdown */}
        <section className="py-10 bg-gradient-to-r from-[#4182F9] to-[#3671E8] text-white">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h2 className="text-3xl font-bold mb-3">
              Flash Sale!
            </h2>
            <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
              Nhanh tay đặt phòng trong 24 giờ tới với giá siêu ưu đãi. Giảm đến 40% cho tất cả các homestay cao cấp.
            </p>
            
            <CountdownTimer 
              endDate={flashSaleEndDate} 
              onComplete={handleTimerComplete}
              className="mb-8"
            />
            
            <button 
              onClick={() => navigate('/homestay-recommend?flashsale=true')}
              className="px-8 py-3 bg-white text-[#4182F9] rounded-lg shadow-lg font-medium hover:bg-blue-50 transition-all duration-300 text-lg"
            >
              Đặt ngay
            </button>
          </div>
        </section>

        {/* Promotion codes section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-bold text-[#152C5B] mb-2">
              Mã khuyến mãi đặc biệt
            </h2>
            <p className="text-[#B0B0B0] mb-8">
              Sử dụng các mã khuyến mãi dưới đây để được giảm giá khi đặt phòng
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PromoCode 
                code="SUMMER2025" 
                discount="30%" 
                expiry="30/05/2025"
              />
              <PromoCode 
                code="GROUP2025" 
                discount="15%" 
                expiry="31/12/2025"
              />
              <PromoCode 
                code="LONGSTAY" 
                discount="25%" 
                expiry="31/12/2025"
              />
            </div>
          </div>
        </section>

        {/* Tabbed promotions section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-bold text-[#152C5B] mb-8">
              Tất cả khuyến mãi
            </h2>
            
            {/* Tabs */}
            <div className="flex flex-wrap border-b border-gray-200 mb-8">
              <button
                className={`py-2 px-4 font-medium text-sm mr-4 border-b-2 transition-colors ${
                  activeTab === 'all' 
                    ? 'border-[#4182F9] text-[#4182F9]' 
                    : 'border-transparent text-[#B0B0B0] hover:text-[#152C5B]'
                }`}
                onClick={() => setActiveTab('all')}
              >
                Tất cả
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm mr-4 border-b-2 transition-colors ${
                  activeTab === 'holiday' 
                    ? 'border-[#4182F9] text-[#4182F9]' 
                    : 'border-transparent text-[#B0B0B0] hover:text-[#152C5B]'
                }`}
                onClick={() => setActiveTab('holiday')}
              >
                Ngày lễ
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm mr-4 border-b-2 transition-colors ${
                  activeTab === 'seasonal' 
                    ? 'border-[#4182F9] text-[#4182F9]' 
                    : 'border-transparent text-[#B0B0B0] hover:text-[#152C5B]'
                }`}
                onClick={() => setActiveTab('seasonal')}
              >
                Theo mùa
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'group' 
                    ? 'border-[#4182F9] text-[#4182F9]' 
                    : 'border-transparent text-[#B0B0B0] hover:text-[#152C5B]'
                }`}
                onClick={() => setActiveTab('group')}
              >
                Nhóm & Gia đình
              </button>
            </div>
            
            {/* Display filtered promotions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredPromotions.map(promo => (
                <PromotionCard
                  key={promo.id}
                  variant={promo.category === 'holiday' ? 'holiday' : (promo.category === 'seasonal' ? 'theme' : 'basic')}
                  data={promo}
                  onClick={() => handlePromoClick(promo.id)}
                />
              ))}
              {filteredPromotions.length === 0 && (
                <div className="col-span-3 text-center py-10">
                  <p className="text-[#B0B0B0]">Không có khuyến mãi nào trong danh mục này</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Holiday promotions section */}
        {holidayPromotions.length > 0 && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-2xl font-bold text-[#152C5B] mb-2">
                Khuyến mãi theo ngày lễ
              </h2>
              <p className="text-[#B0B0B0] mb-8">
                Đặt phòng sớm cho các dịp lễ và nhận ưu đãi đặc biệt
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {holidayPromotions.map(promo => (
                  <PromotionCard
                    key={promo.id}
                    variant="holiday"
                    data={promo}
                    onClick={() => handlePromoClick(promo.id)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Seasonal theme promotions */}
        {seasonalPromotions.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-2xl font-bold text-[#152C5B] mb-2">
                Khuyến mãi theo chủ đề
              </h2>
              <p className="text-[#B0B0B0] mb-8">
                Khám phá những ưu đãi theo chủ đề yêu thích của bạn
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {seasonalPromotions.map(promo => (
                  <PromotionCard
                    key={promo.id}
                    variant="theme"
                    data={promo}
                    onClick={() => handlePromoClick(promo.id)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter subscription */}
        {showNewsletter && (
          <section className="py-12 bg-white border-t border-gray-100 relative">
            <div className="container mx-auto px-4 max-w-2xl text-center relative">
              <button
                onClick={() => setShowNewsletter(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                aria-label="Close newsletter subscription"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <h2 className="text-2xl font-bold text-[#152C5B] mb-3">
                Nhận thông tin khuyến mãi
              </h2>
              <p className="text-[#B0B0B0] mb-6">
                Đăng ký để nhận thông báo về các ưu đãi và khuyến mãi mới nhất
              </p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Email của bạn" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4182F9] focus:border-transparent"
                />
                <button 
                  type="submit"
                  className="px-6 py-3 bg-[#4182F9] text-white rounded-lg font-medium hover:bg-[#3671E8] transition-colors duration-300"
                >
                  Đăng ký
                </button>
              </form>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default PromotionsPage;