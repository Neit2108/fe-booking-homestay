import { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const API_URL = 'https://localhost:7284/comments'; 

const useComment = (placeId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  // Fetch comments when component mounts or placeId changes
  const fetchComments = useCallback(async () => {
    if (!placeId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${API_URL}/all-comments-of-place/${placeId}`);
      console.log('Comments response:', response.data);
      
      // Map the response to match the format expected by the CommentSection component
      const commentsWithUserInfo = response.data.map(comment => {
        return {
          id: comment.id,
          name: user?.fullName || "Anonymous User",
          avatarUrl: user?.avatarUrl || "/default-avatar.png",
          rating: comment.rating,
          date: comment.createdAt,
          text: comment.content,
          images: comment.images ? comment.images.map(img => img.imageUrl) : []
        };
      });
      
      setComments(commentsWithUserInfo);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error loading comments';
      setError(errorMsg);
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  }, [placeId, user]);

  // Add a new comment
  const addComment = async (commentData, images = []) => {
    setLoading(true);
    setError(null);
    
    try {
      const token = user?.token;
      
      if (!token) {
        throw new Error('You must be logged in to comment');
      }
      
      // Create FormData for sending both text and image files
      const formData = new FormData();
      formData.append('PlaceId', placeId);
      formData.append('Rating', commentData.rating);
      formData.append('Content', commentData.text);
      formData.append('SenderId', user.id); 
      
      // Add CreatedAt and UpdatedAt if needed
      const now = new Date().toISOString();
      formData.append('CreatedAt', now);
      formData.append('UpdatedAt', now);
      
      // Add images to FormData
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

      // After successful comment creation, refresh comments list
      await fetchComments();
      
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error adding comment';
      setError(errorMessage);
      console.error('Error adding comment:', err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Fetch comments on initial load
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