// src/components/PromotionList/PromotionList.jsx
import React from 'react';
import PropTypes from 'prop-types';
import PromotionCard from '../Card/PromotionCard';

/**
 * A component for displaying multiple promotions in a grid or list format
 * @param {Object} props Component props
 * @param {Array} props.promotions Array of promotion objects
 * @param {string} props.layout 'grid' or 'list'
 * @param {string} props.cardVariant Card variant to use ('basic', 'holiday', 'theme')
 * @param {function} props.onPromotionClick Function to call when a promotion is clicked
 * @param {number} props.columns Number of columns for grid layout (1-4)
 * @param {string} props.className Additional CSS classes
 * @param {boolean} props.loading Whether promotions are loading
 * @param {string} props.emptyMessage Message to display when no promotions are available
 */
const PromotionList = ({ 
  promotions = [], 
  layout = 'grid', 
  cardVariant = 'basic',
  onPromotionClick,
  columns = 3,
  className = '',
  loading = false,
  emptyMessage = 'Không có khuyến mãi nào'
}) => {
  // Validate columns (1-4)
  const validColumns = Math.min(Math.max(columns, 1), 4);
  
  // Get grid columns class based on the number of columns
  const getGridColumns = () => {
    const colClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    };
    
    return colClasses[validColumns] || colClasses[3];
  };
  
  // Handle loading state
  if (loading) {
    return (
      <div className={`w-full ${className}`}>
        <div className={`animate-pulse ${layout === 'grid' ? `grid ${getGridColumns()} gap-6` : 'space-y-6'}`}>
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-gray-200 rounded-xl h-64"></div>
          ))}
        </div>
      </div>
    );
  }
  
  // Handle empty state
  if (!promotions || promotions.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-[#B0B0B0]">{emptyMessage}</p>
        </div>
      </div>
    );
  }
  
  // Render in grid layout
  if (layout === 'grid') {
    return (
      <div className={`w-full ${className}`}>
        <div className={`grid ${getGridColumns()} gap-6`}>
          {promotions.map((promo) => (
            <PromotionCard
              key={promo.id}
              variant={cardVariant}
              data={promo}
              onClick={onPromotionClick}
            />
          ))}
        </div>
      </div>
    );
  }
  
  // Render in list layout
  return (
    <div className={`w-full ${className}`}>
      <div className="space-y-6">
        {promotions.map((promo) => (
          <PromotionCard
            key={promo.id}
            variant={cardVariant}
            data={promo}
            onClick={onPromotionClick}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
};

PromotionList.propTypes = {
  promotions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  layout: PropTypes.oneOf(['grid', 'list']),
  cardVariant: PropTypes.oneOf(['basic', 'holiday', 'theme']),
  onPromotionClick: PropTypes.func,
  columns: PropTypes.number,
  className: PropTypes.string,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string
};

export default PromotionList;