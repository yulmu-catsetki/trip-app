"use client"
import React from 'react';

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <div className="text-center text-2xl font-bold leading-10 my-12 ">
        {text}
    </div>

  );
};

export default Title;