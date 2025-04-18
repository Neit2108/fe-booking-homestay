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
      console.log('Comments response:', response.data); // Kiểm tra dữ liệu trả về từ API
      console.log('Place id:', placeId); // Kiểm tra placeId
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
      console.log('Token:', token); // Kiểm tra token
      
      if (!token) {
        throw new Error('Bạn cần đăng nhập để bình luận');
      }
      const formData = new FormData();
      // Tạo FormData để gửi cả text và file ảnh
      formData.append('PlaceId', placeId);
      formData.append('Rating', commentData.rating);
      formData.append('Content', commentData.text);
      formData.append('SenderId', user.id); // Thêm SenderId từ user context
      
      // Thêm CreatedAt và UpdatedAt nếu cần
      const now = new Date().toISOString();
      formData.append('CreatedAt', now);
      formData.append('UpdatedAt', now);
      
      // Thêm các ảnh vào FormData, sử dụng tên đúng từ CommentRequest
      if (images && images.length > 0) {
        images.forEach(image => {
          formData.append('commentImages', image);
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
  };
};

export default useComment;