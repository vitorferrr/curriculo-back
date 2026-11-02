import technologyService from "../services/technologyService.js";

const NOT_FOUND = { error: "Tecnologia não encontrada." };

const getTechnologies = async (req, res) => {
  const technologies = await technologyService.getAllTechnologies({
    category: req.query.category,
  });
  return res.status(200).json(technologies);
};

const getTechnology = async (req, res) => {
  const technology = await technologyService.getTechnologyById(req.params.technologyId);
  if (!technology) return res.status(404).json(NOT_FOUND);

  return res.status(200).json(technology);
};

const getTechnologyProjects = async (req, res) => {
  const projects = await technologyService.getTechnologyProjects(req.params.technologyId);
  if (!projects) return res.status(404).json(NOT_FOUND);

  return res.status(200).json(projects);
};

const createTechnology = async (req, res) => {
  const technology = await technologyService.createTechnology(req.body ?? {});
  return res.status(201).json(technology);
};

const updateTechnology = async (req, res) => {
  const technology = await technologyService.updateTechnology(
    req.params.technologyId,
    req.body ?? {},
  );
  if (!technology) return res.status(404).json(NOT_FOUND);

  return res.status(200).json(technology);
};

const deleteTechnology = async (req, res) => {
  const technology = await technologyService.deleteTechnology(req.params.technologyId);
  if (!technology) return res.status(404).json(NOT_FOUND);

  return res.status(200).json({ message: "Tecnologia excluída com sucesso." });
};

export default {
  getTechnologies,
  getTechnology,
  getTechnologyProjects,
  createTechnology,
  updateTechnology,
  deleteTechnology,
};