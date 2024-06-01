import React from 'react';

// Define the types for the CarouselIndicator properties
export interface CarouselIndicatorProps {
  activeIndex: number; // The currently active item index
  length: number; // Total number of items in the carousel
  maxIndicatorVisible?: number; // Optional maximum number of indicators to show
  onSetActiveIndex: (index: number) => void; // Function to set the active item index
}

// The main CarouselIndicator component
export default function CarouselIndicator({
  activeIndex,
  length,
  maxIndicatorVisible = 5,
  onSetActiveIndex,
}: CarouselIndicatorProps) {
  // Determine the maximum number of indicators to show
  const maxIndicator = length > maxIndicatorVisible ? maxIndicatorVisible : length;

  return (
    <div className="carousel-indicator"> {/* Container for the indicators */}
      {/* Create an array with maxIndicator length and map over it to create indicators */}
      {Array.from(Array(maxIndicator), (_, index) => {
        return (
          <div
            key={index} // Unique key for each indicator
            className={`carousel-indicator-dots
            ${activeIndex === index ? 'w-4 opacity-100' : 'w-2 bg-gray-400'}`} // Style active and inactive indicators differently
            onClick={() => {
              onSetActiveIndex(index); // Set the active item index when an indicator is clicked
            }}
          ></div>
        );
      })}
    </div>
  );
}
