// src/components/Banners/VietnameseFlag.jsx
import React from 'react';

const VietnameseFlag = () => {
  return (
    <div className="flag-container">
      <div className="vietnamese-flag">
        {/* Create 5 wave sections for realistic movement */}
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
        <div className="wave wave-4"></div>
        <div className="wave wave-5"></div>
        
        {/* Yellow star */}
        <div className="star-container">
          <svg viewBox="0 0 512 512">
            <path d="M256,0l58.9,190.5H512L354.5,308.5L413.4,499L256,381L98.6,499l58.9-190.5L0,190.5h197.1L256,0z"/>
          </svg>
        </div>
      </div>
      
      <style jsx="true">{`
        .flag-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .vietnamese-flag {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: #c9151b; /* Darker, more vibrant red */
          border-radius: 4px;
          overflow: hidden;
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2); /* Inner shadow for depth */
        }
        
        .wave {
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background-color: transparent;
          opacity: 0.08; /* Reduced opacity for more vibrant base color */
        }
        
        .wave-1 {
          animation: wave 7s linear infinite;
          background: linear-gradient(90deg, 
            transparent 0%, 
            #ffffff 30%,
            transparent 50%, 
            #ffffff 70%, 
            transparent 100%
          );
        }
        
        .wave-2 {
          animation: wave 9s linear infinite;
          animation-delay: -2s;
          background: linear-gradient(90deg, 
            transparent 0%, 
            #ffffff 20%,
            transparent 40%, 
            #ffffff 60%, 
            transparent 80%,
            #ffffff 100%
          );
        }
        
        .wave-3 {
          animation: wave 8s linear infinite;
          animation-delay: -4s;
          background: linear-gradient(90deg, 
            #ffffff 0%, 
            transparent 20%,
            #ffffff 40%, 
            transparent 60%, 
            #ffffff 80%,
            transparent 100%
          );
        }
        
        .wave-4 {
          animation: wave 10s linear infinite;
          animation-delay: -1s;
          background: linear-gradient(90deg, 
            transparent 10%, 
            #ffffff 30%,
            transparent 50%, 
            #ffffff 70%, 
            transparent 90%
          );
        }
        
        .wave-5 {
          animation: wave 6s linear infinite;
          animation-delay: -3s;
          background: linear-gradient(90deg, 
            #ffffff 5%, 
            transparent 25%,
            #ffffff 45%, 
            transparent 65%, 
            #ffffff 85%
          );
        }
        
        .star-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40%;
          height: 40%;
          animation: star-float 3s ease-in-out infinite;
          filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.3)); /* Add shadow for contrast */
        }
        
        /* Make star more vibrant */
        .star-container svg {
          fill: #ffdd00; /* Slightly more vibrant yellow */
          width: 100%;
          height: 100%;
        }
        
        @keyframes wave {
          0% {
            transform: translateX(0) skew(0);
          }
          100% {
            transform: translateX(-50%) skew(0);
          }
        }
        
        @keyframes star-float {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.3));
          }
          50% {
            transform: translate(-50%, -52%) scale(1.02);
            filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.4));
          }
        }
        
        /* Add a more pronounced pulse to the main flag */
        .vietnamese-flag {
          animation: flag-pulse 5s ease-in-out infinite;
        }
        
        @keyframes flag-pulse {
          0%, 100% {
            transform: scale(1) perspective(1000px) rotateX(0deg) rotateY(0deg);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          }
          25% {
            transform: scale(1.02) perspective(1000px) rotateX(2deg) rotateY(3deg);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
          }
          50% {
            transform: scale(1.01) perspective(1000px) rotateX(0deg) rotateY(5deg);
            box-shadow: 0 7px 18px rgba(0, 0, 0, 0.22);
          }
          75% {
            transform: scale(1.02) perspective(1000px) rotateX(-2deg) rotateY(3deg);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
          }
        }
      `}</style>
    </div>
  );
};

export default VietnameseFlag;