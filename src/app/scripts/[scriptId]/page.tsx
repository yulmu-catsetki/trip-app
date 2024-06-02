"use client"
import React, { useState } from 'react';

export default function Home() {
  const [showButton, setShowButton] = useState(true);

  return (
    <div className="flex flex-col">
      {/* Rest of the page */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row">
          <div className="w-full md:w-3/4 px-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-2" contentEditable="true">Blog Title Here</h1>
            <p className="text-gray-600" contentEditable="true">Published on April 4, 2023</p>
            <img src="https://images.unsplash.com/photo-1506157786151-b8491531f063" alt="Blog Featured Image" className="mb-8"/>
            <div className="prose max-w-none" contentEditable="true">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed sit amet feugiat
                eros, eget eleifend dolor. Proin maximus bibendum felis, id fermentum odio vestibulum id. Sed ac
                ligula eget dolor consequat tincidunt. Nullam fringilla ipsum et ex lacinia, at bibendum elit
                posuere. Aliquam eget leo nec nibh mollis consectetur.</p>
            </div>
            {/* Blog content */}
          </div>
          <div className="w-full md:w-1/4 px-4">
            {/* Recent Posts and Categories sections */}
            {showButton && (
              <div className="bg-gray-100 p-4 mt-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4">AI Assist</h2>
                <button 
                  onClick={() => {/* AI assist function */}}
                >
                  Activate
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}