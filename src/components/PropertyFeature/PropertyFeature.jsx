import React from 'react';

function PropertyFeature({ icon, title, highlight = false }) {
  const highlightedText = highlight ? (
    <span className="font-medium text-primary">{title.split(' ')[0]}</span>
  ) : null;
  
  const regularText = highlight ? 
    ` ${title.split(' ').slice(1).join(' ')}` : 
    title;

  return (
    <div className="flex flex-col items-center">
      <img
        src={icon}
        className="object-contain aspect-square w-[38px]"
        alt={title}
      />
      <div className="mt-2 text-base font-light leading-relaxed text-zinc-400">
        {highlightedText}{regularText}
      </div>
    </div>
  );
}

export default PropertyFeature;