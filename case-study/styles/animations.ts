import type { Variants } from "framer-motion";

export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
  viewport: { once: true, margin: "-100px" },
};

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

export const staggerContainer: Variants = {
  initial: {},
  whileInView: {},
};

export const staggerItem = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" as const },
  viewport: { once: true },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
  viewport: { once: true },
};

export const slideInRight = {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
  viewport: { once: true },
};

export const hoverLift = {
  rest: { y: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" },
  hover: {
    y: -4,
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    transition: { duration: 0.2 },
  },
};

export const floatAnimation = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      ease: "easeInOut" as const,
      repeat: Infinity,
    },
  },
};

export const stickyRotations = [-2, 1, -1, 2, -1.5, 0.5, 1, -2, 0.5, 1.5, -0.5, 2];
