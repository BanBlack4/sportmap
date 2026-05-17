import prisma from "../lib/prisma.js";
import { haversineDistance } from "../utils/geo.js";

export async function getAllClubsService({ sport, search } = {}) {
  return prisma.club.findMany({
    where: {
      ...(sport && { sport }),
      ...(search && {
        name: {
          contains: search
        }
      })
    },

    include: {
      scheduleData: true
    },

    orderBy: {
      createdAt: "desc"
    }
  });
}

export async function getClubByIdService(id) {
  return prisma.club.findUnique({
    where: { id },

    include: {
      scheduleData: true
    }
  });
}

export async function getNearbyClubsService(
  lat,
  lng,
  radiusKm = 5,
  { sport, search } = {}
) {
  const clubs = await prisma.club.findMany({
    where: {
      ...(sport && { sport }),
      ...(search && {
        name: {
          contains: search
        }
      })
    },

    include: {
      scheduleData: true
    }
  });

  return clubs
    .map((club) => ({
      ...club,
      distance: haversineDistance(
        lat,
        lng,
        club.latitude,
        club.longitude
      )
    }))
    .filter((club) => club.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance);
}

export async function createClubService(data){

   console.log(data);

   const { scheduleData, ...clubData } = data;

   return prisma.club.create({
      data:{
         ...clubData,

         scheduleData: scheduleData
         ? {
             create:scheduleData
           }
         : undefined
      },

      include:{
         scheduleData:true
      }
   });

}

export async function updateClubService(id, data) {
  return prisma.club.update({
    where: { id },
    data
  });
}

export async function deleteClubService(id) {
  return prisma.club.delete({
    where: { id }
  });
}

export async function getAvailableSportsService() {
  const result = await prisma.club.findMany({
    select: { sport: true },
    distinct: ["sport"],
    orderBy: { sport: "asc" }
  });

  return result.map((r) => r.sport);
}