import {
 getAllClubs,
 getClubById,
 getNearbyClubs,
 getAvailableSports,
 createClub,
 updateClub,
 deleteClub
} from "../controllers/club.controller.js";

router.get("/",getAllClubs);

router.get("/nearby",getNearbyClubs);

router.get("/sports",getAvailableSports);

router.get("/:id",getClubById);

router.post("/",createClub);

router.put("/:id",updateClub);

router.delete("/:id",deleteClub);