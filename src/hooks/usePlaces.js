import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { API_URL } from "../../constant/config";

/**
 * Custom hook to fetch and manage homestay places data
 * @param {Object} options - Configuration options
 * @param {string} options.mode - "public" for public access, "managed" for role-based access control
 * @returns {Object} - The places data, loading state, and error state
 */
export const usePlaces = (options = { mode: "managed" }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, loading: userLoading } = useContext(UserContext);

  // Function to fetch places based on user role and mode
  const fetchPlaces = async () => {
    try {
      setLoading(true);
      setError(null);

      // If in public mode, fetch all places regardless of user role
      if (options.mode === "public") {
        
        const response = await axios.get(`${API_URL}/places/get-all`, {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          });
        
        const processedData = processResponse(response.data);
        setPlaces(processedData);
        return;
      }

      // For managed mode, wait until user data is loaded before making API calls
      if (userLoading) {
        console.log("User data is still loading, deferring API call");
        return; // Exit early and wait for user data
      }

      // Default to empty array if no API call succeeds
      let processedData = [];

      // Check user role to determine which API endpoint to use
      const isAdmin =
        user &&
        ((Array.isArray(user.role) && user.role.includes("Admin")) ||
          (typeof user.role === "string" && user.role === "Admin"));

      const isLandlord =
        user &&
        ((Array.isArray(user.role) && user.role.includes("Landlord")) ||
          (typeof user.role === "string" && user.role === "Landlord"));

      if (isAdmin) {
        // Admin can see all places
        const response = await axios.get(
          `${API_URL}/places/get-all`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        processedData = processResponse(response.data);
        console.log("Admin fetched all places:", processedData.length);
      } else if (isLandlord && user.id) {
        // Landlord can only see their own places
        const response = await axios.get(
          `${API_URL}/places/get-all-for-landlord/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        processedData = processResponse(response.data);
        console.log("Landlord fetched places:", processedData.length);
      } else {
        // Log this case for debugging
        console.warn("User role not identified or user ID missing", { user });
        setError(
          new Error("Authorization issue: Unable to determine user role")
        );
      }

      setPlaces(processedData);
    } catch (err) {
      console.error("Error fetching places:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to process API response
  const processResponse = (data) => {
    return data.map((place) => ({
      id: place.id,
      name: place.name || "Unnamed Place",
      address: place.address || "",
      rating: place.rating || 0,
      numOfRating: place.numOfRating || 0,
      category: place.category || "homestay",
      description: place.description || "",
      price: place.price || 0,
      maxGuests: place.maxGuests || 0,
      status: place.status || "pending",
      ownerId: place.ownerId || "",
      images: place.images || [],
      isFavourite: place.isFavourite || false,
    }));
  };

  // Function to add a new place
  const addPlace = async (placeData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/places/add-place`,
        placeData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Add the new place to the places state
      setPlaces([...places, response.data]);
      return response.data;
    } catch (err) {
      console.error("Error adding place:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Function to update a place
  const updatePlace = async (id, placeData) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${API_URL}/places/update/${id}`,
        placeData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Update the place in the places state
      setPlaces(
        places.map((place) => (place.id === id ? response.data : place))
      );
      return response.data;
    } catch (err) {
      console.error("Error updating place:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a place
  const deletePlace = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/places/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // Remove the place from the places state
      setPlaces(places.filter((place) => place.id !== id));
      return true;
    } catch (err) {
      console.error("Error deleting place:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const hasFetched = useRef(false);

  // Fetch places on component mount and when user data changes
  // useEffect(() => {
  //   if (options.mode === "public") {
  //     fetchPlaces();
  //   } else if (!userLoading && user) {
      
  //     fetchPlaces();
  //   }
  // }, [user, userLoading, options.mode]);

  useEffect(() => {
    if (hasFetched.current || userLoading) return;

    if (options.mode === "public") {
      fetchPlaces();
      hasFetched.current = true;
    } else if (!userLoading && user) {
      fetchPlaces();
      hasFetched.current = true;
    }
  }, [user, userLoading, options.mode]);

  return {
    places,
    loading: options.mode === "managed" ? loading || userLoading : loading,
    error,
    fetchPlaces,
    addPlace,
    updatePlace,
    deletePlace,
  };
};
