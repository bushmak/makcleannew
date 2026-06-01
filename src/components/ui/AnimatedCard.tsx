"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  glow?: boolean;
  bordered?: boolean;
}

export default function AnimatedCard({
  children,
  className,
  delay = 0,
  hover = true,
  glow = false,
  bordered = false,
}: AnimatedCardProps) {
  return (
    <motion.div
      className={clsx(
        "relative bg-white rounded-2xl overflow-hidden shadow-md",
        "transition-shadow duration-150 will-change-transform",
        hover && "cursor-pointer",
        glow && "hover:shadow-blue-200 hover:shadow-xl",
        bordered && "border border-slate-100",
        !glow && hover && "hover:shadow-lg",
        className
      )}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.25,
        delay,
        ease: "easeOut",
      }}
      whileHover={
        hover
          ? {
              scale: 1.02,
              rotateX: 1.5,
              rotateY: -1.5,
              transition: { duration: 0.15, ease: "easeOut" },
            }
          : undefined
      }
      style={{
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Glow optimisé */}
      {glow && (
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(30,64,175,0.04) 100%)",
          }}
        />
      )}

      {/* Top accent line (CSS only) */}
      <div
        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 w-0 group-hover:w-full transition-all duration-300"
      />

      {children}
    </motion.div>
  );
}
