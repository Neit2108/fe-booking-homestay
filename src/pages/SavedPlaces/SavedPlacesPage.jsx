import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Sidebar/Sidebar";
import Loader from "../../components/Loading/Loader";
import PlaceCard from "../../components/Card/PlaceCard";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { API_URL } from "../../../constant/config";

const SavedPlacesPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const placesPerPage = 9;

  const indexOfLastPlace = currentPage * placesPerPage;
  const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
  const currentPlaces = places.slice(indexOfFirstPlace, indexOfLastPlace);

  const totalPages = Math.ceil(places.length / placesPerPage);

  useEffect(() => {
    const fetchSavedPlaces = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/favourite/get-by-user-id`,
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        );
        setPlaces(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchSavedPlaces();
    }
  }, [user?.token]);

  const handleNavigateToProperty = (placeId) => {
    navigate(`/place-details/${placeId}`);
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="text-red-500 text-center my-10">Lỗi: {error.message}</div>
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activePage="saved-places" />
      <div className="flex-1 md:ml-64 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-blue-800 mb-6">
            Địa điểm đã lưu
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPlaces.length > 0 ? (
              currentPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  user={user}
                  onNavigate={handleNavigateToProperty}
                />
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500">
                Bạn chưa lưu homestay nào.
              </div>
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  &laquo;
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  &raquo;
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedPlacesPage;
