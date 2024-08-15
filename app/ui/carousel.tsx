"use client"
import React, { useState, useEffect, ReactNode, TouchEvent } from 'react';

interface CarouselProps {
  children: ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === React.Children.count(children) - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? React.Children.count(children) - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }

    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex overflow-hidden justify-center items-center h-full">
        {React.Children.map(children, (child, index) => {
          let className = 'absolute';
          if (index === currentIndex) {
            className += ' w-[90%] scale-100 opacity-100 z-10 translate-x-0 transition-all duration-500 ease-in-out h-full px-4';
          } else if (
            index === (currentIndex - 1 + React.Children.count(children)) % React.Children.count(children)
          ) {
            className += ' w-[90%] -translate-x-[85%] md:-translate-x-[90%] lg:-translate-x-[95%] scale-90 opacity-50 transition-all duration-500 ease-in-out h-full px-4';
          } else if (index === (currentIndex + 1) % React.Children.count(children)) {
            className += ' w-[90%] translate-x-[85%] md:translate-x-[90%] lg:translate-x-[95%] scale-90 opacity-50 transition-all duration-500 ease-in-out h-full px-4';
          } else {
            className += ' hidden';
          }
          return (
            <div key={index} className={className}>
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;