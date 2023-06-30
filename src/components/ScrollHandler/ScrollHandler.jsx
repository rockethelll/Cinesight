import { useEffect } from "react";

function ScrollHandler() {
  useEffect(() => {
    const handleScroll = (event) => {
      const { deltaX, deltaY } = event;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        event.preventDefault();
        // Faire défiler le carousel horizontalement
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}

export default ScrollHandler;
