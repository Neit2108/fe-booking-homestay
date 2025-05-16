import React, { useState } from "react";
import { formatPrice } from "../../Utils/PriceUtils";
import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../../../constant/config";

const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half-star" className="text-yellow-400" />);
  }

  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FaRegStar key={`empty-star-${i}`} className="text-yellow-400" />
    );
  }

  return <div className="flex">{stars}</div>;
};

const PlaceCard = ({ place, onNavigate, user }) => {
  const [isFavourite, setIsFavourite] = useState(place.isFavourite);

  const handleFavouriteClick = async (e) => {
    e.stopPropagation();
    if (!user) {
      alert("Bạn cần đăng nhập để lưu vào yêu thích.");
      return;
    }

    try {
      if (isFavourite) {
        // Nếu đã là yêu thích, gọi API remove
        await axios.delete(`${API_URL}/favourite/remove`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          data: {
            placeId: place.id,
          },
        });

        console.log("User token ", user.token);
        setIsFavourite(false); // Đổi trái tim về màu rỗng
      } else {
        // Nếu chưa là yêu thích, gọi API add
        await axios.post(
          `${API_URL}/favourite/add`,
          { placeId: place.id },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log("User token ", user.token);
        setIsFavourite(true); // Đổi trái tim về màu đỏ
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào yêu thích:", error);
    }
  };

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => onNavigate(place.id)}
    >
      <div className="relative">
        <img
          src={
            place.images && place.images.length > 0
              ? (place.images[0].imageUrl || place.images)
              : "https://via.placeholder.com/300x200"
          }
          alt={place.name}
          className="w-full h-48 object-cover"
        />

        {/* Save button */}
        <button
          className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
          onClick={handleFavouriteClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isFavourite ? "red" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 text-blue-800">
          {place.name}
        </h3>
        <p className="text-gray-500 text-sm mb-2">{place.address}</p>

        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={place.rating || 0} />
          <span className="text-sm text-gray-600">
            ({place.numOfRating || 0})
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="font-bold text-blue-600">
              {formatPrice(place.price)} VNĐ
            </span>
            <span className="text-gray-500 text-sm">/ngày</span>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm font-medium transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(place.id);
            }}
          >
            Đặt ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
