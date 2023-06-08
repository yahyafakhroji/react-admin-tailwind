import { useEffect, useState } from 'react';

const breakpointInt = (str = '') => {
  return parseInt(str.replace('px', ''), 10);
};

// @TODO: Find the best way, to get screens value from tailwind config
const screens = {
  xs: '576',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

const breakpoint = {
  '2xl': breakpointInt(screens['2xl']), // 1536
  xl: breakpointInt(screens.xl), // 1280
  lg: breakpointInt(screens.lg), // 1024
  md: breakpointInt(screens.md), // 768
  sm: breakpointInt(screens.sm), // 640
  xs: breakpointInt(screens.xs), // 576
};

const useResponsive = () => {
  const getAllSizes = (comparator = 'smaller') => {
    const currentWindowWidth = window.innerWidth;

    return Object.fromEntries(
      Object.entries(breakpoint).map(([key, value]) => [
        key,
        comparator === 'larger' ? currentWindowWidth > value : currentWindowWidth < value,
      ])
    );
  };

  const getResponsiveState = () => {
    const currentWindowWidth = window.innerWidth;

    return {
      windowWidth: currentWindowWidth,
      larger: getAllSizes('larger'),
      smaller: getAllSizes('smaller'),
    };
  };

  const [responsive, setResponsive] = useState(getResponsiveState());

  const resizeHandler = () => {
    const responsiveState = getResponsiveState();

    setResponsive(responsiveState);
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responsive.windowWidth]);

  return responsive;
};

export default useResponsive;
