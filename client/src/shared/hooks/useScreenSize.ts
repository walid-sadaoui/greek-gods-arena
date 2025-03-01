import { useState, useEffect } from "react";

const useScreenSize = (): {
  screenSize: { width: number; height: number };
  isLargeScreen: boolean;
} => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(
    window.innerWidth > 1024 && window.innerHeight > 968
  );

  useEffect(() => {
    const handleResize = (): void => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setIsLargeScreen(window.innerWidth > 1024 && window.innerHeight > 968);
    };
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { screenSize, isLargeScreen };
};

export default useScreenSize;
