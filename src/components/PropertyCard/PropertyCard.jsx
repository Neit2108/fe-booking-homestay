function PropertyCard({
  image,
  price,
  name,
  location,
  aspectRatio = "1",
  className = "",
}) {
  return (
    <div
      className={`flex flex-col rounded-[15px] relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl active:scale-98 ${className}`}
      style={{ aspectRatio }}
    >
      <img
        src={image}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{ height: "100%", minHeight: "100%" }}
      />

      <div className="relative rounded-[15px] flex px-6 pb-6 flex-col max-md:px-5">
        <div className="rounded-[0px_15px_0px_15px] bg-accent absolute top-0 right-0 flex px-10 py-[7px] flex-col items-stretch text-base font-light text-center leading-[1.7] justify-center max-md:px-5">
          <span className="font-medium text-white">{price}</span>
          <span className="text-white">per night</span>
        </div>

        <div className="absolute bottom-6 left-6 flex flex-col items-start w-full max-w-[80%] max-md:mt-10">
          <div className="text-xl font-normal text-white text-left w-full">
            {name}
          </div>
          <div className="text-[15px] font-light text-white text-left w-full mt-1">
            {location}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
