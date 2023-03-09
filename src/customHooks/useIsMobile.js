import { useState, useEffect } from "react";

// this is a custom hook that will be used inside Sqaure and Rectangle.
// it detects the screen size window.innerWidth < 768 and gives us True or false.
// the additional return inside hook is a cleanup function to avoid any weird bugs that useEffect can cause
// now this hook will retrun True or False, and back inside Rectangle or Sqaure, it will decide which content to be rendered on the screen.

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 767);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
