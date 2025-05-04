// src/components/DestinationBanner/BannerSelector.jsx
import { useState, useEffect } from 'react';
import DestinationBanner from './DestinationBanner';
import CssDestinationBanner from './CssDestinationBanner';

/**
 * BannerSelector component - Shows a banner control panel for development
 * This helps to toggle between CSS and Image-based banners during development
 * In production, you would typically just use DestinationBanner directly
 */
const BannerSelector = ({ defaultMode = 'auto' }) => {
  const [mode, setMode] = useState(defaultMode); // 'auto', 'css', or 'images'
  const [imagesAvailable, setImagesAvailable] = useState(false);
  
  // Check if images are available on mount (for demo purposes)
  useEffect(() => {
    // This is a simplified check - in a real app, you'd verify the images actually exist
    const checkImagesAvailable = async () => {
      try {
        // Simulate checking if images exist
        // In a real app, you could do an actual fetch to check if the images load
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // For demo purposes, we'll just set this to false
        // Set to true when you have the actual images available
        setImagesAvailable(false);
      } catch (error) {
        console.error("Error checking images:", error);
        setImagesAvailable(false);
      }
    };
    
    checkImagesAvailable();
  }, []);
  
  // Determine which banner to display
  const renderBanner = () => {
    switch (mode) {
      case 'css':
        return <CssDestinationBanner />;
      case 'images':
        return <DestinationBanner useImages={true} />;
      case 'auto':
      default:
        return imagesAvailable 
          ? <DestinationBanner useImages={true} /> 
          : <CssDestinationBanner />;
    }
  };
  
  return (
    <div className="relative">
      {/* The actual banner */}
      {renderBanner()}
      
      {/* Dev controls (can be removed in production) */}
      <div className="absolute top-2 left-2 z-50 bg-black/30 backdrop-blur-sm rounded p-2 text-white text-sm">
        <div className="flex space-x-2">
          <button 
            onClick={() => setMode('auto')} 
            className={`px-2 py-1 rounded ${mode === 'auto' ? 'bg-accent text-white' : 'bg-white/20'}`}
          >
            Auto
          </button>
          <button 
            onClick={() => setMode('css')} 
            className={`px-2 py-1 rounded ${mode === 'css' ? 'bg-accent text-white' : 'bg-white/20'}`}
          >
            CSS
          </button>
          <button 
            onClick={() => setMode('images')} 
            className={`px-2 py-1 rounded ${mode === 'images' ? 'bg-accent text-white' : 'bg-white/20'}`}
          >
            Images
          </button>
        </div>
        <div className="mt-1 text-xs">
          Images {imagesAvailable ? 'available' : 'not available'}
        </div>
      </div>
    </div>
  );
};

export default BannerSelector;