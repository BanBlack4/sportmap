import { useState, useEffect, useCallback } from "react";
import { fetchClubs, fetchNearbyClubs } from "../api/clubs.api";
import { useGeolocation } from "./useGeolocation";

export function useClubs() {
  const { position, loading: geoLoading } = useGeolocation();

  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [sport, setSport] = useState("");
  const [radius, setRadius] = useState(5);
  const [useNearby, setUseNearby] = useState(true);

  const load = useCallback(async () => {
    if (geoLoading) return;
    setLoading(true);
    setError(null);
    try {
      let data;
      if (useNearby && position) {
        data = await fetchNearbyClubs({
          lat: position.lat,
          lng: position.lng,
          radius,
          sport,
          search,
        });
      } else {
        data = await fetchClubs({ sport, search });
      }
      setClubs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [position, geoLoading, useNearby, radius, sport, search]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    clubs,
    selectedClub,
    setSelectedClub,
    loading: loading || geoLoading,
    error,
    position,
    // filters
    search,
    setSearch,
    sport,
    setSport,
    radius,
    setRadius,
    useNearby,
    setUseNearby,
    reload: load,
  };
}
