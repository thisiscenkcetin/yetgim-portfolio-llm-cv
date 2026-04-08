/**
 * Scroll Gradient Context — Provides scroll-linked animations
 * Uses Framer Motion useScroll hooks for efficient scroll tracking
 */

import React, { ReactNode, createContext, useContext } from 'react';
import { useScroll, MotionValue } from 'framer-motion';

interface ScrollGradientContextType {
  scrollYProgress: MotionValue<number>;
  scrollX: MotionValue<number>;
}

const ScrollGradientContext = createContext<ScrollGradientContextType | null>(null);

export const ScrollGradientProvider = ({ children }: { children: ReactNode }) => {
  const { scrollYProgress, scrollX } = useScroll();

  return (
    <ScrollGradientContext.Provider value={{ scrollYProgress, scrollX }}>
      {children}
    </ScrollGradientContext.Provider>
  );
};

export const useScrollGradient = () => {
  const context = useContext(ScrollGradientContext);
  if (!context) {
    throw new Error('useScrollGradient must be used within ScrollGradientProvider');
  }
  return context;
};
