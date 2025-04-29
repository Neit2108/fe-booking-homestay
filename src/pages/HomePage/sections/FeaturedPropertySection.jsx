// src/pages/HomePage/sections/FeaturedPropertySection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FeaturedPropertySection = ({ properties }) => {
  const navigate = useNavigate();

  const goToPropertyDetails = (id) => {
    navigate(`/place-details/${id}`);
  };

  return (
    <section className="w-full mt-16">
      <h2 className="text-2xl font-medium text-primary mb-6">Lựa chọn hàng đầu</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {properties.map((property) => (
          <div 
            key={property.id}
            onClick={() => goToPropertyDetails(property.id)}
            className="cursor-pointer group"
          >
            <div className="h-full flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
              {/* Image container with fixed aspect ratio */}
              <div className="relative w-full pb-[66%]"> {/* 3:2 aspect ratio */}
                <img
                  src={property.image}
                  alt={property.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Price tag - consistent positioning */}
                <div className="absolute top-0 right-0 bg-accent text-white py-1 px-3 rounded-bl-lg font-medium z-10">
                  <div className="text-right">
                    <span className="text-sm">{property.price}</span>
                    <div className="text-xs">/ngày</div>
                  </div>
                </div>
              </div>
              
              {/* Property details - consistent height & positioning */}
              <div className="flex flex-col p-3 flex-grow">
                <h3 className="font-medium text-lg text-primary line-clamp-1">{property.name}</h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-1">{property.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPropertySection;