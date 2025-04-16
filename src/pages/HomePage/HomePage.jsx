import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import LocationList from "../../components/LocationList/LocationList";
import Footer from "../../components/Footer/Footer";
import Modal from "../../components/Modal/Modal";
import Loader from "../../components/Loading/Loader";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [mostPickedProperty, setMostPickedProperty] = useState(null);
  const [properties, setProperties] = useState([]);
  const [housesSection1, setHousesSection1] = useState([]);
  const [housesSection2, setHousesSection2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const goToPropertyDetails = (id) => {
    navigate(`/place-details/${id}`);
  };

  // Hàm mở/đóng modal map
  function openMapDialog() {
    setIsMapOpen(true);
  }

  function closeMapDialog() {
    setIsMapOpen(false);
  }

  // Gọi API khi component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Gọi API top-rating cho phần "Most Picked"
        const topRatedResponse = await axios.get("https://localhost:7284/places/top-rating", {
          params: { limit: 5 },
        });
        const topPlaces = topRatedResponse.data;
        //console.log("Top Places (from /top-rating):", topPlaces); // Log để kiểm tra

        if (topPlaces.length > 0) {
          setMostPickedProperty({
            id: topPlaces[0].id,
            image: topPlaces[0].images && topPlaces[0].images.length > 0 ? topPlaces[0].images[0].imageUrl : "",
            price: `$${topPlaces[0].price}`,
            name: topPlaces[0].name,
            location: topPlaces[0].address,
          });

          setProperties(
            topPlaces.slice(1, 5).map((place) => ({
              id: place.id,
              image: place.images && place.images.length > 0 ? place.images[0].imageUrl : "",
              price: `$${place.price}`,
              name: place.name,
              location: place.address,
            }))
          );
        }

        const allPlacesResponse = await axios.get("https://localhost:7284/places/get-all");
        const allPlaces = allPlacesResponse.data;
        //console.log("All Places (from /get-all):", allPlaces);

        const topPlaceIds = topPlaces.map((place) => place.id);

        // Khong lay top rating place
        const filteredPlaces = allPlaces.filter((place) => !topPlaceIds.includes(place.id));

        const limitedPlaces = filteredPlaces.slice(0, 8);

        if (limitedPlaces.length < 8) {
          console.warn("Not enough unique places to display. Expected 8, got:", limitedPlaces.length);
        }

        const section1 = limitedPlaces.slice(0, 4).map((place, index) => ({
          id: place.id,
          image: place.images && place.images.length > 0 ? place.images[0].imageUrl : "path/to/placeholder-image.png",
          name: place.name,
          location: place.address,
          isPopular: index === 0, 
        }));

        const section2 = limitedPlaces.slice(4, 8).map((place, index) => ({
          id: place.id,
          image: place.images && place.images.length > 0 ? place.images[0].imageUrl : "path/to/placeholder-image.png",
          name: place.name,
          location: place.address,
          isPopular: index === 3, 
        }));

        setHousesSection1(section1);
        setHousesSection2(section2);

        setLoading(false);
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const locations1 = [
    "Colombo, Sri Lanka",
    "Hikkaduwe, Sri Lanka",
    "Kandy, Sri Lanka",
    "Ambalangode, Sri Lanka",
  ];
  
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-white overflow-hidden px-5 pb-16" data-testid="home-page">
      <Navbar />

      <Hero />


      <div className="mt-[52px] w-full max-w-[1140px] md:mt-[52px] max-md:mt-10">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="w-[32%] max-md:w-full">
            <div className="flex flex-col max-md:mt-[29px]">
              <div className="text-primary text-2xl font-medium text-left">
                Most Picked
              </div>
              {mostPickedProperty && (
                <div onClick={() => goToPropertyDetails(mostPickedProperty.id)} className="cursor-pointer">
                  <PropertyCard
                    image={mostPickedProperty.image}
                    price={mostPickedProperty.price}
                    name={mostPickedProperty.name}
                    location={mostPickedProperty.location}
                    aspectRatio="0.8"
                    className="mt-5 h-full"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="w-[68%] ml-5 max-md:w-full max-md:ml-0">
            <div className="mt-14 w-full max-md:mt-10">
              <div className="max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  {properties.slice(0, 2).map((property, index) => (
                    <div
                      key={index}
                      onClick={() => goToPropertyDetails(property.id)}
                      className="w-1/2 max-md:w-full ml-0 max-md:ml-0 cursor-pointer"
                    >
                      <PropertyCard
                        image={property.image}
                        price={property.price}
                        name={property.name}
                        location={property.location}
                        aspectRatio="1.679"
                        className="max-md:mt-[29px]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-[30px] max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  {properties.slice(2, 4).map((property, index) => (
                    <div
                      key={index}
                      onClick={() => goToPropertyDetails(property.id)}
                      className="w-1/2 max-md:w-full ml-0 max-md:ml-0 cursor-pointer"
                    >
                      <PropertyCard
                        image={property.image}
                        price={property.price}
                        name={property.name}
                        location={property.location}
                        aspectRatio="1.679"
                        className="max-md:mt-[29px]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[149px] w-full max-w-[1141px] max-md:mt-10">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          {housesSection1.map((house, index) => (
            <div key={index} onClick={()=>goToPropertyDetails(house.id)} className="w-1/4 max-md:w-full ml-0 max-md:ml-0">
              <div
                className={`flex flex-col max-md:mt-[29px] ${index === 0 ? "relative" : ""}`}
              >
                <div className="relative w-full cursor-pointer" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={house.image}
                    alt={house.name}
                    className="w-full h-full rounded-[15px] overflow-hidden object-cover"
                  />
                  {house.isPopular && (
                    <div className="absolute top-0 right-0 bg-accent text-white py-[7px] px-[31px] rounded-[0px_15px_0px_15px] text-center max-md:px-5 cursor-pointer">
                      <span className="font-medium">Popular</span> Choice
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-start mt-4">
                  <div className="text-primary text-xl font-normal text-left">
                    {house.name}
                  </div>
                  {house.location && (
                    <div className="text-[#B0B0B0] text-[15px] font-light text-left mt-1">
                      {house.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[61px] w-full max-w-[1141px] max-md:mt-10">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          {housesSection2.map((house, index) => (
            <div key={index} onClick={()=>goToPropertyDetails(house.id)} className="w-1/4 max-md:w-full ml-0 max-md:ml-0">
              <div className="flex flex-col max-md:mt-[29px] relative">
                <div className="relative w-full cursor-pointer" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={house.image}
                    alt={house.name}
                    className="w-full h-full rounded-[15px] overflow-hidden object-cover"
                  />
                  {house.isPopular && (
                    <div className="absolute top-0 right-0 bg-accent text-white py-[7px] px-[31px] rounded-[0px_15px_0px_15px] text-center max-md:px-5 curosr-pointer">
                      <span className="font-medium">Popular</span> Choice
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-start mt-4">
                  <div className="text-primary text-xl font-normal text-left">
                    {house.name}
                  </div>
                  {house.location && (
                    <div className="text-[#B0B0B0] text-[15px] font-light text-left mt-1">
                      {house.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#E5E5E5] w-full h-px mt-[105px] max-md:mt-10" />

      <Footer />

      {isMapOpen && (
        <Modal onClose={closeMapDialog} title="Select Location">
          <div className="p-6">
            <p>Map will be displayed here</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default HomePage;