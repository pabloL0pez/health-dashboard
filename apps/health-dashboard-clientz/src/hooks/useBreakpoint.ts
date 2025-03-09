import { useMedia } from "@/hooks/useMedia";
import { screenSizes } from "@/shared/screen-sizes";

interface IBreakpoint {
  isDesktop: boolean;
  isTabletLandscape: boolean;
  isTabletPortrait: boolean;
  isMobile: boolean;
}

export const useBreakpoint = (): IBreakpoint => {
  const { desktop, tabletLandscape, tabletPortrait, mobile } = screenSizes;

  const isDesktop = useMedia(`(min-width: ${desktop}px)`);
  const isTabletLandscape = useMedia(`(min-width: ${tabletLandscape}px)`);
  const isTabletPortrait = useMedia(`(min-width: ${tabletPortrait}px)`);
  const isMobile = useMedia(`(max-width: ${mobile}px)`);

  return {
    isDesktop,
    isTabletLandscape,
    isTabletPortrait,
    isMobile,
  }
}