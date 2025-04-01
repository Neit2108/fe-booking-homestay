import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import BookingForm from "../../components/BookingForm/BookingForm";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import LocationList from "../../components/LocationList/LocationList";
import Footer from "../../components/Footer/Footer";
import Modal from "../../components/Modal/Modal";

function HomePage() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  function openMapDialog() {
    setIsMapOpen(true);
  }

  function closeMapDialog() {
    setIsMapOpen(false);
  }

  const mostPickedProperty = {
    image: "src/assets/Home/Property/BlueOriginFarm.png",
    price: "$50",
    name: "Blue Origin Fams",
    location: "Galle, Sri Lanka",
  };

  const properties = [
    {
      image: "src/assets/Home/Property/OceanLand.png",
      price: "$22",
      name: "Ocean Land",
      location: "Trincomalee, Sri Lanka",
    },
    {
      image: "src/assets/Home/Property/StarkHouse.png",
      price: "$856",
      name: "Stark House",
      location: "Dehiwala, Sri Lanka",
    },
    {
      image: "src/assets/Home/Property/VinnaVill.png",
      price: "$62",
      name: "Vinna Vill",
      location: "Beruwala, Sri Lanka",
    },
    {
      image: "src/assets/Home/Property/Bobox.png",
      price: "$72",
      name: "Bobox",
      location: "Kandy, Sri Lanka",
    },
  ];

  const housesSection1 = [
    {
      image: "src/assets/Home/Property/ShangriLa.png",
      name: "Shangri-La",
      location: "Colombo, Sri Lanka",
      isPopular: true,
    },
    {
      image: "src/assets/Home/Property/TopView.png",
      name: "Top View",
      location: "Kandy, Sri Lanka",
      isPopular: false,
    },
    {
      image: "src/assets/Home/Property/GreenVilla.png",
      name: "Green Villa",
      location: "Hikkaduwe, Sri Lanka",
      isPopular: false,
    },
    {
      image: "src/assets/Home/Property/WoddenPit.png",
      name: "Wodden Pit",
      location: "Ambalangode, Sri Lanka",
      isPopular: false,
    },
  ];

  const housesSection2 = [
    {
      image: "src/assets/Home/Property/Boutique.png",
      name: "Boutiqe",
      location: "Kandy, Sri Lanka",
      isPopular: false,
    },
    {
      image: "src/assets/Home/Property/Modern.png",
      name: "Modern",
      location: "Nuwereliya, Sri Lanka",
      isPopular: false,
    },
    {
      image: "src/assets/Home/Property/SilverRain.png",
      name: "Silver Rain",
      location: "Dehiwala, Sri Lanka",
      isPopular: false,
    },
    {
      image: "src/assets/Home/Property/CashVille.png",
      name: "Cashville",
      location: "Ampara, Sri Lanka",
      isPopular: true,
    },
  ];

  const locations1 = [
    "Colombo, Sri Lanka",
    "Hikkaduwe, Sri Lanka",
    "Kandy, Sri Lanka",
    "Ambalangode, Sri Lanka",
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-white overflow-hidden px-5 pb-16">
      <Navbar />

      <Hero />

      <BookingForm onOpenMap={openMapDialog} />

      <div className="mt-[52px] w-full max-w-[1140px] md:mt-[52px] max-md:mt-10">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="w-[32%] max-md:w-full">
            <div className="flex flex-col max-md:mt-[29px]">
              <div className="text-primary text-2xl font-medium text-left">
                Most Picked
              </div>
              <PropertyCard
                image={mostPickedProperty.image}
                price={mostPickedProperty.price}
                name={mostPickedProperty.name}
                location={mostPickedProperty.location}
                aspectRatio="0.8"
                className="mt-5 h-full"
              />
            </div>
          </div>

          <div className="w-[68%] ml-5 max-md:w-full max-md:ml-0">
            <div className="mt-14 w-full max-md:mt-10">
              <div className="max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  {properties.slice(0, 2).map((property, index) => (
                    <div
                      key={index}
                      className="w-1/2 max-md:w-full ml-0 max-md:ml-0"
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
                      className="w-1/2 max-md:w-full ml-0 max-md:ml-0"
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
            <div key={index} className="w-1/4 max-md:w-full ml-0 max-md:ml-0">
              <div
                className={`flex flex-col max-md:mt-[29px] ${index === 0 ? "relative" : ""}`}
              >
                <img
                  src={house.image}
                  alt={house.name}
                  className="w-full rounded-[15px] overflow-hidden object-cover"
                />
                {house.isPopular && (
                  <div className="absolute top-0 right-0 bg-accent text-white py-[7px] px-[31px] rounded-[0px_15px_0px_15px] text-center max-md:px-5">
                    <span className="font-medium">Popular</span> Choice
                  </div>
                )}
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
            <div key={index} className="w-1/4 max-md:w-full ml-0 max-md:ml-0">
              <div className="flex flex-col max-md:mt-[29px] relative">
                <img
                  src={house.image}
                  alt={house.name}
                  className="w-full rounded-[15px] overflow-hidden object-cover"
                />
                {house.isPopular && (
                  <div className="absolute top-0 right-0 bg-accent text-white py-[7px] px-[31px] rounded-[0px_15px_0px_15px] text-center max-md:px-5">
                    <span className="font-medium">Popular</span> Choice
                  </div>
                )}
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
