// src/components/PromotionCard/PromotionCard.jsx
import React from "react";
import PropTypes from "prop-types";

/**
 * Reusable promotion card component with multiple variants
 * @param {Object} props Component props
 * @param {string} props.variant 'basic', 'holiday', 'theme', or 'featured'
 * @param {Object} props.data Promotion data object
 * @param {function} props.onClick Function to handle click events
 * @param {string} props.className Additional CSS classes
 */
const PromotionCard = ({
  variant = "basic",
  data,
  onClick,
  className = "",
}) => {
  // Ensure we have data
  if (!data) return null;

  // Basic promotion card (discount and title)
  if (variant === "basic") {
    return (
      <div
        className={`relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 bg-white cursor-pointer ${className}`}
        onClick={() => onClick && onClick(data.id)}
      >
        <div className="p-6">
          <span className="inline-block px-3 py-1 bg-[#4182F9]/10 text-[#4182F9] rounded-full text-sm font-medium mb-4">
            Giảm {data.discount || "Special Offer"}%
          </span>
          <h3 className="text-xl font-bold text-[#152C5B] mb-2">
            {data.title}
          </h3>
          <p className="text-[#B0B0B0] line-clamp-2 mb-4">{data.description}</p>
          {data.expiry && (
            <p className="text-sm text-[#B0B0B0]">
              Hiệu lực đến: <span className="font-medium">{data.expiry}</span>
            </p>
          )}
          <button className="mt-4 px-6 py-2 bg-[#4182F9] text-white rounded-lg hover:bg-[#3671E8] transition-colors">
            Xem chi tiết
          </button>
        </div>
      </div>
    );
  }

  // Holiday promotion card (colored header)
  if (variant === "holiday") {
    return (
      <div
        className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
        onClick={() => onClick && onClick(data.id)}
      >
        <div className={`h-24 ${data.bgColor || "bg-[#4182F9]"} p-6 relative`}>
          <h3 className="text-xl font-bold text-white">{data.title}</h3>
          {data.discount && (
            <span className="absolute top-2 right-2 bg-white text-[#4182F9] font-bold rounded-full px-3 py-1 text-sm">
              -{data.discount}%
            </span>
          )}
        </div>
        <div className="p-6">
          <p className="text-[#B0B0B0] mb-4">{data.description}</p>
          {data.locations && (
            <div className="mb-4">
              <p className="text-sm text-[#B0B0B0] mb-2">Áp dụng tại:</p>
              <div className="flex flex-wrap gap-2">
                {data.locations.map((location, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm text-[#152C5B]"
                  >
                    {location}
                  </span>
                ))}
              </div>
            </div>
          )}
          <button className="w-full px-4 py-2 bg-[#4182F9] hover:bg-[#3671E8] text-white rounded-lg transition-colors duration-300">
            Xem chi tiết
          </button>
        </div>
      </div>
    );
  }

  // Theme promotion card (image background with overlay)
  if (variant === "theme") {
    return (
      <div
        className={`relative group overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer ${className}`}
        onClick={() => onClick && onClick(data.id)}
      >
        <div className="aspect-w-4 aspect-h-3 w-full">
          <div className="w-full h-0 pb-[75%] relative">
            <div
              className="absolute inset-0 bg-gray-300 bg-cover bg-center"
              style={{
                backgroundImage: `url(${
                  data.image || "https://via.placeholder.com/400x300?text=Theme"
                })`,
              }}
            />
          </div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            {data.discount && (
              <span className="bg-[#4182F9] text-white px-2 py-1 rounded-md text-sm font-medium">
                Giảm {data.discount}%
              </span>
            )}
            <h3 className="text-xl font-bold mt-2">{data.title}</h3>
            <p className="text-white/90 text-sm mt-1 line-clamp-2">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    const bgColors = ["bg-[#4182F9]", "bg-[#34D399]", "bg-[#F59E0B]"]; // 3 màu khác nhau
    const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];

    return (
      <div
        className={`rounded-xl overflow-hidden ${randomBg} text-white p-8 ${className}`}
        onClick={() => onClick && onClick(data.id)}
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-2/3">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
              Khuyến mãi đặc biệt
            </span>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              {data.title}
            </h3>
            {data.subtitle && (
              <h4 className="text-xl md:text-2xl font-medium mb-4 text-white opacity-90">
                {data.subtitle}
              </h4>
            )}
            <p className="mb-6 text-white opacity-80 text-lg">
              {data.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {data.code && (
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-sm text-white opacity-80">Mã khuyến mãi</p>
                  <p className="text-xl font-bold text-white">{data.code}</p>
                </div>
              )}
              {data.discount && (
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-sm text-white opacity-80">Giảm giá</p>
                  <p className="text-xl font-bold text-white">
                    {data.discount}
                  </p>
                </div>
              )}
              {data.expiry && (
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-sm text-white opacity-80">Hiệu lực đến</p>
                  <p className="text-xl font-bold text-white">--</p>
                </div>
              )}
            </div>

            <button className="px-6 py-3 bg-white text-[#4182F9] rounded-lg shadow-lg font-medium hover:bg-blue-50 transition-all duration-300">
              Xem chi tiết
            </button>
          </div>

          {data.image && (
            <div className="md:w-1/3 rounded-xl overflow-hidden">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default fallback
  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
      onClick={() => onClick && onClick(data.id)}
    >
      <h3 className="text-xl font-bold text-[#152C5B] mb-2">{data.title}</h3>
      <p className="text-[#B0B0B0] mb-4">{data.description}</p>
      <button className="px-4 py-2 bg-[#4182F9] text-white rounded-lg hover:bg-[#3671E8] transition-colors">
        Xem chi tiết
      </button>
    </div>
  );
};

PromotionCard.propTypes = {
  variant: PropTypes.oneOf(["basic", "holiday", "theme", "featured"]),
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    discount: PropTypes.string,
    image: PropTypes.string,
    code: PropTypes.string,
    expiry: PropTypes.string,
    bgColor: PropTypes.string,
    subtitle: PropTypes.string,
    locations: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default PromotionCard;
