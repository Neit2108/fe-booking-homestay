import React, { useState, useRef, useEffect } from 'react';

/**
 * A 6-digit PIN input component with individual digit boxes
 * 
 * @param {Object} props
 * @param {Function} props.onComplete - Function called when all digits are entered
 * @param {Function} props.onChange - Function called when PIN value changes
 * @param {boolean} props.disabled - Whether the input is disabled
 * @param {string} props.className - Additional CSS classes
 */
const PinInput = ({ onComplete, onChange, disabled = false, className = '' }) => {
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  // Focus the first input on mount
  useEffect(() => {
    if (!disabled && inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, [disabled]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    
    // Only accept single digit numbers
    if (/^[0-9]?$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      
      // Call onChange with the full PIN string
      if (onChange) {
        onChange(newPin.join(''));
      }
      
      // If a digit was entered and not the last input, focus next input
      if (value && index < 5) {
        inputRefs[index + 1].current.focus();
      }
      
      // Check if PIN is complete
      const isComplete = newPin.every(digit => digit !== '');
      if (isComplete && onComplete) {
        onComplete(newPin.join(''));
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // When backspace is pressed
    if (e.key === 'Backspace') {
      if (index > 0 && pin[index] === '') {
        // If current input is empty, focus previous input
        inputRefs[index - 1].current.focus();
      }
      
      // Clear the current input value (will happen on the next render)
      const newPin = [...pin];
      newPin[index] = '';
      setPin(newPin);
      
      // Call onChange with the updated PIN
      if (onChange) {
        onChange(newPin.join(''));
      }
    }
    
    // Handle left/right arrow keys for navigation
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
    
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    
    const pastedData = e.clipboardData.getData('text');
    // Only proceed if the pasted text is 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const newPin = pastedData.split('');
      setPin(newPin);
      
      // Call onChange with the full PIN
      if (onChange) {
        onChange(newPin.join(''));
      }
      
      // Call onComplete since we have a full PIN
      if (onComplete) {
        onComplete(newPin.join(''));
      }
      
      // Focus the last input
      inputRefs[5].current.focus();
    }
  };

  return (
    <div className={`flex justify-center gap-2 ${className}`}>
      {pin.map((digit, index) => (
        <input
          key={index}
          ref={inputRefs[index]}
          type="password"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
          maxLength={1}
          disabled={disabled}
          className="w-12 h-14 text-center text-xl font-bold border border-gray-300 rounded-md focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none disabled:bg-gray-100"
        />
      ))}
    </div>
  );
};

export default PinInput;