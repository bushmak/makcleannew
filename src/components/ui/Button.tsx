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
      "bg-blue-700 text-white shadow-lg shadow-blue-700/30 hover:bg-blue-800 hover:shadow-xl",

    secondary:
      "bg-white text-blue-700 border border-blue-200 shadow-md hover:bg-blue-50",

    outline:
      "border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white",

    ghost:
      "text-blue-700 hover:bg-blue-50",
  };

  // 🔥 Padding beaucoup plus large pour éviter tout collage
  // + largeur minimale pour garder les boutons larges même sur courts textes
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
      {/* shimmer */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 text-[13px]" />

      {loading && <Loader2 className="w-5 h-5 animate-spin absolute" />}

      {/* Contenu centré ; icône positionnée en absolu sans recouvrir le texte */}
      <span
        className={clsx(
          "flex w-full items-center justify-center gap-3 px-4",
          size === "sm" && "text-[12px]",
          icon === "left" && "pl-18",
          // Add extra right padding to keep the text centered while giving the icon more space
          icon === "right" && "pr-24",
          loading && "opacity-0"
        )}
      >
        {children}
      </span>

      {!loading && icon === "left" && (
        <span className="absolute left-10 flex items-center justify-center pointer-events-none">
          {Icon}
        </span>
      )}

      {!loading && icon === "right" && (
        <span className="absolute right-1 flex items-center justify-center pointer-events-none">
          {Icon}
        </span>
      )}
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