import React from "react";

function RelatedProperty({id, image, title, category, isPopular = false , onImageClick}) {
  return (
    <div className="flex flex-col grow items-start">
      <div className="relative w-full h-[240px] cursor-pointer"
        onClick={onImageClick}>
        <img
          src={image}
          className="w-full h-full object-cover rounded-2xl"
          alt={title}
        />
        {isPopular && (
          <div className="absolute top-0 right-0 bg-accent text-white py-2 px-4 rounded-[0px_15px_0px_15px] text-center text-sm">
            <span className="font-medium">Popular</span> Choice
          </div>
        )}
      </div>
      <div className="mt-4 text-xl text-primary">{title}</div>
      <div className="text-base font-light text-zinc-400">{category}</div>
    </div>
  );
}

export default RelatedProperty;
