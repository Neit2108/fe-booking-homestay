// src/components/PropertyCard/ConsistentPropertyCard.jsx
import React from 'react';
import { formatPrice } from '../../Utils/PriceUtils';

const ConsistentPropertyCard = ({
  image,
  price,
  name,
  location,
  onClick,
  isPopular = false
}) => {
  return (
    <div 
      className="w-full h-full rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      {/* Image container with fixed aspect ratio */}
      <div className="relative w-full pb-[75%]"> {/* 4:3 aspect ratio */}
        <img
          src={image || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Price tag */}
        <div className="absolute top-0 right-0 bg-accent text-white font-medium p-2 rounded-bl-lg z-10">
          <div className="text-center">
            <div className="text-sm">{formatPrice(price)} VNĐ</div>
            <div className="text-xs">/ngày</div>
          </div>
        </div>
        
        {/* Popular badge */}
        {isPopular && (
          <div className="absolute top-0 left-0 bg-accent text-white py-1 px-3 rounded-br-lg text-sm font-medium">
            Phổ biến
          </div>
        )}
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Property details */}
      <div className="p-3 bg-white">
        <h3 className="font-medium text-lg text-primary line-clamp-1">{name}</h3>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{location}</p>
      </div>
    </div>
  );
};

export default ConsistentPropertyCard;