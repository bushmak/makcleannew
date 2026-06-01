"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;

  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";

  href?: string;
  onClick?: () => void;

  icon?: "left" | "right" | false;

  loading?: boolean;
  disabled?: boolean;

  fullWidth?: boolean;

  className?: string;

  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  icon = "right",
  loading = false,
  disabled = false,
  fullWidth = false,
  className,
  type = "button",
}: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 overflow-hidden group cursor-pointer select-none whitespace-normal";

  const variants = {
    primary:
      "bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-xl",

    secondary:
      "bg-white text-blue-700 border border-blue-300 shadow-md hover:bg-blue-50",

    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",

    ghost:
      "text-blue-700 hover:bg-blue-100",
  };

  const sizes = {
    sm: "px-8 py-2 text-[11px] min-h-[38px] min-w-[120px]",
    md: "px-12 py-3 text-sm min-h-[46px] min-w-[200px]",
    lg: "px-16 py-4 text-base min-h-[56px] min-w-[220px]",
  };

  const classes = clsx(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    (disabled || loading) && "opacity-60 pointer-events-none",
    className
  );

  const Icon = (
    <ArrowRight className="w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
  );

  const content = (
    <>
      {/* shimmer adouci */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />

      {loading && <Loader2 className="w-5 h-5 animate-spin absolute" />}

      {/* Nouveau layout : flex + gap = plus aucun chevauchement */}
      <span
        className={clsx(
          "flex w-full items-center justify-center gap-3 px-4",
          size === "sm" && "text-[12px]",
          loading && "opacity-0"
        )}
      >
        {icon === "left" && !loading && Icon}
        {children}
        {icon === "right" && !loading && Icon}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}>
        <Link href={href}>
          <div className={classes}>{content}</div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
    >
      {content}
    </motion.button>
  );
}
