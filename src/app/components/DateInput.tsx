'use client'

import React, { useState } from 'react';

interface DateInputProps {
  prop: string;
  className?: string;
  startDate: string;
  endDate: string;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({ prop, className, startDate, endDate, setStartDate, setEndDate }) => {
  const [startFocused, setStartFocused] = useState(false);
  const [endFocused, setEndFocused] = useState(false);

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <label className="text-gray-400 font-semibold">{prop}</label>
      <div className="flex flex-col gap-2 w-full">
        <div className="w-full">
          <div
            className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-all duration-300 ${(startFocused || startDate) ? 'text-emerald-500 scale-0' : 'text-gray-500'
              }`}
          >
          </div>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            onFocus={() => setStartFocused(true)}
            onBlur={() => setStartFocused(false)}
            className="block w-full py-2 pl-2 pr-3 rounded-lg bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
            style={{ color: startDate ? 'black' : 'transparent' }}          
          />
        </div>
        <div className="w-full">
          <div
            className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-all duration-300 ${(endFocused || endDate) ? 'text-emerald-500 scale-0' : 'text-gray-500'
              }`}
          >
            
          </div>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            onFocus={() => setEndFocused(true)}
            onBlur={() => setEndFocused(false)}
            className="block w-full py-2 pl-2 pr-3 rounded-lg bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
            style={{ color: endDate ? 'black' : 'transparent' }}   
          />
        </div>
      </div>
    </div>
  );
};export default DateInput;