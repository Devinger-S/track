import { useWindowSize } from 'usehooks-ts';



type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: { [key in Breakpoint]: number } = {
  xs: 0,      // Tailwind default: 0
  sm: 640,    // Tailwind default: 640px
  md: 768,    // Tailwind default: 768px
  lg: 1024,   // Tailwind default: 1024px
  xl: 1280,   // Tailwind default: 1280px
  '2xl': 1400 // Tailwind custom: 1400px
};

 const getBreakpoint = (width: number): Breakpoint => {
  if (width < breakpoints.sm) return 'xs';
  if (width < breakpoints.md) return 'sm';
  if (width < breakpoints.lg) return 'md';
  if (width < breakpoints.xl) return 'lg';
  if (width < breakpoints['2xl']) return 'xl';
  return '2xl';
};

export const useBreakpoint = (): {width:number,breakpoint:Breakpoint} => {
  const { width } = useWindowSize();
  return {
    width,
    breakpoint: getBreakpoint(width)
  }
};
