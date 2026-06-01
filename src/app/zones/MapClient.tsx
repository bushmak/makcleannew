"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/ui/Map"), {
  ssr: false,
  loading: () => (
    <p style={{ padding: "24px", textAlign: "center", color: "#475569" }}>
      Chargement de la carte…
    </p>
  ),
});

export default function MapClient() {
  return (
    <div
      style={{
        height: "420px",
        width: "100%",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <Map />
    </div>
  );
}
