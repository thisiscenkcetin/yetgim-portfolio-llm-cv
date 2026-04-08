/**
 * Micro-Interactions System — Reusable Framer Motion Variants
 * Provides consistent animation vocabulary across all components
 */

export const microAnimations = {
  // Ripple Effect for Buttons
  rippleButton: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 },
  },

  // Morph on Hover
  morphScale: {
    initial: { scale: 1, borderRadius: '12px' },
    whileHover: { scale: 1.05, borderRadius: '16px', boxShadow: '0 0 30px rgba(0, 113, 227, 0.3)' },
    transition: { duration: 0.3, type: 'spring' as const, stiffness: 300, damping: 20 },
  },

  // Glow Pulse
  glowPulse: {
    initial: { boxShadow: '0 0 0px rgba(0, 113, 227, 0.3)' },
    animate: { boxShadow: '0 0 20px rgba(0, 113, 227, 0.5)' },
    transition: { duration: 2, repeat: Infinity as const, repeatType: 'mirror' as const },
  },

  // Shimmer/Shine Effect
  shimmerShine: {
    initial: { backgroundPosition: '0% 0%' },
    animate: { backgroundPosition: '200% 0%' },
    transition: { duration: 2, repeat: Infinity as const, ease: 'linear' },
  },

  // Text Reveal
  textReveal: {
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    viewport: { once: true },
  },

  // Stagger Container
  staggerContainer: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { staggerChildren: 0.1 },
    viewport: { once: true },
  },

  // Stagger Item
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },

  // Fade Up Entrance
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    viewport: { once: true, margin: '0px 0px -100px 0px' },
  },

  // Slide In from Left
  slideInLeft: {
    initial: { opacity: 0, x: -40 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    viewport: { once: true },
  },

  // Slide In from Right
  slideInRight: {
    initial: { opacity: 0, x: 40 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    viewport: { once: true },
  },

  // Scale & Fade Entrance
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, type: 'spring' as const, stiffness: 300 },
    viewport: { once: true },
  },

  // Bounce Scale
  bounceScale: {
    initial: { scale: 1 },
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
  },
};

// Easing curves for consistency
export const easings = {
  glass: [0.16, 1, 0.3, 1],
  spring: [0.34, 1.56, 0.64, 1],
  smooth: [0.4, 0, 0.2, 1],
};
