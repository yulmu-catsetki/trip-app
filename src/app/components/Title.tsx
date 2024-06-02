"use client"
import React from 'react';

interface TitleProps {
  text: string;

}

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <div className="relative inline-block m-10">
      <span className="text-2xl md:text-3xl font-bold">
        {text}
      </span>
      <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-green-300 via-teal-500 to-emerald-600 rounded-full"></span>
    </div>
  );
};

export default Title;