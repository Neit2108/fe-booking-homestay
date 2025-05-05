// import { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "../../components/Navbar/Navbar";
// import Hero from "../../components/Hero/Hero";
// import HomeSearch from "../../components/HomeSearch/HomeSearch";
// import PropertyCard from "../../components/PropertyCard/PropertyCard";
// import LocationList from "../../components/LocationList/LocationList";
// import Footer from "../../components/Footer/Footer";
// import Modal from "../../components/Modal/Modal";
// import Loader from "../../components/Loading/Loader";
// import { useNavigate } from "react-router-dom";
// import {formatPrice} from "../../Utils/PriceUtils";

// function HomePage() {
//   const [isMapOpen, setIsMapOpen] = useState(false);
//   const [mostPickedProperty, setMostPickedProperty] = useState(null);
//   const [properties, setProperties] = useState([]);
//   const [housesSection1, setHousesSection1] = useState([]);
//   const [housesSection2, setHousesSection2] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const goToPropertyDetails = (id) => {
//     navigate(`/place-details/${id}`);
//   };

//   // Hàm mở/đóng modal map
//   function openMapDialog() {
//     setIsMapOpen(true);
//   }

//   function closeMapDialog() {
//     setIsMapOpen(false);
//   }

//   // Gọi API khi component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         // Gọi API top-rating cho phần "Most Picked"
//         const topRatedResponse = await axios.get("https://homiesstay.onrender.com/places/top-rating", {
//           params: { limit: 5 },
//         });
//         const topPlaces = topRatedResponse.data;
//         //console.log("Top Places (from /top-rating):", topPlaces); // Log để kiểm tra

//         if (topPlaces.length > 0) {
//           setMostPickedProperty({
//             id: topPlaces[0].id,
//             image: topPlaces[0].images && topPlaces[0].images.length > 0 ? topPlaces[0].images[0].imageUrl : "",
//             price: `${formatPrice(topPlaces[0].price)} VNĐ`,
//             name: topPlaces[0].name,
//             location: topPlaces[0].address,
//           });

//           setProperties(
//             topPlaces.slice(1, 5).map((place) => ({
//               id: place.id,
//               image: place.images && place.images.length > 0 ? place.images[0].imageUrl : "",
//               price: `${formatPrice(place.price)} VNĐ`,
//               name: place.name,
//               location: place.address,
//             }))
//           );
//         }

//         const allPlacesResponse = await axios.get("https://homiesstay.onrender.com/places/get-all");
//         const allPlaces = allPlacesResponse.data;
//         //console.log("All Places (from /get-all):", allPlaces);

//         const topPlaceIds = topPlaces.map((place) => place.id);

//         // Khong lay top rating place
//         const filteredPlaces = allPlaces.filter((place) => !topPlaceIds.includes(place.id));

//         const limitedPlaces = filteredPlaces.slice(0, 8);

//         if (limitedPlaces.length < 8) {
//           console.warn("Not enough unique places to display. Expected 8, got:", limitedPlaces.length);
//         }

//         const section1 = limitedPlaces.slice(0, 4).map((place, index) => ({
//           id: place.id,
//           image: place.images && place.images.length > 0 ? place.images[0].imageUrl : "path/to/placeholder-image.png",
//           name: place.name,
//           location: place.address,
//           isPopular: place.rating >= 3,
//         }));

//         const section2 = limitedPlaces.slice(4, 8).map((place, index) => ({
//           id: place.id,
//           image: place.images && place.images.length > 0 ? place.images[0].imageUrl : "path/to/placeholder-image.png",
//           name: place.name,
//           location: place.address,
//           isPopular: place.rating >= 3,
//         }));

//         setHousesSection1(section1);
//         setHousesSection2(section2);

//         setLoading(false);
//       } catch (err) {
//         setError("Failed to load data. Please try again later.");
//         setLoading(false);
//         console.error("Error fetching data:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   const locations1 = [
//     "Colombo, Sri Lanka",
//     "Hikkaduwe, Sri Lanka",
//     "Kandy, Sri Lanka",
//     "Ambalangode, Sri Lanka",
//   ];

//   if (loading) {
//     return <Loader />;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-white overflow-hidden px-5 pb-16" data-testid="home-page">
//       <Navbar />

//       <Hero />

//       <HomeSearch />

//       <div className="mt-[52px] w-full max-w-[1140px] md:mt-[52px] max-md:mt-10">
//         <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//           <div className="w-[32%] max-md:w-full">
//             <div className="flex flex-col max-md:mt-[29px]">
//               <div className="text-primary text-2xl font-medium text-left">
//                 Lựa chọn hàng đầu
//               </div>
//               {mostPickedProperty && (
//                 <div onClick={() => goToPropertyDetails(mostPickedProperty.id)} className="cursor-pointer">
//                   <PropertyCard
//                     image={mostPickedProperty.image}
//                     price={mostPickedProperty.price}
//                     name={mostPickedProperty.name}
//                     location={mostPickedProperty.location}
//                     aspectRatio="0.8"
//                     className="mt-5 h-full"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="w-[68%] ml-5 max-md:w-full max-md:ml-0">
//             <div className="mt-14 w-full max-md:mt-10">
//               <div className="max-md:max-w-full">
//                 <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//                   {properties.slice(0, 2).map((property, index) => (
//                     <div
//                       key={index}
//                       onClick={() => goToPropertyDetails(property.id)}
//                       className="w-1/2 max-md:w-full ml-0 max-md:ml-0 cursor-pointer"
//                     >
//                       <PropertyCard
//                         image={property.image}
//                         price={property.price}
//                         name={property.name}
//                         location={property.location}
//                         aspectRatio="1.679"
//                         className="max-md:mt-[29px]"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="mt-[30px] max-md:max-w-full">
//                 <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//                   {properties.slice(2, 4).map((property, index) => (
//                     <div
//                       key={index}
//                       onClick={() => goToPropertyDetails(property.id)}
//                       className="w-1/2 max-md:w-full ml-0 max-md:ml-0 cursor-pointer"
//                     >
//                       <PropertyCard
//                         image={property.image}
//                         price={property.price}
//                         name={property.name}
//                         location={property.location}
//                         aspectRatio="1.679"
//                         className="max-md:mt-[29px]"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-[149px] w-full max-w-[1141px] max-md:mt-10">
//         <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//           {housesSection1.map((house, index) => (
//             <div key={index} onClick={()=>goToPropertyDetails(house.id)} className="w-1/4 max-md:w-full ml-0 max-md:ml-0">
//               <div
//                 className={`flex flex-col max-md:mt-[29px] ${index === 0 ? "relative" : ""}`}
//               >
//                 <div className="relative w-full cursor-pointer" style={{ aspectRatio: "4/3" }}>
//                   <img
//                     src={house.image}
//                     alt={house.name}
//                     className="w-full h-full rounded-[15px] overflow-hidden object-cover"
//                   />
//                   {house.isPopular && (
//                     <div className="absolute top-0 right-0 bg-accent text-white py-[7px] px-[31px] rounded-[0px_15px_0px_15px] text-center max-md:px-5 cursor-pointer">
//                       <span className="font-medium">Phổ biến</span>
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex flex-col items-start mt-4">
//                   <div className="text-primary text-xl font-normal text-left">
//                     {house.name}
//                   </div>
//                   {house.location && (
//                     <div className="text-[#B0B0B0] text-[15px] font-light text-left mt-1">
//                       {house.location}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="mt-[61px] w-full max-w-[1141px] max-md:mt-10">
//         <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//           {housesSection2.map((house, index) => (
//             <div key={index} onClick={()=>goToPropertyDetails(house.id)} className="w-1/4 max-md:w-full ml-0 max-md:ml-0">
//               <div className="flex flex-col max-md:mt-[29px] relative">
//                 <div className="relative w-full cursor-pointer" style={{ aspectRatio: "4/3" }}>
//                   <img
//                     src={house.image}
//                     alt={house.name}
//                     className="w-full h-full rounded-[15px] overflow-hidden object-cover"
//                   />
//                   {house.isPopular && (
//                     <div className="absolute top-0 right-0 bg-accent text-white py-[7px] px-[31px] rounded-[0px_15px_0px_15px] text-center max-md:px-5 curosr-pointer">
//                       <span className="font-medium">Phổ biến</span>
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex flex-col items-start mt-4">
//                   <div className="text-primary text-xl font-normal text-left">
//                     {house.name}
//                   </div>
//                   {house.location && (
//                     <div className="text-[#B0B0B0] text-[15px] font-light text-left mt-1">
//                       {house.location}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="bg-[#E5E5E5] w-full h-px mt-[105px] max-md:mt-10" />

//       <Footer />

//       {isMapOpen && (
//         <Modal onClose={closeMapDialog} title="Select Location">
//           <div className="p-6">
//             <p>Map will be displayed here</p>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// }

// export default HomePage;

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
          "https://homiesstay.onrender.com/places/top-rating",
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
          "https://homiesstay.onrender.com/places/get-all"
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
