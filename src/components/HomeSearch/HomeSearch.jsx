// src/components/HomeSearch/HomeSearch.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const HomeSearch = () => {
  const navigate = useNavigate();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isPersonSelectOpen, setIsPersonSelectOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [persons, setPersons] = useState(2);
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const calendarRef = useRef(null);
  const personRef = useRef(null);
  const locationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
      if (personRef.current && !personRef.current.contains(event.target)) {
        setIsPersonSelectOpen(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setIsLocationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePersonChange = (delta) => {
    const newValue = persons + delta;
    if (newValue >= 1 && newValue <= 20) {
      setPersons(newValue);
    }
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    
    if (startDate && endDate) {
      searchParams.append('startDate', startDate.toISOString());
      searchParams.append('endDate', endDate.toISOString());
    }
    
    searchParams.append('persons', persons);
    
    if (searchLocation) {
      searchParams.append('location', searchLocation);
    }
    
    navigate(`/homestay-recommend?${searchParams.toString()}`);
  };

  const handleLocationSelect = () => {
    // Symbolic location selection - just save the text input
    if (searchLocation.trim()) {
      setSelectedLocation({
        address: searchLocation
      });
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const renderDateButton = () => {
    if (startDate && endDate) {
      return (
        <div className="text-sm">
          <div className="font-medium">{formatDate(startDate)}</div>
          <div className="text-xs text-gray-500">to {formatDate(endDate)}</div>
        </div>
      );
    }
    return (
      <div className="text-sm">
        <div className="font-medium">Check Available</div>
        <div className="text-xs text-gray-500">Add dates</div>
      </div>
    );
  };

  const renderLocationButton = () => {
    if (selectedLocation) {
      return (
        <div className="text-sm">
          <div className="font-medium">Location</div>
          <div className="text-xs text-gray-500 truncate max-w-[120px]">
            {selectedLocation.address}
          </div>
        </div>
      );
    }
    return (
      <div className="text-sm">
        <div className="font-medium">Select Location</div>
        <div className="text-xs text-gray-500">Where to?</div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto -mt-8 relative z-10">
      <div className="bg-white rounded-full shadow-lg p-2 flex items-center">
        {/* Date Selection */}
        <div className="relative" ref={calendarRef}>
          <button 
            className={`flex items-center space-x-3 px-4 py-2 rounded-full transition ${isCalendarOpen ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          >
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="ml-2">{renderDateButton()}</div>
          </button>
          
          {isCalendarOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white shadow-xl rounded-lg p-4 z-20">
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => setDateRange(update)}
                minDate={new Date()}
                inline
              />
            </div>
          )}
        </div>
        
        {/* Divider */}
        <div className="h-8 w-px bg-gray-300 mx-2"></div>
        
        {/* Person Selection */}
        <div className="relative" ref={personRef}>
          <button 
            className={`flex items-center space-x-3 px-4 py-2 rounded-full transition ${isPersonSelectOpen ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
            onClick={() => setIsPersonSelectOpen(!isPersonSelectOpen)}
          >
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <div className="ml-2 text-sm">
              <div className="font-medium">Person</div>
              <div className="text-xs text-gray-500">{persons} guests</div>
            </div>
          </button>
          
          {isPersonSelectOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white shadow-xl rounded-lg p-4 min-w-[250px] z-20">
              <div className="flex justify-between items-center">
                <span className="font-medium">Guests</span>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => handlePersonChange(-1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-accent hover:text-accent"
                    disabled={persons <= 1}
                  >
                    -
                  </button>
                  <span className="w-6 text-center">{persons}</span>
                  <button 
                    onClick={() => handlePersonChange(1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-accent hover:text-accent"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Divider */}
        <div className="h-8 w-px bg-gray-300 mx-2"></div>
        
        {/* Location Selection */}
        <div className="relative flex-grow" ref={locationRef}>
          <button 
            className={`flex items-center space-x-3 px-4 py-2 rounded-full transition w-full text-left ${isLocationOpen ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
            onClick={() => setIsLocationOpen(!isLocationOpen)}
          >
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div className="ml-2">{renderLocationButton()}</div>
          </button>
          
          {isLocationOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-xl rounded-lg p-4 z-20">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search for a location..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
                <button
                  onClick={handleLocationSelect}
                  className="mt-2 bg-accent text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Select Location
                </button>
              </div>
              
              {/* Symbolic Map */}
              <div className="w-full h-[300px] rounded-md bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">Map Placeholder</p>
                  <p className="text-xs text-gray-400">Enter a location and click "Select Location"</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Search Button */}
        <button 
          className="bg-accent hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-colors"
          onClick={handleSearch}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HomeSearch;