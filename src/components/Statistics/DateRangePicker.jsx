// src/components/DateRangePicker/DateRangePicker.jsx
import React, { useState, useRef, useEffect } from 'react';

const DateRangePicker = ({ startDate, endDate, onChange, disabled = false }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [activeField, setActiveField] = useState(null); // 'start' hoặc 'end'
  const pickerRef = useRef(null);
  
  // Hàm định dạng ngày kiểu Việt Nam (DD/MM/YYYY)
  const formatDateVN = (date) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Xử lý click bên ngoài date picker để đóng nó
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mở date picker và đặt trường đang hoạt động
  const openDatePicker = (field) => {
    if (disabled) return;
    setActiveField(field);
    setShowPicker(true);
  };

  // Hàm xử lý khi chọn ngày từ date picker
  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    
    if (!isNaN(selectedDate.getTime())) {
      if (activeField === 'start') {
        // Nếu ngày bắt đầu được chọn sau ngày kết thúc, cập nhật cả hai
        if (selectedDate > endDate) {
          onChange({
            startDate: selectedDate,
            endDate: new Date(selectedDate.getTime() + 86400000) // Thêm 1 ngày
          });
        } else {
          onChange({
            startDate: selectedDate,
            endDate
          });
        }
        // Sau khi chọn ngày bắt đầu, chuyển sang chọn ngày kết thúc
        setActiveField('end');
      } else {
        // Nếu ngày kết thúc được chọn trước ngày bắt đầu, không cho phép
        if (selectedDate < startDate) {
          alert('Ngày kết thúc không thể trước ngày bắt đầu');
        } else {
          onChange({
            startDate,
            endDate: selectedDate
          });
          // Sau khi chọn ngày kết thúc, đóng date picker
          setShowPicker(false);
        }
      }
    }
  };

  return (
    <div className="relative" ref={pickerRef}>
      <div className="bg-white border rounded-lg shadow-sm flex items-center px-4 py-2">
        <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <div className="flex items-center">
          {/* Input hiển thị ngày bắt đầu định dạng Việt Nam */}
          <input
            type="text"
            value={formatDateVN(startDate)}
            onClick={() => openDatePicker('start')}
            className={`border-none outline-none w-24 ${disabled ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer'}`}
            placeholder="DD/MM/YYYY"
            readOnly
            disabled={disabled}
          />
          <span className="mx-2">-</span>
          {/* Input hiển thị ngày kết thúc định dạng Việt Nam */}
          <input
            type="text"
            value={formatDateVN(endDate)}
            onClick={() => openDatePicker('end')}
            className={`border-none outline-none w-24 ${disabled ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer'}`}
            placeholder="DD/MM/YYYY"
            readOnly
            disabled={disabled}
          />
        </div>
        {/* Biểu tượng lịch để mở date picker */}
        <button 
          className={`ml-2 ${disabled ? 'text-gray-300' : 'text-gray-400 hover:text-gray-500'}`}
          onClick={() => {
            if (!disabled) {
              setActiveField(activeField || 'start');
              setShowPicker(!showPicker);
            }
          }}
          type="button"
          disabled={disabled}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {/* Date picker popup */}
        {showPicker && (
          <div className="absolute mt-1 z-20 bg-white rounded-lg shadow-lg p-4 top-full left-0 min-w-[300px]">
            <div className="mb-2 text-sm font-medium text-gray-700">
              {activeField === 'start' 
                ? 'Chọn ngày bắt đầu' 
                : 'Chọn ngày kết thúc'}
            </div>
            <input
              type="date"
              value={activeField === 'start' 
                ? startDate.toISOString().split('T')[0]
                : endDate.toISOString().split('T')[0]}
              onChange={handleDateChange}
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={activeField === 'end' ? startDate.toISOString().split('T')[0] : undefined}
              autoFocus // Tự động focus vào trường input khi mở
            />
            
            <div className="mt-3 flex justify-between items-center">
              <div className="text-xs text-gray-500">
                {activeField === 'start' 
                  ? 'Sau khi chọn, bạn sẽ chọn tiếp ngày kết thúc'
                  : 'Ngày kết thúc phải sau ngày bắt đầu'}
              </div>
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPicker(false)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded"
                >
                  Hủy
                </button>
                {activeField === 'end' && (
                  <button
                    type="button"
                    onClick={() => setShowPicker(false)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Áp dụng
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangePicker;