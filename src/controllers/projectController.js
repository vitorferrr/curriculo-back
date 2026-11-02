import projectService from "../services/projectService.js";

const NOT_FOUND = { error: "Projeto não encontrado." };

const getProjects = async (req, res) => {
  const projects = await projectService.getAllProjects({
    profileId: req.query.profileId,
    technologyId: req.query.technologyId,
  });
  return res.status(200).json(projects);
};

const getProject = async (req, res) => {
  const project = await projectService.getProjectById(req.params.projectId);
  if (!project) return res.status(404).json(NOT_FOUND);

  return res.status(200).json(project);
};

const createProject = async (req, res) => {
  const project = await projectService.createProject(req.body ?? {});
  return res.status(201).json(project);
};

const updateProject = async (req, res) => {
  const project = await projectService.updateProject(req.params.projectId, req.body ?? {});
  if (!project) return res.status(404).json(NOT_FOUND);

  return res.status(200).json(project);
};

const deleteProject = async (req, res) => {
  const project = await projectService.deleteProject(req.params.projectId);
  if (!project) return res.status(404).json(NOT_FOUND);

  return res.status(200).json({ message: "Projeto excluído com sucesso." });
};

const getProjectTechnologies = async (req, res) => {
  const technologies = await projectService.getProjectTechnologies(req.params.projectId);
  if (!technologies) return res.status(404).json(NOT_FOUND);

  return res.status(200).json(technologies);
};

const addTechnologyToProject = async (req, res) => {
  const technologies = await projectService.addTechnologyToProject(
    req.params.projectId,
    req.body?.technologyId,
  );

  return res.status(201).json({
    message: "Tecnologia ligada ao projeto com sucesso.",
    technologies,
  });
};

const removeTechnologyFromProject = async (req, res) => {
  const technologies = await projectService.removeTechnologyFromProject(
    req.params.projectId,
    req.params.technologyId,
  );

  return res.status(200).json({
    message: "Tecnologia removida do projeto com sucesso.",
    technologies,
  });
};

export default {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getProjectTechnologies,
  addTechnologyToProject,
  removeTechnologyFromProject,
};