"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function RealMap({
  latitude,
  longitude,
  places = [],
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (
      typeof latitude !== "number" ||
      typeof longitude !== "number"
    ) {
      return;
    }

    if (!mapRef.current) {
      return;
    }

    /*
     * CREATE MAP
     */
    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: true,
        minZoom: 3,
        maxZoom: 19,
      }).setView(
        [latitude, longitude],
        13
      );

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          subdomains: ["a", "b", "c"],
          minZoom: 3,
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      ).addTo(map);

      mapInstanceRef.current = map;
    }

    const map =
      mapInstanceRef.current;

    /*
     * KEEP CURRENT ZOOM
     */
    const currentZoom =
      map.getZoom();

    map.setView(
      [latitude, longitude],
      currentZoom
    );

    /*
     * REMOVE OLD MARKERS
     */
    markersRef.current.forEach(
      (marker) => {
        marker.remove();
      }
    );

    markersRef.current = [];

    /*
     * USER LOCATION ICON
     */
    const userIcon =
      L.divIcon({
        className:
          "dar-user-location",

        html: `
          <div class="dar-user-location-wrapper">
            <div class="dar-user-location-pulse"></div>
            <div class="dar-user-location-dot"></div>
          </div>
        `,

        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18],
      });

    /*
     * USER LOCATION MARKER
     */
    const userMarker =
      L.marker(
        [latitude, longitude],
        {
          icon: userIcon,
          zIndexOffset: 10000,
        }
      )
        .addTo(map)
        .bindPopup(`
          <div
            style="
              min-width:160px;
              text-align:center;
              font-family:Arial,sans-serif;
            "
          >
            <strong
              style="
                display:block;
                font-size:14px;
                color:#111827;
                margin-bottom:4px;
              "
            >
              You are here
            </strong>

            <span
              style="
                display:block;
                font-size:11px;
                color:#6b7280;
              "
            >
              Your current location
            </span>
          </div>
        `);

    markersRef.current.push(
      userMarker
    );

    /*
     * REAL DATABASE PLACES
     */
    places.forEach((place) => {
      if (
        typeof place.latitude !==
          "number" ||
        typeof place.longitude !==
          "number"
      ) {
        return;
      }

      const placeIcon =
        L.divIcon({
          className:
            "dar-place-marker",

          html: `
            <div class="dar-place-marker-wrapper">
              <div class="dar-place-marker-pin"></div>
            </div>
          `,

          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -16],
        });

      const marker =
        L.marker(
          [
            place.latitude,
            place.longitude,
          ],
          {
            icon: placeIcon,
          }
        )
          .addTo(map)
          .bindPopup(`
            <div
              style="
                min-width:170px;
                font-family:Arial,sans-serif;
              "
            >

              <strong
                style="
                  display:block;
                  font-size:14px;
                  color:#111827;
                  margin-bottom:5px;
                "
              >
                ${escapeHtml(
                  place.title
                )}
              </strong>

              ${
                place.category
                  ? `
                    <span
                      style="
                        display:block;
                        font-size:11px;
                        color:#6b7280;
                        margin-bottom:4px;
                      "
                    >
                      ${escapeHtml(
                        place.category
                      )}
                    </span>
                  `
                  : ""
              }

              ${
                place.location
                  ? `
                    <span
                      style="
                        display:block;
                        font-size:11px;
                        color:#6b7280;
                        margin-bottom:4px;
                      "
                    >
                      ${escapeHtml(
                        place.location
                      )}
                    </span>
                  `
                  : ""
              }

              ${
                typeof place.distance ===
                "number"
                  ? `
                    <span
                      style="
                        display:block;
                        margin-top:6px;
                        font-size:11px;
                        font-weight:bold;
                        color:#16a34a;
                      "
                    >
                      ${place.distance.toFixed(
                        1
                      )} km away
                    </span>
                  `
                  : ""
              }

              <button
                type="button"
                onclick="window.location.href='/places/${Number(
                  place.id
                )}'"
                style="
                  width:100%;
                  margin-top:10px;
                  padding:8px 10px;
                  border:none;
                  border-radius:8px;
                  background:#111827;
                  color:white;
                  font-size:11px;
                  font-weight:700;
                  cursor:pointer;
                "
              >
                Explore place
              </button>

            </div>
          `);

      markersRef.current.push(
        marker
      );
    });

    /*
     * ZOOM IN
     */
    function handleZoomIn() {
      map.zoomIn();
    }

    /*
     * ZOOM OUT
     */
    function handleZoomOut() {
      map.zoomOut();
    }

    window.addEventListener(
      "dar-discover-map-zoom-in",
      handleZoomIn
    );

    window.addEventListener(
      "dar-discover-map-zoom-out",
      handleZoomOut
    );

    /*
     * CLEAN EVENT LISTENERS
     */
    return () => {
      window.removeEventListener(
        "dar-discover-map-zoom-in",
        handleZoomIn
      );

      window.removeEventListener(
        "dar-discover-map-zoom-out",
        handleZoomOut
      );
    };
  }, [
    latitude,
    longitude,
    places,
  ]);

  /*
   * DESTROY MAP
   */
  useEffect(() => {
    return () => {
      if (
        mapInstanceRef.current
      ) {
        mapInstanceRef.current.remove();

        mapInstanceRef.current =
          null;
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="h-full min-h-[420px] w-full overflow-hidden rounded-[28px]"
    />
  );
}

/*
 * SECURITY:
 * Escape database text before
 * inserting it into Leaflet popup HTML.
 */
function escapeHtml(value) {
  if (
    typeof value !== "string"
  ) {
    return "";
  }

  return value
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );
}