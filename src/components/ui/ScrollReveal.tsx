"use client";

import { motion, Variants, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  distance?: number;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  distance = 40,
}: ScrollRevealProps) {
  const pathname = usePathname();

  const directionMap: Record<Direction, { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...directionMap[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      key={pathname}
      className={clsx(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "0px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}