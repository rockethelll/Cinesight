import React, { useRef, useEffect, useState } from "react";

const useScrollDetection = () => {
  const touchStartRef = useRef(null);
  const [isVerticalScroll, setIsVerticalScroll] = useState(false);

  const handleTouchStart = (event) => {
    touchStartRef.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    const touchEnd = event.touches[0].clientX;
    const touchStart = touchStartRef.current;

    if (touchStart - touchEnd > 10) {
      setIsVerticalScroll(false); // Scroll horizontal vers la gauche
    } else if (touchEnd - touchStart > 10) {
      setIsVerticalScroll(false); // Scroll horizontal vers la droite
    } else {
      setIsVerticalScroll(true); // Scroll vertical
    }
  };

  useEffect(() => {
    const element = document.documentElement;
    element.addEventListener("touchstart", handleTouchStart);
    element.addEventListener("touchmove", handleTouchMove);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return isVerticalScroll;
};

export default useScrollDetection;
