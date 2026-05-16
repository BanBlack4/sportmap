import { useState, useEffect } from "react";

export function useGeolocation() {
  const [position, setPosition] = useState(null); // { lat, lng }
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Tu navegador no soporta geolocalización");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosition({ lat: coords.latitude, lng: coords.longitude });
        setLoading(false);
      },
      (err) => {
        // Si el usuario deniega, centramos en Santiago por defecto
        setPosition({ lat: -33.4489, lng: -70.6693 });
        setError("Usando ubicación por defecto (Santiago)");
        setLoading(false);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  }, []);

  return { position, error, loading };
}
