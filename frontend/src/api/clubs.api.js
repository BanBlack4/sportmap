const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function fetchClubs({ sport, search } = {}) {
  const params = new URLSearchParams();
  if (sport) params.set("sport", sport);
  if (search) params.set("search", search);
  const res = await fetch(`${API_URL}/clubs?${params}`);
  if (!res.ok) throw new Error("Error al obtener clubes");
  return res.json();
}

export async function fetchNearbyClubs({ lat, lng, radius = 5, sport, search } = {}) {
  const params = new URLSearchParams({ lat, lng, radius });
  if (sport) params.set("sport", sport);
  if (search) params.set("search", search);
  const res = await fetch(`${API_URL}/clubs/nearby?${params}`);
  if (!res.ok) throw new Error("Error al obtener clubes cercanos");
  return res.json();
}

export async function fetchClubById(id) {
  const res = await fetch(`${API_URL}/clubs/${id}`);
  if (!res.ok) throw new Error("Club no encontrado");
  return res.json();
}

export async function createClub(data) {
  const res = await fetch(`${API_URL}/clubs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear club");
  return res.json();
}

export async function updateClub(id, data) {
  const res = await fetch(`${API_URL}/clubs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar club");
  return res.json();
}

export async function deleteClub(id) {
  const res = await fetch(`${API_URL}/clubs/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar club");
}

export async function fetchSports() {
  const res = await fetch(`${API_URL}/clubs/sports`);

  if (!res.ok) {
    throw new Error("Error al obtener deportes");
  }

  return res.json();
}
