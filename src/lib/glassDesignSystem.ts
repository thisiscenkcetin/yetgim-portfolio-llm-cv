/**
 * Glass Design System — Tailwind Utilities & Color Tokens
 * Provides layered glassmorphism variants with semantic depth levels
 */

export const glassVariants = {
  layer1: {
    light: 'bg-white/50 dark:bg-white/10 backdrop-blur-[10px]',
    dark: 'bg-black/30 dark:bg-black/40 backdrop-blur-[10px]',
  },
  layer2: {
    light: 'bg-white/60 dark:bg-white/15 backdrop-blur-[20px]',
    dark: 'bg-black/40 dark:bg-black/50 backdrop-blur-[20px]',
  },
  layer3: {
    light: 'bg-white/70 dark:bg-white/20 backdrop-blur-[30px]',
    dark: 'bg-black/50 dark:bg-black/60 backdrop-blur-[30px]',
  },
};

export const glassColorTints = {
  blue: 'bg-gradient-to-br from-blue-400/10 to-transparent dark:from-blue-500/10',
  purple: 'bg-gradient-to-br from-purple-400/10 to-transparent dark:from-purple-500/10',
  pink: 'bg-gradient-to-br from-pink-400/10 to-transparent dark:from-pink-500/10',
  green: 'bg-gradient-to-br from-green-400/10 to-transparent dark:from-green-500/10',
};

export const glassInsetBorders = {
  subtle: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
  light: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.15)',
  medium: 'inset 0 1px 2px 0 rgba(255, 255, 255, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
};

export const glassGlowColors = {
  blue: 'shadow-[0_0_20px_rgba(59,130,246,0.3)] dark:shadow-[0_0_30px_rgba(96,165,250,0.2)]',
  purple: 'shadow-[0_0_20px_rgba(147,51,234,0.3)] dark:shadow-[0_0_30px_rgba(168,85,247,0.2)]',
  pink: 'shadow-[0_0_20px_rgba(236,72,153,0.3)] dark:shadow-[0_0_30px_rgba(244,114,182,0.2)]',
};

export const shadowDepths = {
  sm: 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]',
  md: 'shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]',
  lg: 'shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]',
  xl: 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]',
};

export const animationDurations = {
  ultra: '150ms',
  fast: '250ms',
  normal: '350ms',
  slow: '500ms',
  slower: '750ms',
  slowest: '1000ms',
};

export const easingCurves = {
  glass: 'cubic-bezier(0.16, 1, 0.3, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  linear: 'linear',
};
