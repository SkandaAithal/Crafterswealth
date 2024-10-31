import { useEffect, useState } from "react";

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isMobile = windowWidth !== null && windowWidth <= 768;

  return { windowWidth: windowWidth!, isMobile };
};
