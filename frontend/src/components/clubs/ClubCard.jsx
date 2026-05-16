import { useNavigate } from "react-router-dom";

const SPORT_EMOJI = {
  fútbol: "⚽",
  tenis: "🎾",
  natación: "🏊",
  crossfit: "🏋️",
  básquetbol: "🏀",
  pádel: "🏓",
  yoga: "🧘",
  ciclismo: "🚴",
};

export function ClubCard({ club, selected, onClick }) {
  const navigate = useNavigate();
  const emoji = SPORT_EMOJI[club.sport] || "🏟️";

  return (
    <div
      onClick={onClick}
      style={{
        padding: "12px 14px",
        borderRadius: 8,
        border: selected ? "2px solid #2563eb" : "1px solid #e5e7eb",
        background: selected ? "#eff6ff" : "white",
        cursor: "pointer",
        transition: "all 0.15s",
        marginBottom: 8,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 22 }}>{emoji}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontWeight: 600, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {club.name}
          </p>
          <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>
            {club.sport}
            {club.distance != null && (
              <span style={{ marginLeft: 8 }}>· {club.distance.toFixed(1)} km</span>
            )}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/clubs/${club.id}`);
          }}
          style={{
            padding: "3px 8px",
            fontSize: 11,
            border: "1px solid #d1d5db",
            borderRadius: 4,
            background: "transparent",
            cursor: "pointer",
            color: "#374151",
            flexShrink: 0,
          }}
        >
          Ver →
        </button>
      </div>
      {club.address && (
        <p style={{ margin: "6px 0 0", fontSize: 12, color: "#9ca3af" }}>
          📍 {club.address}
        </p>
      )}
    </div>
  );
}
