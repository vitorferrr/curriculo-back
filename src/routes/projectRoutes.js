import { Router } from "express";
import projectController from "../controllers/projectController.js";

const router = Router();

router.get("/", projectController.getProjects);
router.post("/", projectController.createProject);

router.get("/:projectId", projectController.getProject);
router.put("/:projectId", projectController.updateProject);
router.delete("/:projectId", projectController.deleteProject);

router.get("/:projectId/technologies", projectController.getProjectTechnologies);
router.post("/:projectId/technologies", projectController.addTechnologyToProject);
router.delete("/:projectId/technologies/:technologyId", projectController.removeTechnologyFromProject);

export default router;