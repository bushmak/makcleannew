"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { INTERVENTION_AREA_LABEL, INTERVENTION_BASE_CITY } from "@/lib/intervention-area";
import "leaflet/dist/leaflet.css";

const CENTER: L.LatLngExpression = [50.6567, 3.6167]; // Montroeul-au-Bois

export default function Map() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    let map: L.Map | undefined;
    let resizeObserver: ResizeObserver | undefined;

    const initMap = () => {
      if (!containerRef.current || mapRef.current) return;

      map = L.map(containerRef.current, { scrollWheelZoom: false }).setView(CENTER, 9);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      L.circle(CENTER, {
        radius: 35000,
        color: "#2563eb",
        fillColor: "#2563eb",
        fillOpacity: 0.07,
        weight: 2,
        dashArray: "6 8",
      }).addTo(map);

      const icon = L.divIcon({
        html: `
          <div style="
            width: 44px; height: 44px;
            background: #1d4ed8;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 4px 16px rgba(29,78,216,0.4);
          ">
            <div style="
              transform: rotate(45deg);
              display: flex; align-items: center; justify-content: center;
              width: 100%; height: 100%;
              font-size: 18px;
            ">🧹</div>
          </div>
        `,
        className: "",
        iconSize: [44, 44],
        iconAnchor: [22, 44],
        popupAnchor: [0, -48],
      });

      L.marker(CENTER, { icon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:sans-serif;padding:4px;">
            <div style="font-weight:800;font-size:14px;color:#0f172a;margin-bottom:4px;">🧹 Makclean</div>
            <div style="font-size:12px;color:#64748b;line-height:1.45;">
              Siège · ${INTERVENTION_BASE_CITY}<br/>
              <span style="display:block;margin-top:6px;">${INTERVENTION_AREA_LABEL}</span>
            </div>
          </div>`
        );

      mapRef.current = map;

      resizeObserver = new ResizeObserver(() => {
        map?.invalidateSize();
      });
      resizeObserver.observe(containerRef.current);
      setTimeout(() => map?.invalidateSize(), 400);
    };

    const raf = requestAnimationFrame(initMap);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver?.disconnect();
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      if (container) {
        delete (container as HTMLDivElement & { _leaflet_id?: number })._leaflet_id;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: "100%", width: "100%", borderRadius: "20px", zIndex: 0 }}
      aria-label="Carte interactive des zones d'intervention Makclean"
    />
  );
}
