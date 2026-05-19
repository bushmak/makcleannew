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
        "relative bg-white rounded-2xl overflow-hidden transition-shadow duration-300",
        hover && "cursor-pointer",
        glow && "hover:shadow-blue-200 hover:shadow-2xl",
        bordered && "border border-slate-100",
        !glow && hover && "hover:shadow-xl",
        "shadow-md",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={
        hover
          ? {
              y: -6,
              transition: { duration: 0.25, ease: "easeOut" },
            }
          : undefined
      }
    >
      {/* Glow border effect */}
      {glow && (
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(30,64,175,0.04) 100%)",
          }}
        />
      )}

      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 w-0 group-hover:w-full transition-all duration-500"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.4 }}
      />

      {children}
    </motion.div>
  );
}