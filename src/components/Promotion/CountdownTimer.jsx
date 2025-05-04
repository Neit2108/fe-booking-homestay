// src/components/CountdownTimer/CountdownTimer.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Countdown timer component for flash sales or limited-time promotions
 * @param {Object} props Component props
 * @param {Date|string} props.endDate End date of the countdown
 * @param {function} props.onComplete Function to call when countdown reaches zero
 * @param {string} props.className Additional CSS classes
 */
const CountdownTimer = ({ endDate, onComplete, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Convert string date to Date object if necessary
    const targetDate = typeof endDate === 'string' ? new Date(endDate) : endDate;
    
    // Check if date is valid
    if (!(targetDate instanceof Date) || isNaN(targetDate.getTime())) {
      console.error('Invalid date provided to CountdownTimer');
      return;
    }
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;
      
      // If countdown is complete
      if (difference <= 0) {
        setIsComplete(true);
        if (onComplete && typeof onComplete === 'function') {
          onComplete();
        }
        return;
      }
      
      // Calculate time units
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    };
    
    // Initial calculation
    calculateTimeLeft();
    
    // Set up interval for countdown
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Clear interval on unmount
    return () => clearInterval(timer);
  }, [endDate, onComplete]);

  // Time unit component
  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white/20 w-16 h-16 md:w-20 md:h-20 rounded-xl flex flex-col items-center justify-center backdrop-blur-sm">
        <span className="text-2xl md:text-3xl font-bold">{value}</span>
      </div>
      <span className="text-xs mt-1">{label}</span>
    </div>
  );

  // If countdown is complete
  if (isComplete) {
    return (
      <div className={`text-center ${className}`}>
        <p className="text-xl font-bold">Đã kết thúc!</p>
      </div>
    );
  }

  return (
    <div className={`flex justify-center gap-4 ${className}`}>
      {timeLeft.days > 0 && (
        <TimeUnit value={timeLeft.days} label="Ngày" />
      )}
      <TimeUnit value={timeLeft.hours.toString().padStart(2, '0')} label="Giờ" />
      <TimeUnit value={timeLeft.minutes.toString().padStart(2, '0')} label="Phút" />
      <TimeUnit value={timeLeft.seconds.toString().padStart(2, '0')} label="Giây" />
    </div>
  );
};

CountdownTimer.propTypes = {
  endDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]).isRequired,
  onComplete: PropTypes.func,
  className: PropTypes.string
};

export default CountdownTimer;