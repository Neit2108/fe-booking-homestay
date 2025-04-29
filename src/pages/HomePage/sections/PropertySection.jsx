// src/pages/HomePage/sections/PropertySection.jsx
import React from 'react';
import PropertyCard from '../../../components/PropertyCard/PropertyCard';

const PropertySection = ({ title, subtitle, properties, onPropertyClick }) => {
  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 w-full">
      <div className="mb-6">
        <h2 className="text-primary text-2xl font-medium">{title}</h2>
        {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {properties.map((property) => (
          <div 
            key={property.id} 
            onClick={() => onPropertyClick(property.id)}
            className="cursor-pointer transform transition-all duration-300 hover:translate-y-[-5px]"
          >
            <div className="h-full flex flex-col">
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full rounded-[15px] overflow-hidden object-cover"
                />
                {property.isPopular && (
                  <div className="absolute top-0 right-0 bg-accent text-white py-[7px] px-[15px] rounded-[0px_15px_0px_15px] text-center text-sm">
                    <span className="font-medium">Phổ biến</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col items-start mt-4 flex-grow">
                <div className="text-primary text-xl font-normal">
                  {property.name}
                </div>
                
                {property.location && (
                  <div className="text-[#B0B0B0] text-[15px] font-light mt-1">
                    {property.location}
                  </div>
                )}
                
                <div className="flex items-center mt-2">
                  <div className="text-accent font-medium">{property.price.toLocaleString()} VNĐ</div>
                  <span className="text-gray-400 text-sm ml-1">/ngày</span>
                </div>
                
                {property.rating && (
                  <div className="flex items-center mt-auto pt-2">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="ml-1 text-sm text-gray-600">{property.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertySection;