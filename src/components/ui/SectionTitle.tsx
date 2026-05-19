"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import BrandName, { injectBrandName, titleContainsBrand } from "@/components/ui/BrandName";

interface SectionTitleProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  light?: boolean;
}

export default function SectionTitle({
  badge,
  title,
  highlight,
  subtitle,
  align = "center",
  light = false,
}: SectionTitleProps) {
  const alignClass = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  const highlightSpan = (word: string, key?: string) => (
    <span key={key} className="relative inline-block">
      <span className="relative z-10 text-blue-600">{word}</span>
      <motion.span
        className="absolute bottom-1 left-0 h-3 bg-blue-100 w-full -z-0 rounded"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />
    </span>
  );

  const renderTitle = () => {
    if (!highlight) {
      return titleContainsBrand(title) ? injectBrandName(title) : title;
    }

    if (titleContainsBrand(title)) {
      const brandMatch = title.match(/Mak\s*[Cc]lean/i);
      if (brandMatch && brandMatch.index !== undefined) {
        const rest = title.slice(brandMatch.index + brandMatch[0].length);
        if (rest.includes(highlight)) {
          const restParts = rest.split(highlight);
          return (
            <>
              <BrandName />
              {restParts[0]}
              {highlightSpan(highlight)}
              {restParts[1]}
            </>
          );
        }
        return (
          <>
            <BrandName />
            {rest}
          </>
        );
      }
    }

    const parts = title.split(highlight);
    return (
      <>
        {parts[0]}
        {highlightSpan(highlight)}
        {parts[1]}
      </>
    );
  };

  return (
    <motion.div
      className={clsx("flex flex-col gap-3 mb-12", alignClass[align])}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
{badge && (
  <motion.span
    className={clsx(
      "inline-flex items-center gap-2 rounded-full font-semibold tracking-wide uppercase w-fit",
      light
        ? "bg-white/20 text-white border border-white/30"
        : "bg-blue-50 text-blue-700 border border-blue-200"
    )}
    style={{ padding: "10px 20px", fontSize: "13px", letterSpacing: "1px" }}
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: 0.1 }}
  >
    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
    {badge}
  </motion.span>
)}

      <motion.h2
        className={clsx(
          "text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight",
          light ? "text-white" : "text-slate-900"
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {renderTitle()}
      </motion.h2>

      {subtitle && (
        <motion.p
          className={clsx(
            "text-base md:text-lg max-w-2xl leading-relaxed",
            light ? "text-blue-100" : "text-slate-500"
          )}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        className={clsx(
          "flex gap-1.5 mt-1",
          align === "center" && "justify-center",
          align === "right" && "justify-end"
        )}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className={clsx("h-1 w-8 rounded-full", light ? "bg-white" : "bg-blue-600")} />
        <div className={clsx("h-1 w-4 rounded-full", light ? "bg-white/50" : "bg-blue-300")} />
        <div className={clsx("h-1 w-2 rounded-full", light ? "bg-white/25" : "bg-blue-200")} />
      </motion.div>
    </motion.div>
  );
}
