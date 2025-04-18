import { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const API_URL = 'https://localhost:7284/comments'; // Địa chỉ API của bạn

const useComment = (placeId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  // Fetch comments khi component mount hoặc placeId thay đổi
  const fetchComments = useCallback(async () => {
    if (!placeId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${API_URL}/all-comments-of-place/${placeId}`);
      
      // Lấy dữ liệu comment và bổ sung thông tin người dùng
      const commentsWithUserInfo = await Promise.all(
        response.data.map(async (comment) => {
          // Lấy thông tin người dùng từ senderId

          return {
            id: comment.id,
            name: user.name,
            avatarUrl: user.avatarUrl,
            rating: comment.rating,
            date: comment.createdAt,
            text: comment.content,
            images: comment.images ? comment.images.map(img => img.imageUrl) : []
          };
        })
      );
      
      setComments(commentsWithUserInfo);
    } catch (err) {
      setError(err.response?.data?.message || 'Đã xảy ra lỗi khi tải bình luận');
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  }, [placeId, user]);

  // Thêm comment mới
  const addComment = async (commentData, images = []) => {
    setLoading(true);
    setError(null);
    
    try {
      const token = user?.token;
      
      if (!token) {
        throw new Error('Bạn cần đăng nhập để bình luận');
      }

      // Tạo FormData để gửi cả text và file ảnh
      const formData = new FormData();
      formData.append('placeId', placeId);
      formData.append('rating', commentData.rating);
      formData.append('content', commentData.text);
      
      // Thêm các ảnh vào FormData nếu có
      if (images && images.length > 0) {
        images.forEach(image => {
          formData.append('images', image);
        });
      }

      const response = await axios.post(`${API_URL}/add-comment`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Sau khi thêm thành công, fetch lại danh sách comments
      await fetchComments();
      
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Đã xảy ra lỗi khi thêm bình luận';
      setError(errorMessage);
      console.error('Error adding comment:', err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Tính toán số lượng đánh giá theo từng mức sao
  const calculateRatingCounts = useCallback(() => {
    return comments.reduce((acc, comment) => {
      const rating = comment.rating;
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    }, {});
  }, [comments]);

  // Tính toán điểm đánh giá trung bình
  const calculateAverageRating = useCallback(() => {
    if (comments.length === 0) return 0;
    const sum = comments.reduce((acc, comment) => acc + comment.rating, 0);
    return sum / comments.length;
  }, [comments]);

  // Fetch comments khi component mount
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return {
    comments,
    loading,
    error,
    addComment,
    refreshComments: fetchComments,
    ratingCounts: calculateRatingCounts(),
    averageRating: calculateAverageRating()
  };
};

export default useComment;