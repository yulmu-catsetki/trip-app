'use client'

import React, { useState } from 'react';

interface TextInputProps {
  prop: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ prop, className, value, onChange }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`relative group ${className}`}>
      <div
        className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-all duration-300 ${
          (focused || value) ? 'text-emerald-500 scale-0' : 'text-gray-400 font-semibold'
        }`}
      >
        <span>{prop}</span>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="block w-full py-2 pl-2 pr-3 rounded-lg bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
      />
    </div>
  );
};

export default TextInput;