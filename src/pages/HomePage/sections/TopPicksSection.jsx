// src/components/Sections/TopPicksSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property, onClick }) => {
  return (
    <div 
      className="relative overflow-hidden rounded-xl cursor-pointer group h-full"
      onClick={onClick}
    >
      {/* Fixed-size container with consistent aspect ratio */}
      <div className="relative w-full h-0 pb-[75%]"> {/* 4:3 aspect ratio */}
        <img
          src={property.image}
          alt={property.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        {/* Price tag at top right */}
        <div className="absolute top-3 right-3 bg-accent text-white rounded-lg py-1 px-3 z-10 text-center">
          <div className="text-base font-medium">{property.price}</div>
          <div className="text-xs">/ngày</div>
        </div>
        
        {/* Property name and location */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
          <h3 className="text-xl font-medium leading-tight mb-1">{property.name}</h3>
          <p className="text-sm text-white/90">{property.location}</p>
        </div>
      </div>
    </div>
  );
};

const TopPicksSection = () => {
  const navigate = useNavigate();
  
  // These match the properties in your screenshot
  const properties = [
    {
      id: 1,
      name: "Homestay Lục Tĩnh",
      location: "Số 3 Lê Thánh Tông, Quận 4, TP. Hồ Chí Minh",
      price: "1.984.834 VNĐ",
      image: "/path/to/homestay-luc-tinh.jpg" // Replace with actual image path
    },
    {
      id: 2,
      name: "Homestay Tầm Hương",
      location: "Số 55 Trần Nhật Duật, TP. Hạ Long",
      price: "1.266.473 VNĐ",
      image: "/path/to/homestay-tam-huong.jpg" // Replace with actual image path
    },
    {
      id: 3,
      name: "Homestay Mai Vàng",
      location: "Số 34 Nguyễn Cư Trinh, Quận Ninh Kiều, Cần Thơ",
      price: "1.830.823 VNĐ",
      image: "/path/to/homestay-mai-vang.jpg" // Replace with actual image path
    },
    {
      id: 4,
      name: "Homestay Vân Du",
      location: "Số 29 Trần Quốc Thảo, Phường 3, Tuy Hòa",
      price: "1.546.181 VNĐ",
      image: "/path/to/homestay-van-du.jpg" // Replace with actual image path
    },
    {
      id: 5,
      name: "Homestay Bình Yên",
      location: "Số 91 Cách Mạng Tháng 8, Quận 10, TP. Hồ Chí Minh",
      price: "1.701.635 VNĐ",
      image: "/path/to/homestay-binh-yen.jpg" // Replace with actual image path
    }
  ];

  const handleCardClick = (id) => {
    navigate(`/place-details/${id}`);
  };

  return (
    <section className="w-full max-w-[1140px] mx-auto px-4 py-8">
      <h2 className="text-2xl font-medium text-primary mb-6">Lựa chọn hàng đầu</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* First card is larger */}
        <div className="lg:col-span-2 lg:row-span-2 h-full">
          <PropertyCard 
            property={properties[0]} 
            onClick={() => handleCardClick(properties[0].id)} 
          />
        </div>
        
        {/* Other cards */}
        {properties.slice(1).map((property) => (
          <div key={property.id} className="h-full">
            <PropertyCard 
              property={property} 
              onClick={() => handleCardClick(property.id)} 
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopPicksSection;