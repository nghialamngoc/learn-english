// 1. Import the utilities
import { extendTheme } from '@chakra-ui/react';

// 2. Update the breakpoints as key-value pairs
const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
  '2xl': '1536px',
};

// 3. Extend the theme
const theme = extendTheme({ breakpoints });

export default theme;