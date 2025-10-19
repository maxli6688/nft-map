import { useState, useEffect } from 'react';

const useViewport = () => {
  const [height, setWH] = useState<number>(window.innerHeight);
  const [width, setWW] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWH(window.innerHeight);
      setWW(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);
  return { width, height };
};
export default useViewport;
