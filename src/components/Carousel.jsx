// import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react';
import {  FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import React, { useEffect, useState } from 'react';

const Carousel = ({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
  slidesToShow = 1,
  slidesPerRow = 1,
  includeActionBtns,
  fixedContent
}) => {
  const initialCount = 0; //Initial index of the slides array.
  const [currentSet, setCurrentSet] = useState([]); //Current set of items in a slide.
  const [currCount, setCurrCount] = useState(initialCount); //The index of the first item currently being displayed in the carousel.It keeps track of the starting position of the current set of items being displayed in the carousel.

  useEffect(() => {
    if (slides?.length) {
      setCurrentSet(slides?.slice(0, slidesToShow));
      setCurrCount(currCount + slidesToShow);
    }
  }, [slides]);

  /**
   * The function `prev` is used to update the current set of slides displayed based on the previous set on Previous action button is triggered
   */
  const prev = () => {
    let startIndex = 0,
      endIndex = 0;
    if (currCount === slidesToShow) {
      let modValue = slides.length % slidesToShow; // to get the odd or even number of items remaining with respect to the number of items in the array.
      endIndex = slides.length;
      startIndex = endIndex - (modValue === 0 ? slidesToShow : modValue);
      setCurrCount(startIndex + slidesToShow);
    } else {
      endIndex = currCount - slidesToShow;
      startIndex = endIndex - slidesToShow;
      setCurrCount(endIndex);
    }
    setCurrentSet(slides.slice(startIndex, endIndex));
  };

  /**
   * The `next` function increments the current count by the number of slides to show and updates the
   * current set of slides accordingly.
   */
  const next = () => {
    let startIndex = currCount;
    let endIndex = startIndex + slidesToShow;
    if (slides?.length > currCount) {
      setCurrCount(prevCount => prevCount + slidesToShow);
    } else {
      startIndex = initialCount;
      endIndex = startIndex + slidesToShow;
      setCurrCount(endIndex);
    }
    setCurrentSet(slides.slice(startIndex, endIndex));
  };

  /* This `useEffect` hook here is responsible for setting up an interval for
 automatic sliding of the carousel if the `autoSlide` prop is set to `true`. */
  useEffect(() => {
    if (!autoSlide) return;
    const sliderInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(sliderInterval);
  });

  return (
    <div className="overflow-hidden relative" data-carousel="slide">
      <div
        className={`grid grid-cols-${slidesPerRow} transition-transform duration-700 ease-in-out gap-4 w-full`}
        style={{ transform: `translateX(-${currCount * 100})` }}
      >
        {currentSet}
      </div>
     <div className="absolute inset-0 flex items-center justify-between p-1 lg:p-4">
       {includeActionBtns &&   <button
          onClick={prev}
          className="p-1 rounded-full shadow-sm bg-white/20 text-gray-800/10 hover:bg-white/80 hover:text-gray-800/80 hover:shadow"
        >
          <FaArrowCircleLeft size={40} />
        </button>}
        {fixedContent}
        {includeActionBtns && <button
          onClick={next}
          className="p-1 rounded-full shadow-sm bg-white/20 text-gray-800/10 hover:bg-white/80 hover:text-gray-800/80 hover:shadow"
        >
          < FaArrowCircleRight size={40} />
        </button>}
      </div>
    </div>
  );
};

export default React.memo(Carousel);
