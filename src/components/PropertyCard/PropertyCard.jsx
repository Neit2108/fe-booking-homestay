// import { formatPrice } from "../../Utils/PriceUtils";

// function PropertyCard({
//   image,
//   price,
//   name,
//   location,
//   aspectRatio = "1",
//   className = "",
//   variant = "overlay", // New prop: 'overlay' or 'below'
// }) {
//   const isOverlay = variant === "overlay";

//   return (
//     <div
//       className={`flex flex-col rounded-[15px] overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl active:scale-98 ${className}`}
//     >
//       {/* Image Container */}
//       <div
//         className="relative w-full overflow-hidden"
//         style={aspectRatio ? { aspectRatio } : {}}
//       >
//         <img
//           src={image}
//           alt={name}
//           className="w-full h-full object-cover object-center"
//         />

//         {/* Price Tag - Always on image */}
//         <div className="rounded-[0px_15px_0px_15px] bg-accent absolute top-0 right-0 flex px-10 py-[7px] flex-col items-stretch text-base font-light text-center leading-[1.7] justify-center max-md:px-5">
//           <span className="font-medium text-white">{formatPrice(price)}</span>
//           <span className="text-white">/ngày</span>
//         </div>

//         {/* Overlay Text - Only when variant is "overlay" */}
//         {isOverlay && (
//           <div className="absolute bottom-6 left-6 flex flex-col items-start w-full max-w-[80%] max-md:mt-10">
//             <div className="text-xl font-normal text-white text-left w-full">
//               {name}
//             </div>
//             <div className="text-[15px] font-light text-white text-left w-full mt-1">
//               {location}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Below Text - Only when variant is "below" */}
//       {!isOverlay && (
//         <div className="flex flex-col mt-4 px-2">
//           <div className="text-xl font-normal text-primary text-left">
//             {name}
//           </div>
//           <div className="text-[15px] font-light text-zinc-400 text-left mt-1">
//             {location}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PropertyCard;

import { formatPrice } from "../../Utils/PriceUtils";

function PropertyCard({
  image,
  price,
  name,
  location,
  aspectRatio = "1",
  className = "",
  variant = "overlay", // 'overlay' or 'below'
  rating,
}) {
  const isOverlay = variant === "overlay";

  return (
    <div
      className={`flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}
    >
      {/* Image Container */}
      <div
        className="relative w-full overflow-hidden"
        style={aspectRatio ? { aspectRatio } : {}}
      >
        <img
          src={image || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={name}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
        />

        {/* Price Tag */}
        <div className="rounded-tr-xl rounded-bl-xl bg-accent absolute top-0 right-0 flex px-4 py-2 flex-col items-center text-sm font-medium text-white shadow-md">
          <span>{formatPrice(price)} VNĐ</span>
          <span className="text-xs font-light opacity-90">/ngày</span>
        </div>

        {/* Rating badge if provided */}
        {rating && (
          <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs flex items-center">
            <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
            </svg>
            <span className="font-medium text-gray-800">{rating?.toFixed(1) || "N/A"}</span>
          </div>
        )}

        {/* Overlay Text - Only when variant is "overlay" */}
        {isOverlay && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
            <div className="text-xl font-medium">
              {name}
            </div>
            <div className="text-sm font-light mt-1 opacity-90">
              {location}
            </div>
          </div>
        )}
      </div>

      {/* Below Text - Only when variant is "below" */}
      {!isOverlay && (
        <div className="flex flex-col p-4">
          <div className="text-lg font-medium text-primary">
            {name}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {location}
          </div>
          {rating && (
            <div className="flex items-center mt-2">
              <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
              </svg>
              <span className="text-sm text-gray-700">{rating?.toFixed(1) || "N/A"}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PropertyCard;