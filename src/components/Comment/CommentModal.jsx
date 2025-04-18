import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const CommentModal = ({ rating, onClose }) => {
  const [selectedRating, setSelectedRating] = useState(rating);
  const [comment, setComment] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]); // Chỉ lưu previews và file trong một state

  const handleSubmit = () => {
    // Chuẩn bị dữ liệu gửi đến API
    const images = imagePreviews.map((preview) => preview.file);
    console.log({ selectedRating, comment, images });

    // Cleanup: Giải phóng URL.createObjectURL
    imagePreviews.forEach((preview) => URL.revokeObjectURL(preview.previewUrl));
    onClose();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // Giới hạn số lượng ảnh (ví dụ: tối đa 5 ảnh)
    if (imagePreviews.length + files.length > 5) {
      alert("Bạn chỉ có thể tải lên tối đa 5 ảnh!");
      return;
    }

    // Tạo preview cho các ảnh mới
    const newPreviews = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    // Nối thêm vào danh sách hiện tại
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setImagePreviews((prev) => {
      const updatedPreviews = prev.filter((_, i) => i !== index);
      // Giải phóng URL của ảnh bị xóa
      URL.revokeObjectURL(prev[index].previewUrl);
      return updatedPreviews;
    });
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Stars */}
        <div className="flex justify-center items-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer text-4xl transition-colors ${
                star <= selectedRating ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => setSelectedRating(star)}
            />
          ))}
        </div>

        {/* Image previews */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {imagePreviews.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img.previewUrl}
                alt={`preview-${index}`}
                className="w-full h-24 object-cover rounded"
              />
              <button
                className="absolute top-1 right-1 bg-white rounded-full text-sm px-1 hover:bg-red-500 hover:text-white transition"
                onClick={() => handleRemoveImage(index)}
                title="Xoá ảnh"
              >
                ❌
              </button>
            </div>
          ))}
        </div>

        {/* Image picker + comment input */}
        <div className="flex items-start gap-3">
          <div>
            <label className="block cursor-pointer text-sm font-medium text-blue-600">
              Chọn ảnh
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <textarea
            rows="4"
            className="flex-1 border border-gray-300 rounded px-3 py-2 w-full"
            placeholder="Viết đánh giá của bạn..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        <button
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Gửi đánh giá
        </button>
      </div>
    </div>
  );
};

export default CommentModal;