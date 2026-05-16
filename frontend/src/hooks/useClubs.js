import { useState, useEffect, useCallback, useRef } from "react";
import { fetchClubs, fetchNearbyClubs, fetchSports } from "../api/clubs.api";
import { useGeolocation } from "./useGeolocation";

export function useClubs() {
  const { position, loading: geoLoading } = useGeolocation();

  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sport, setSport] = useState("");
  const [radius, setRadius] = useState(5);
  const [useNearby, setUseNearby] = useState(true);

  // Available sports from DB
  const [availableSports, setAvailableSports] = useState([]);

  // Debounce search — only fires query 400ms after the user stops typing
  const debounceTimer = useRef(null);
  const handleSearch = useCallback((value) => {
    setSearch(value);
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => setDebouncedSearch(value), 400);
  }, []);

  // Load sports list once on mount
  useEffect(() => {
    fetchSports()
      .then(setAvailableSports)
      .catch(() => {}); // non-critical, sidebar falls back to empty list
  }, []);

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
          search: debouncedSearch,
        });
      } else {
        data = await fetchClubs({ sport, search: debouncedSearch });
      }
      setClubs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [position, geoLoading, useNearby, radius, sport, debouncedSearch]);

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
    setSearch: handleSearch,
    sport,
    setSport,
    radius,
    setRadius,
    useNearby,
    setUseNearby,
    availableSports,
    reload: load,
  };
}
