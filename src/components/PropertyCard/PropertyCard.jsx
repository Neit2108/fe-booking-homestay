function PropertyCard({
  image,
  price,
  name,
  location,
  aspectRatio = "1",
  className = "",
  variant = "overlay", // New prop: 'overlay' or 'below'
}) {
  const isOverlay = variant === "overlay";

  return (
    <div
      className={`flex flex-col rounded-[15px] overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl active:scale-98 ${className}`}
    >
      {/* Image Container */}
      <div
        className="relative w-full overflow-hidden"
        style={aspectRatio ? { aspectRatio } : {}}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center"
        />

        {/* Price Tag - Always on image */}
        <div className="rounded-[0px_15px_0px_15px] bg-accent absolute top-0 right-0 flex px-10 py-[7px] flex-col items-stretch text-base font-light text-center leading-[1.7] justify-center max-md:px-5">
          <span className="font-medium text-white">{price}</span>
          <span className="text-white">per night</span>
        </div>

        {/* Overlay Text - Only when variant is "overlay" */}
        {isOverlay && (
          <div className="absolute bottom-6 left-6 flex flex-col items-start w-full max-w-[80%] max-md:mt-10">
            <div className="text-xl font-normal text-white text-left w-full">
              {name}
            </div>
            <div className="text-[15px] font-light text-white text-left w-full mt-1">
              {location}
            </div>
          </div>
        )}
      </div>

      {/* Below Text - Only when variant is "below" */}
      {!isOverlay && (
        <div className="flex flex-col mt-4 px-2">
          <div className="text-xl font-normal text-primary text-left">
            {name}
          </div>
          <div className="text-[15px] font-light text-zinc-400 text-left mt-1">
            {location}
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyCard;
