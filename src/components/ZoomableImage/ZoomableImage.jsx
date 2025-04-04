import React, { useState } from 'react';

function ZoomableImage({ 
  src, 
  alt, 
  className = "", 
  imageClassName = "",
  aspectRatio = null
}) {
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const closeZoom = (e) => {
    e.stopPropagation();
    setIsZoomed(false);
  };

  const preventBubbling = (e) => {
    e.stopPropagation();
  };

  const containerStyle = aspectRatio ? { aspectRatio } : {};

  return (
    <>
      <div 
        className={`cursor-zoom-in relative ${className}`} 
        onClick={toggleZoom}
        style={containerStyle}
      >
        <img
          src={src}
          alt={alt}
          className={imageClassName}
        />
      </div>

      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={closeZoom}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <button 
              className="absolute top-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center text-black font-bold z-10"
              onClick={closeZoom}
            >
              ×
            </button>
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[90vh] object-contain cursor-zoom-out"
              onClick={preventBubbling}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ZoomableImage;