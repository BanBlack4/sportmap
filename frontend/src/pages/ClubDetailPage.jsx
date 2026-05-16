import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchClubById } from "../api/clubs.api";

const SPORT_EMOJI = {
  fútbol: "⚽", tenis: "🎾", natación: "🏊", crossfit: "🏋️",
  básquetbol: "🏀", pádel: "🏓", yoga: "🧘", ciclismo: "🚴",
};

export function ClubDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClubById(id)
      .then(setClub)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Cargando...</div>;
  if (error) return <div style={{ padding: 40, color: "#ef4444" }}>{error}</div>;
  if (!club) return null;

  const emoji = SPORT_EMOJI[club.sport] || "🏟️";

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "24px 16px" }}>
      <button
        onClick={() => navigate(-1)}
        style={{ marginBottom: 16, background: "none", border: "none", cursor: "pointer", color: "#2563eb", fontSize: 14 }}
      >
        ← Volver
      </button>

      <div style={{ background: "white", borderRadius: 12, border: "1px solid #e5e7eb", overflow: "hidden" }}>
        {club.imageUrl && (
          <img src={club.imageUrl} alt={club.name} style={{ width: "100%", height: 200, objectFit: "cover" }} />
        )}
        <div style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 36 }}>{emoji}</span>
            <div>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{club.name}</h1>
              <span style={{ fontSize: 13, color: "#6b7280", textTransform: "capitalize" }}>{club.sport}</span>
            </div>
          </div>

          <InfoRow label="📍 Dirección" value={club.address} />
          {club.phone && <InfoRow label="📞 Teléfono" value={club.phone} />}
          {club.email && <InfoRow label="✉️ Email" value={club.email} />}
          {club.website && (
            <InfoRow label="🌐 Sitio web" value={<a href={club.website} target="_blank" rel="noreferrer">{club.website}</a>} />
          )}
          {club.schedule && <InfoRow label="🕐 Horario" value={club.schedule} />}
          {club.description && (
            <div style={{ marginTop: 16, padding: "12px 14px", background: "#f9fafb", borderRadius: 8, fontSize: 14, color: "#374151", lineHeight: 1.6 }}>
              {club.description}
            </div>
          )}

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${club.latitude},${club.longitude}`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              marginTop: 20,
              padding: "10px 18px",
              background: "#2563eb",
              color: "white",
              borderRadius: 8,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Cómo llegar →
          </a>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: "1px solid #f3f4f6", fontSize: 14 }}>
      <span style={{ color: "#6b7280", minWidth: 110 }}>{label}</span>
      <span style={{ color: "#111827" }}>{value}</span>
    </div>
  );
}
