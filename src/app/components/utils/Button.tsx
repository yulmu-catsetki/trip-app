'use client'

import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className, disabled = false }) => {
  return (
    <button
      className={`relative bg-gradient-to-r from-emerald-500 to-green-400 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="relative z-10">{label}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full blur-sm opacity-75 transition-all duration-300 group-hover:opacity-100 group-hover:blur"></div>
    </button>
  );
};

export default Button;