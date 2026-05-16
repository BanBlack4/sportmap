import { Router } from "express";
import * as clubController from "../controllers/club.controller.js";

const router = Router();

// GET /api/clubs?sport=fútbol&search=olimpia
router.get("/", clubController.getAllClubs);

// GET /api/clubs/nearby?lat=-33.4&lng=-70.6&radius=5&sport=tenis
router.get("/nearby", clubController.getNearbyClubs);

// GET /api/clubs/:id
router.get("/:id", clubController.getClubById);

// POST /api/clubs
router.post("/", clubController.createClub);

// PUT /api/clubs/:id
router.put("/:id", clubController.updateClub);

// DELETE /api/clubs/:id
router.delete("/:id", clubController.deleteClub);

export default router;
