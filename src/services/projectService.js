import { Op } from "sequelize";
import sequelize from "../config/database.js";
import { Project, Profile, Technology, ProjectTechnology } from "../models/index.js";
import { HttpError } from "../middlewares/errorHandler.js";

const PROJECT_FIELDS = [
  "profileId",
  "name",
  "description",
  "repositoryUrl",
  "demoUrl",
  "imageUrl",
];

const projectInclude = [
  { model: Profile, as: "profile", attributes: ["id", "name"] },
  {
    model: Technology,
    as: "technologies",
    attributes: ["id", "name", "category"],
    through: { attributes: [] },
  },
];

const projectOrder = [
  ["createdAt", "DESC"],
  [{ model: Technology, as: "technologies" }, "name", "ASC"],
];

const ensureProfileExists = async (profileId) => {
  if (!profileId) {
    throw new HttpError(400, "profileId é obrigatório.");
  }

  const profile = await Profile.findByPk(profileId);
  if (!profile) {
    throw new HttpError(404, "Perfil informado não encontrado.");
  }
};

const findTechnologies = async (technologyIds) => {
  if (technologyIds === undefined) return undefined;

  if (!Array.isArray(technologyIds)) {
    throw new HttpError(400, "technologyIds deve ser uma lista de IDs.");
  }

  const uniqueIds = [...new Set(technologyIds)];
  if (uniqueIds.length === 0) return [];

  const technologies = await Technology.findAll({ where: { id: uniqueIds } });

  if (technologies.length !== uniqueIds.length) {
    const foundIds = technologies.map((technology) => technology.id);
    const missing = uniqueIds.filter((id) => !foundIds.includes(id));
    throw new HttpError(404, `Tecnologia(s) não encontrada(s): ${missing.join(", ")}`);
  }

  return technologies;
};

const getAllProjects = async (filters = {}) => {
  const where = {};

  if (filters.profileId) where.profileId = filters.profileId;

  if (filters.technologyId) {
    const links = await ProjectTechnology.findAll({
      where: { technologyId: filters.technologyId },
      attributes: ["projectId"],
    });
    where.id = { [Op.in]: links.map((link) => link.projectId) };
  }

  return await Project.findAll({
    where,
    include: projectInclude,
    order: projectOrder,
  });
};

const getProjectById = async (id) => {
  return await Project.findByPk(id, {
    include: projectInclude,
    order: projectOrder,
  });
};

const createProject = async (data) => {
  await ensureProfileExists(data.profileId);
  const technologies = await findTechnologies(data.technologyIds);

  const project = await sequelize.transaction(async (transaction) => {
    const created = await Project.create(data, { fields: PROJECT_FIELDS, transaction });

    if (technologies) {
      await created.setTechnologies(technologies, { transaction });
    }

    return created;
  });

  return await getProjectById(project.id);
};

const updateProject = async (id, data) => {
  const project = await Project.findByPk(id);
  if (!project) return null;

  if (data.profileId !== undefined) {
    await ensureProfileExists(data.profileId);
  }
  const technologies = await findTechnologies(data.technologyIds);

  await sequelize.transaction(async (transaction) => {
    await project.update(data, { fields: PROJECT_FIELDS, transaction });

    if (technologies) {
      await project.setTechnologies(technologies, { transaction });
    }
  });

  return await getProjectById(id);
};

const deleteProject = async (id) => {
  const project = await Project.findByPk(id);
  if (!project) return null;

  await project.destroy();
  return project;
};


const getProjectTechnologies = async (projectId) => {
  const project = await Project.findByPk(projectId);
  if (!project) return null;

  return await project.getTechnologies({
    joinTableAttributes: [],
    order: [["name", "ASC"]],
  });
};

const findProjectAndTechnology = async (projectId, technologyId) => {
  const project = await Project.findByPk(projectId);
  if (!project) throw new HttpError(404, "Projeto não encontrado.");

  if (!technologyId) throw new HttpError(400, "technologyId é obrigatório.");

  const technology = await Technology.findByPk(technologyId);
  if (!technology) throw new HttpError(404, "Tecnologia não encontrada.");

  return { project, technology };
};

const addTechnologyToProject = async (projectId, technologyId) => {
  const { project, technology } = await findProjectAndTechnology(projectId, technologyId);

  if (await project.hasTechnology(technology)) {
    throw new HttpError(409, "Essa tecnologia já está ligada ao projeto.");
  }

  await project.addTechnology(technology);
  return await getProjectTechnologies(projectId);
};

const removeTechnologyFromProject = async (projectId, technologyId) => {
  const { project, technology } = await findProjectAndTechnology(projectId, technologyId);

  if (!(await project.hasTechnology(technology))) {
    throw new HttpError(404, "Essa tecnologia não está ligada ao projeto.");
  }

  await project.removeTechnology(technology);
  return await getProjectTechnologies(projectId);
};

export default {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectTechnologies,
  addTechnologyToProject,
  removeTechnologyFromProject,
};