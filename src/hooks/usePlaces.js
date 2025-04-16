import { useEffect, useState } from 'react';
import axios from 'axios';

const usePlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('https://localhost:7284/places/get-all');
        setPlaces(response.data);
      } catch (err) {
        console.error('Lỗi khi lấy danh sách địa điểm:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  return { places, loading, error };
};

export default usePlaces;
