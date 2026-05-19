"use client";

import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
<button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className={`fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full text-white flex items-center justify-center transition-all duration-300
  ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}
  style={{
    backgroundColor: "#1d4ed8",
    boxShadow: "0 0 30px rgba(29,78,216,0.5)",
  }}
>
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-5 h-5"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
</svg>
</button>  

);
}