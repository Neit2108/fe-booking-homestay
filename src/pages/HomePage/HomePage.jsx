import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../constant/config";

// Components
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import HomeSearch from "../../components/HomeSearch/HomeSearch";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loading/Loader";
import PromotionBanner from "../../components/Promotion/PromotionBanner";

// Utils
import { formatPrice } from "../../Utils/PriceUtils";

// Sections
import PropertySection from "./sections/PropertySection";
import FeaturesList from "./sections/FeaturesList";
import PromotionSection from "./sections/PromotionSection";

function HomePage() {
  const [featuredProperty, setFeaturedProperty] = useState(null);
  const [topProperties, setTopProperties] = useState([]);
  const [recommendedProperties, setRecommendedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const goToPropertyDetails = (id) => {
    navigate(`/place-details/${id}`);
  };

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch top-rated properties
        const topRatedResponse = await axios.get(
          `${API_URL}/places/top-rating`,
          {
            params: { limit: 5 },
          }
        );
        const topPlaces = topRatedResponse.data;

        if (topPlaces.length > 0) {
          // Set the featured property (highest rated)
          setFeaturedProperty({
            id: topPlaces[0].id,
            image:
              topPlaces[0].images && topPlaces[0].images.length > 0
                ? topPlaces[0].images[0].imageUrl
                : "",
            price: topPlaces[0].price,
            name: topPlaces[0].name,
            location: topPlaces[0].address,
            rating: topPlaces[0].rating,
          });

          // Set the remaining top properties
          setTopProperties(
            topPlaces.slice(1, 5).map((place) => ({
              id: place.id,
              image:
                place.images && place.images.length > 0
                  ? place.images[0].imageUrl
                  : "",
              price: place.price,
              name: place.name,
              location: place.address,
              rating: place.rating,
            }))
          );
        }

        // Fetch all properties for recommendations
        const allPlacesResponse = await axios.get(
          `${API_URL}/places/get-all`
        );
        const allPlaces = allPlacesResponse.data;

        // Filter out properties that are already in top rated
        const topPlaceIds = topPlaces.map((place) => place.id);
        const filteredPlaces = allPlaces.filter(
          (place) => !topPlaceIds.includes(place.id)
        );

        // Map the recommended properties
        const recommendedPlacesData = filteredPlaces
          .slice(0, 8)
          .map((place) => ({
            id: place.id,
            image:
              place.images && place.images.length > 0
                ? place.images[0].imageUrl
                : "",
            name: place.name,
            location: place.address,
            price: place.price,
            isPopular: place.rating >= 3,
            rating: place.rating,
          }));

        setRecommendedProperties(recommendedPlacesData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-accent text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-white overflow-hidden"
      data-testid="home-page"
    >
      <Navbar />

      <main className="w-full max-w-[1140px] px-5">
        <Hero />
        

        <div className="mt-8">
          <HomeSearch />
        </div>

        <PromotionSection />

        <section className="mt-16">
          {/* Section Heading - Now above all images */}
          <h2 className="text-primary text-2xl font-medium text-left mb-6">
            Lựa chọn hàng đầu
          </h2>

          <div className="flex gap-5 max-md:flex-col">
            {/* Featured Property Column */}
            <div className="w-full md:w-[32%] flex flex-col">
              {featuredProperty && (
                <div
                  onClick={() => goToPropertyDetails(featuredProperty.id)}
                  className="h-full cursor-pointer"
                >
                  <PropertyCard
                    image={featuredProperty.image}
                    price={featuredProperty.price}
                    name={featuredProperty.name}
                    location={featuredProperty.location}
                    aspectRatio="0.8"
                    className="h-full"
                  />
                </div>
              )}
            </div>

            {/* Top Properties Grid */}
            <div className="w-full md:w-[68%] flex flex-col justify-start">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {topProperties.map((property) => (
                  <div
                    key={property.id}
                    onClick={() => goToPropertyDetails(property.id)}
                    className="cursor-pointer transform transition-transform hover:scale-[1.02]"
                  >
                    <PropertyCard
                      image={property.image}
                      price={property.price}
                      name={property.name}
                      location={property.location}
                      aspectRatio="1.679"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FeaturesList />


        {/* Recommended Properties */}
        <PropertySection
          title="Chỗ nghỉ được đề xuất"
          subtitle="Những chỗ nghỉ được du khách yêu thích"
          properties={recommendedProperties.slice(0, 4)}
          onPropertyClick={goToPropertyDetails}
        />

        <PropertySection
          title="Khám phá thêm"
          subtitle="Những địa điểm tuyệt vời khác đang chờ bạn"
          properties={recommendedProperties.slice(4, 8)}
          onPropertyClick={goToPropertyDetails}
        />
      </main>

      <div className="w-full max-w-[1140px] px-5 mt-20">
        <div className="bg-[#E5E5E5] w-full h-px" />
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
