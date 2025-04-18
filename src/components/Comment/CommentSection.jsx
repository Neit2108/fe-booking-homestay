import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import CommentModal from "./CommentModal";

const CommentSection = ({ averageRating, ratingCounts, comments = [], onAddComment }) => {
  const [selectedStar, setSelectedStar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);

  const handleStarClick = (rating) => {
    setSelectedStar(rating);
    setShowModal(true);
  };

  const handleImageClick = (imageUrl) => {
    setEnlargedImage(imageUrl);
  };

  const closeEnlargedImage = () => {
    setEnlargedImage(null);
  };

  const handleCommentSubmit = (rating, comment, images) => {
    // Gọi hàm onAddComment được truyền từ component cha
    if (onAddComment) {
      onAddComment(rating, comment, images);
    }
    
    // Đóng modal sau khi gửi comment
    setShowModal(false);
  };

  const total = Object.values(ratingCounts).reduce((acc, val) => acc + val, 0);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    return [...Array(5)].map((_, i) => {
      if (i < fullStars) return <FaStar key={i} className="text-blue-400 text-lg" />;
      else if (i === fullStars && halfStar) return <FaStarHalfAlt key={i} className="text-blue-400 text-lg" />;
      else return <FaRegStar key={i} className="text-blue-400 text-lg" />;
    });
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white w-full max-w-3xl mx-auto">
      {/* Hàng sao chọn */}
      <div className="flex justify-center gap-3 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`cursor-pointer text-4xl ${
              star <= Math.round(averageRating) ? "text-gray-400" : "text-gray-600"
            }`}
            onClick={() => handleStarClick(star)}
          />
        ))}
      </div>

      {/* Tổng quan đánh giá */}
      <div className="flex gap-8 items-start mb-8">
        {/* Cột trái */}
        <div className="flex flex-col items-center w-1/3">
          <div className="text-6xl font-bold">{averageRating.toFixed(1)}</div>
          <div className="flex mt-2">{renderStars(averageRating)}</div>
          <div className="mt-2 text-sm text-gray-400">{total.toLocaleString()} đánh giá</div>
        </div>

        {/* Cột phải */}
        <div className="w-2/3 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingCounts[star] || 0;
            const percent = total ? (count / total) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="w-4 text-sm">{star}</span>
                <div className="flex-1 bg-gray-700 h-3 rounded-full relative overflow-hidden">
                  <div
                    className="bg-blue-400 h-full rounded-full"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <span className="w-14 text-sm text-right text-black-300">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Phần hiển thị comment đã đánh giá */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Đánh giá từ khách hàng</h3>
        <div className="space-y-6">
          {comments.map((comment, index) => (
            <div key={index} className="flex gap-4">
              {/* Ảnh đại diện */}
              <div className="flex flex-col items-center w-16">
                <div className="w-12 h-12 rounded-full overflow-hidden mb-2">
                  <img 
                    src={comment.avatarUrl || "/default-avatar.png"} 
                    alt={`${comment.name}'s avatar`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs text-center font-medium">{comment.name}</span>
              </div>
              
              {/* Nội dung comment */}
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <div className="flex mr-2">
                    {renderStars(comment.rating)}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.date).toLocaleDateString()}
                  </span>
                </div>
                
                <p className="text-sm mb-2">{comment.text}</p>
                
                {/* Hiển thị ảnh nếu có */}
                {comment.images && comment.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {comment.images.map((img, imgIndex) => (
                      <div 
                        key={imgIndex} 
                        className="w-16 h-16 overflow-hidden rounded cursor-pointer"
                        onClick={() => handleImageClick(img)}
                      >
                        <img 
                          src={img} 
                          alt={`Comment image ${imgIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {comments.length === 0 && (
            <p className="text-center text-gray-500 italic">Chưa có đánh giá nào.</p>
          )}
        </div>
      </div>

      {/* Modal đánh giá */}
      {showModal && (
        <CommentModal
          rating={selectedStar}
          onClose={() => setShowModal(false)}
          onSubmit={handleCommentSubmit}
        />
      )}

      {/* Modal xem ảnh phóng to */}
      {enlargedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeEnlargedImage}
        >
          <div className="max-w-4xl max-h-screen p-4">
            <img 
              src={enlargedImage} 
              alt="Enlarged" 
              className="max-w-full max-h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;