import { ClubCard } from "./ClubCard";

const SPORTS = ["", "fútbol", "tenis", "natación", "crossfit", "básquetbol", "pádel", "yoga", "ciclismo"];

export function ClubSidebar({
  clubs,
  selectedClub,
  onSelectClub,
  loading,
  error,
  search,
  onSearch,
  sport,
  onSport,
  radius,
  onRadius,
  useNearby,
  onToggleNearby,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f9fafb" }}>
      {/* Header de búsqueda */}
      <div style={{ padding: "14px 14px 10px", borderBottom: "1px solid #e5e7eb", background: "white" }}>
        <input
          type="text"
          placeholder="Buscar club..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid #d1d5db",
            fontSize: 14,
            boxSizing: "border-box",
            outline: "none",
          }}
        />

        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <select
            value={sport}
            onChange={(e) => onSport(e.target.value)}
            style={{
              flex: 1,
              padding: "6px 8px",
              borderRadius: 6,
              border: "1px solid #d1d5db",
              fontSize: 13,
              background: "white",
            }}
          >
            <option value="">Todos los deportes</option>
            {SPORTS.filter(Boolean).map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>

          <label style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#374151", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={useNearby}
              onChange={(e) => onToggleNearby(e.target.checked)}
            />
            Cercanos
          </label>
        </div>

        {useNearby && (
          <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: "#6b7280", whiteSpace: "nowrap" }}>Radio:</span>
            <input
              type="range"
              min={1}
              max={20}
              value={radius}
              onChange={(e) => onRadius(Number(e.target.value))}
              style={{ flex: 1 }}
            />
            <span style={{ fontSize: 12, color: "#374151", minWidth: 38 }}>{radius} km</span>
          </div>
        )}
      </div>

      {/* Lista de clubes */}
      <div style={{ flex: 1, overflowY: "auto", padding: 10 }}>
        {loading && (
          <p style={{ textAlign: "center", color: "#9ca3af", fontSize: 14, marginTop: 24 }}>
            Cargando clubes...
          </p>
        )}

        {error && !loading && (
          <p style={{ textAlign: "center", color: "#ef4444", fontSize: 13, marginTop: 16 }}>
            {error}
          </p>
        )}

        {!loading && !error && clubs.length === 0 && (
          <p style={{ textAlign: "center", color: "#9ca3af", fontSize: 14, marginTop: 24 }}>
            No se encontraron clubes.
          </p>
        )}

        {!loading && clubs.map((club) => (
          <ClubCard
            key={club.id}
            club={club}
            selected={selectedClub?.id === club.id}
            onClick={() => onSelectClub(club)}
          />
        ))}
      </div>

      <div style={{ padding: "8px 14px", borderTop: "1px solid #e5e7eb", background: "white" }}>
        <p style={{ margin: 0, fontSize: 12, color: "#9ca3af" }}>
          {clubs.length} club{clubs.length !== 1 ? "es" : ""} encontrado{clubs.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
