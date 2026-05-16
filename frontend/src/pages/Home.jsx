import { useEffect } from "react";
import { MapView } from "../components/map/MapView";
import { ClubSidebar } from "../components/clubs/ClubSidebar";
import { useClubs } from "../hooks/useClubs";

export function Home() {
  const {
    clubs,
    selectedClub,
    setSelectedClub,
    loading,
    error,
    position,
    search,
    setSearch,
    sport,
    setSport,
    radius,
    setRadius,
    useNearby,
    setUseNearby,
  } = useClubs();

  // Cuando se selecciona un club desde el mapa, también hacer scroll en el sidebar
  useEffect(() => {
    if (selectedClub) {
      const el = document.getElementById(`club-${selectedClub.id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedClub]);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{ width: 320, flexShrink: 0, borderRight: "1px solid #e5e7eb", overflow: "hidden" }}>
        <ClubSidebar
          clubs={clubs}
          selectedClub={selectedClub}
          onSelectClub={setSelectedClub}
          loading={loading}
          error={error}
          search={search}
          onSearch={setSearch}
          sport={sport}
          onSport={setSport}
          radius={radius}
          onRadius={setRadius}
          useNearby={useNearby}
          onToggleNearby={setUseNearby}
        />
      </div>

      {/* Mapa */}
      <div style={{ flex: 1, position: "relative" }}>
        {loading && (
          <div style={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            background: "white",
            padding: "6px 14px",
            borderRadius: 20,
            fontSize: 13,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}>
            Cargando...
          </div>
        )}
        <MapView
          clubs={clubs}
          selectedClub={selectedClub}
          onSelectClub={setSelectedClub}
          position={position}
          radius={radius}
          useNearby={useNearby}
        />
      </div>
    </div>
  );
}
