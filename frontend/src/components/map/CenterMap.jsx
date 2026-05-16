import { useEffect } from "react";
import { useMap } from "react-leaflet";

export function CenterMap({ position, zoom = 13 }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lng], zoom, { animate: true });
    }
  }, [position, zoom, map]);

  return null;
}
