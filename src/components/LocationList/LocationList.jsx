function LocationList({ locations, className = "" }) {
  return (
    <div
      className={`flex w-full max-w-[1140px] items-stretch gap-[100px] font-poppins text-[15px] text-[#B0B0B0] font-light flex-wrap max-md:max-w-full ${className}`}
    >
      {locations.map((location, index) => (
        <div key={index} className="flex-grow flex-shrink-1 w-[110px]">
          {location}
        </div>
      ))}
    </div>
  );
}

export default LocationList;
