import prisma from "../lib/prisma.js";
import { haversineDistance } from "../utils/geo.js";

export async function getAllClubsService({ sport, search } = {}) {
  return prisma.club.findMany({
    where: {
      ...(sport && { sport }),
      ...(search && {
        name: { contains: search},
      }),
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getClubByIdService(id) {
  return prisma.club.findUnique({ where: { id } });
}

export async function getNearbyClubsService(lat, lng, radiusKm = 5, { sport, search } = {}) {
  const clubs = await prisma.club.findMany({
    where: {
      ...(sport && { sport }),
      ...(search && {
        name: { contains: search },
      }),
    },
  });

  return clubs
    .map((club) => ({
      ...club,
      distance: haversineDistance(lat, lng, club.latitude, club.longitude),
    }))
    .filter((club) => club.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance);
}

export async function createClubService(data) {
  return prisma.club.create({ data });
}

export async function updateClubService(id, data) {
  return prisma.club.update({ where: { id }, data });
}

export async function deleteClubService(id) {
  return prisma.club.delete({ where: { id } });
}
