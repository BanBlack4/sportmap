import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CenterMap } from "./CenterMap";

// Fix Leaflet default icon paths (known Vite issue)
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

const userIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="8" fill="#2563eb" stroke="white" stroke-width="2"/>
    </svg>`),
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

export function MapView({ clubs, selectedClub, onSelectClub, position, radius, useNearby }) {
  const navigate = useNavigate();
  const center = position
    ? [position.lat, position.lng]
    : [-33.4489, -70.6693];

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <CenterMap position={position} />

      {/* Círculo de radio de búsqueda */}
      {position && useNearby && (
        <Circle
          center={[position.lat, position.lng]}
          radius={radius * 1000}
          pathOptions={{ color: "#2563eb", fillColor: "#2563eb", fillOpacity: 0.05 }}
        />
      )}

      {/* Marker de la posición del usuario */}
      {position && (
        <Marker position={[position.lat, position.lng]} icon={userIcon}>
          <Popup>Tu ubicación</Popup>
        </Marker>
      )}

      {/* Markers de clubes */}
      {clubs.map((club) => (
        <Marker
          key={club.id}
          position={[club.latitude, club.longitude]}
          eventHandlers={{
            click: () => onSelectClub(club),
          }}
        >
          <Popup>
            <div style={{ minWidth: 160 }}>
              <strong>{club.name}</strong>
              <p style={{ margin: "4px 0", fontSize: 12, color: "#555" }}>
                {club.sport}
              </p>
              {club.distance != null && (
                <p style={{ margin: "4px 0", fontSize: 12 }}>
                  📍 {club.distance.toFixed(1)} km
                </p>
              )}
              <button
                onClick={() => navigate(`/clubs/${club.id}`)}
                style={{
                  marginTop: 6,
                  padding: "4px 10px",
                  fontSize: 12,
                  cursor: "pointer",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                }}
              >
                Ver detalle →
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
