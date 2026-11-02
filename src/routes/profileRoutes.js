import { Router } from "express";
import profileController from "../controllers/profileController.js";

const router = Router();

router.get("/", profileController.getProfiles);
router.post("/", profileController.createProfile);

router.get("/:profileId", profileController.getProfile);
router.put("/:profileId", profileController.updateProfile);
router.delete("/:profileId", profileController.deleteProfile);

// Relacionamentos do perfil
router.get("/:profileId/full", profileController.getFullProfile);
router.get("/:profileId/academic-experiences", profileController.getProfileAcademicExperiences);
router.get("/:profileId/professional-experiences", profileController.getProfileProfessionalExperiences);
router.get("/:profileId/projects", profileController.getProfileProjects);

export default router;