import { Router } from "express";
import technologyController from "../controllers/technologyController.js";

const router = Router();

router.get("/", technologyController.getTechnologies);
router.post("/", technologyController.createTechnology);

router.get("/:technologyId", technologyController.getTechnology);
router.put("/:technologyId", technologyController.updateTechnology);
router.delete("/:technologyId", technologyController.deleteTechnology);

router.get("/:technologyId/projects", technologyController.getTechnologyProjects);

export default router;