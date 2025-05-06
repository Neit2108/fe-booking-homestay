import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import HomeSearch from "../../components/HomeSearch/HomeSearch";
import PromotionCard from "../../components/Card/PromotionCard";
import CountdownTimer from "../../components/Promotion/CountdownTimer";
import PromoCode from "../../components/Promotion/PromoCode";
import PromotionList from "../../components/Promotion/PromotionList";
// Import the updated usePromotions hook
import usePromotions from "../../hooks/usePromotions";

function PromotionsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [currentPromotionIndex, setCurrentPromotionIndex] = useState(0);
  const [showNewsletter, setShowNewsletter] = useState(true);
  const [email, setEmail] = useState('');
  
  // Use the hook with a stable options object - critical to prevent infinite loops
  const promotionOptions = useMemo(() => ({ 
    promotionType: 'Global', 
    active: true 
  }), []);
  
  // Use the hook with memoized options
  const { 
    promotions, 
    featuredPromotions, 
    loading, 
    error,
    applyPromotionCode 
  } = usePromotions(promotionOptions);
  
  // Calculate 24 hours from now for flash sale
  const flashSaleEndDate = useMemo(() => {
    const date = new Date();
    date.setHours(date.getHours() + 24);
    return date;
  }, []);
  
  // Filter promotions by category with proper dependency tracking
  const filteredPromotions = useMemo(() => {
    if (activeTab === 'all') return promotions;
    return promotions.filter(promo => promo.category === activeTab);
  }, [activeTab, promotions]);
  
  const holidayPromotions = useMemo(() => {
    return promotions.filter(promo => promo.category === 'holiday');
  }, [promotions]);
  
  const seasonalPromotions = useMemo(() => {
    return promotions.filter(promo => promo.category === 'seasonal');
  }, [promotions]);
  
  // Reference to interval timer
  const carouselIntervalRef = React.useRef(null);
  
  // Set up carousel rotation AFTER promotions are loaded
  // and only if there are multiple featured promotions to rotate
  useEffect(() => {
    // Clear any existing interval first to prevent multiple intervals
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
      carouselIntervalRef.current = null;
    }
    
    // Only set up interval if we have multiple promotions and they're loaded
    if (!loading && featuredPromotions.length > 1) {
      carouselIntervalRef.current = setInterval(() => {
        setCurrentPromotionIndex(prev => 
          prev === featuredPromotions.length - 1 ? 0 : prev + 1
        );
      }, 7000);
    }
    
    // Clean up on unmount or when dependencies change
    return () => {
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
        carouselIntervalRef.current = null;
      }
    };
  }, [loading, featuredPromotions.length]);
  
  // Reset current index when featuredPromotions changes to avoid index out of bounds
  useEffect(() => {
    if (currentPromotionIndex >= featuredPromotions.length) {
      setCurrentPromotionIndex(0);
    }
  }, [featuredPromotions, currentPromotionIndex]);
  
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

  // Display error message if error occurs
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-[#152C5B] mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-[#B0B0B0] mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-[#4182F9] text-white rounded-lg hover:bg-[#3671E8] transition-colors"
            >
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Featured Promotion Carousel with fixed height to prevent layout shifts
  const renderFeaturedPromotions = () => {
    if (loading) {
      return (
        <div className="animate-pulse h-64 md:h-96 bg-gray-200 rounded-xl"></div>
      );
    }
    
    if (featuredPromotions.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 md:h-96">
          <p className="text-[#B0B0B0]">Không có khuyến mãi đặc biệt</p>
        </div>
      );
    }
    
    // Safety check for index out of bounds
    const safeIndex = currentPromotionIndex < featuredPromotions.length 
      ? currentPromotionIndex 
      : 0;
    
    return (
      <div className="relative h-full">
        {featuredPromotions.map((promo, index) => (
          <div
            key={promo.id || index}
            className={`absolute inset-0 w-full transition-opacity duration-500 ${
              index === safeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            aria-hidden={index !== safeIndex}
          >
            <PromotionCard
              variant="featured"
              data={promo}
              onClick={() => handlePromoClick(promo.id)}
            />
          </div>
        ))}
        
        {/* Carousel indicators - only show if multiple promotions */}
        {featuredPromotions.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            {featuredPromotions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPromotionIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === safeIndex 
                    ? "bg-[#4182F9]" : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Switch to promotion ${index + 1}`}
                aria-current={index === safeIndex}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        {/* Featured promotion carousel */}
        <section className="w-full py-12 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="h-64 md:h-96">
              {renderFeaturedPromotions()}
            </div>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[200px]">
              {loading ? (
                [...Array(3)].map((_, index) => (
                  <div key={index} className="h-48 bg-gray-200 rounded-xl animate-pulse"></div>
                ))
              ) : featuredPromotions.length > 0 ? (
                featuredPromotions.slice(0, Math.min(3, featuredPromotions.length)).map((promo, index) => (
                  <PromoCode 
                    key={promo.id || index}
                    code={promo.code} 
                    discount={promo.discount} 
                    expiry={promo.expiry}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-10">
                  <p className="text-[#B0B0B0]">Không có mã khuyến mãi nào</p>
                </div>
              )}
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
            
            {/* Set a minimum height for the promotions container to prevent layout shifts */}
            <div className="min-h-[400px]">
              {loading ? (
                <PromotionList loading={true} columns={3} />
              ) : (
                <PromotionList
                  promotions={filteredPromotions}
                  layout="grid"
                  cardVariant={activeTab === 'holiday' ? 'holiday' : (activeTab === 'seasonal' ? 'theme' : 'basic')}
                  onPromotionClick={handlePromoClick}
                  columns={3}
                  emptyMessage={`Không có khuyến mãi nào${activeTab !== 'all' ? ' trong danh mục này' : ''}`}
                />
              )}
            </div>
          </div>
        </section>

        {/* Holiday promotions section - Only render if we have promotions */}
        {!loading && holidayPromotions.length > 0 && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-2xl font-bold text-[#152C5B] mb-2">
                Khuyến mãi theo ngày lễ
              </h2>
              <p className="text-[#B0B0B0] mb-8">
                Đặt phòng sớm cho các dịp lễ và nhận ưu đãi đặc biệt
              </p>

              <PromotionList
                promotions={holidayPromotions}
                layout="grid"
                cardVariant="holiday"
                onPromotionClick={handlePromoClick}
                columns={3}
              />
            </div>
          </section>
        )}

        {/* Seasonal theme promotions - Only render if we have promotions */}
        {!loading && seasonalPromotions.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-2xl font-bold text-[#152C5B] mb-2">
                Khuyến mãi theo chủ đề
              </h2>
              <p className="text-[#B0B0B0] mb-8">
                Khám phá những ưu đãi theo chủ đề yêu thích của bạn
              </p>

              <PromotionList
                promotions={seasonalPromotions}
                layout="grid"
                cardVariant="theme"
                onPromotionClick={handlePromoClick}
                columns={4}
              />
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