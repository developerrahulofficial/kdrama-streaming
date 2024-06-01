import React, { useState } from 'react';

// Import components for individual carousel items and indicators
import CarouselItem from './CarouselItem';
import CarouselIndicator from './CarouselIndicator';

// Import icon for navigation buttons
import { IoIosArrowBack } from 'react-icons/io';

// Define the types for the carousel properties
export interface CarouselProps {
  width?: number; // Optional width of the carousel
  height?: number; // Optional height of the carousel
  items: React.ReactNode[]; // List of items to display in the carousel
}

// The main Carousel component
export default function Carousel({ width, height, items }: CarouselProps) {
  // State to keep track of the currently active item
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Function to handle clicking the "next" button
  function handleNextItemBtn() {
    setActiveIndex((prev) => {
      return prev + 1 < items.length ? prev + 1 : prev; // Move to the next item if it exists
    });
  }

  // Function to handle clicking the "previous" button
  function handlePrevItemBtn() {
    setActiveIndex((prev) => {
      return prev - 1 >= 0 ? prev - 1 : prev; // Move to the previous item if it exists
    });
  }

  return (
    <div className="carousel-container mt-10"> {/* Container for the carousel with some margin on top */}
      {/* Show "previous" button if not on the first item */}
      {activeIndex > 0 && (
        <button
          className="carousel-btn-switch-card-left carousel-btn-switch-card"
          onClick={handlePrevItemBtn}
        >
          <IoIosArrowBack /> {/* Left arrow icon */}
        </button>
      )}
      {/* Loop through all items and display them */}
      {items?.map((item, index) => (
        <CarouselItem key={index} index={index} activeIndex={activeIndex}>
          {item}
        </CarouselItem>
      ))}
      {/* Show "next" button if not on the last item */}
      {activeIndex < items.length - 1 && (
        <button
          className="carousel-btn-switch-card-right carousel-btn-switch-card"
          onClick={handleNextItemBtn}
        >
          <IoIosArrowBack
            style={{
              transform: 'rotate(180deg)', // Rotate the arrow to point right
            }}
          />
        </button>
      )}
      {/* Display indicators for the carousel items */}
      <CarouselIndicator
        activeIndex={activeIndex} // The currently active item
        length={items.length} // Total number of items
        onSetActiveIndex={(activeIndex) => {
          setActiveIndex(activeIndex); // Change the active item when an indicator is clicked
        }}
      />
    </div>
  );
}
