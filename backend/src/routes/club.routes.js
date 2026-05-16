import { Router } from "express";

import {
  getAllClubs,
  getClubById,
  getNearbyClubs,
  getAvailableSports,
  createClub,
  updateClub,
  deleteClub,
} from "../controllers/club.controller.js";

const router = Router();

router.get("/", getAllClubs);

router.get("/nearby", getNearbyClubs);

router.get("/sports", getAvailableSports);

router.get("/:id", getClubById);

router.post("/", createClub);

router.put("/:id", updateClub);

router.delete("/:id", deleteClub);

export default router;