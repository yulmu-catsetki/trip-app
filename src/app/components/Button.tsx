'use client';

import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
    return (
      <button
        style={{ backgroundColor: '#5db075' }} 
        className="cursor-pointer self-stretch border-none pt-4 px-5 pb-[13px] rounded-lg justify-center max-w-full" 
        onClick={onClick}
      >
        <b className="relative text-base font-semibold font-ui-16-semi text-white text-center inline-block min-w-[32px]">
          {label}
        </b>
      </button>
    );
  };
  
  export default Button;