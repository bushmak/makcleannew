"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  INTERVENTION_AREA_LABEL,
  INTERVENTION_BASE_CITY,
} from "@/lib/intervention-area";

const CENTER: L.LatLngExpression = [50.6567, 3.6167];

export default function Map() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  const [isClient, setIsClient] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || hasError) return;

    const container = containerRef.current;

    if (!container || mapRef.current) return;

    try {
      const map = L.map(container, {
        scrollWheelZoom: false,
      }).setView(CENTER, 9);

      // OpenStreetMap
      const tiles = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        }
      );

      tiles.on("tileerror", (e) => {
        console.error("Erreur chargement tuile :", e);
      });

      tiles.addTo(map);

      // Zone d'intervention
      L.circle(CENTER, {
        radius: 35000,
        color: "#2563eb",
        fillColor: "#2563eb",
        fillOpacity: 0.07,
        weight: 2,
        dashArray: "6 8",
      }).addTo(map);

      // Marqueur personnalisé
      const icon = L.divIcon({
        html: `
          <div style="
            width:44px;
            height:44px;
            background:#1d4ed8;
            border-radius:50% 50% 50% 0;
            transform:rotate(-45deg);
            border:3px solid white;
            box-shadow:0 4px 16px rgba(29,78,216,0.4);
          ">
            <div style="
              transform:rotate(45deg);
              display:flex;
              align-items:center;
              justify-content:center;
              width:100%;
              height:100%;
              font-size:18px;
            ">
              🧹
            </div>
          </div>
        `,
        className: "",
        iconSize: [44, 44],
        iconAnchor: [22, 44],
        popupAnchor: [0, -48],
      });

      L.marker(CENTER, { icon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family:sans-serif;padding:4px;">
            <div style="
              font-weight:800;
              font-size:14px;
              color:#0f172a;
              margin-bottom:4px;
            ">
              🧹 Makclean
            </div>

            <div style="
              font-size:12px;
              color:#64748b;
              line-height:1.45;
            ">
              Siège · ${INTERVENTION_BASE_CITY}
              <br/>

              <span style="display:block;margin-top:6px;">
                ${INTERVENTION_AREA_LABEL}
              </span>
            </div>
          </div>
        `);

      mapRef.current = map;

      setTimeout(() => {
        map.invalidateSize();
      }, 300);
    } catch (err) {
      console.error("Erreur Leaflet :", err);
      setHasError(true);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isClient, hasError]);

  if (!isClient) {
    return (
      <p style={{ padding: "24px", textAlign: "center" }}>
        Chargement de la carte…
      </p>
    );
  }

  if (hasError) {
    return (
      <p style={{ padding: "24px", textAlign: "center" }}>
        Impossible de charger la carte.
      </p>
    );
  }

  return (
    <>
      <p className="sr-only">
        Carte interactive affichant les zones d’intervention de Makclean dans le
        Hainaut.
      </p>

      <div
        ref={containerRef}
        aria-label="Carte interactive des zones d'intervention Makclean"
        style={{
          width: "100%",
          height: "400px",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      />
    </>
  );
}