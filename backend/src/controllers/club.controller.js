import { clubSchema } from "../validators/club.validators.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import * as clubService from "../services/club.service.js";

export const getAllClubs = asyncHandler(async (req,res)=>{
  const { sport, search } = req.query;

  const clubs =
    await clubService.getAllClubsService({
      sport,
      search
    });

  res.json(clubs);
});

export const getClubById = async (req, res) => {
  const club = await clubService.getClubByIdService(Number(req.params.id));
  if (!club) return res.status(404).json({ message: "Club no encontrado" });
  res.json(club);
};

export const getNearbyClubs = async (req, res) => {
  const { lat, lng, radius = 5, sport, search } = req.query;
  if (!lat || !lng) {
    return res.status(400).json({ message: "Se requieren lat y lng" });
  }
  const clubs = await clubService.getNearbyClubsService(
    Number(lat),
    Number(lng),
    Number(radius),
    { sport, search }
  );
  res.json(clubs);
};

export const getAvailableSports = async (req, res) => {
  const sports = await clubService.getAvailableSportsService();
  res.json(sports);
};

export const createClub = asyncHandler(async(req,res)=>{

  const validated =
      clubSchema.parse(req.body);

  const club =
      await clubService.createClubService(validated);

  res.status(201).json(club);

});


export const updateClub = asyncHandler(async(req,res)=>{

   const validated=
      clubSchema.partial().parse(req.body);

   const club=
      await clubService.updateClubService(
        Number(req.params.id),
        validated
      );

   res.json(club);

});
export const deleteClub =
asyncHandler(async(req,res)=>{
 await clubService.deleteClubService(
      Number(req.params.id)
 );
 res.status(204).send();
});