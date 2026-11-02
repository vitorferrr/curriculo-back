import { Op } from "sequelize";
import { Technology, Profile } from "../models/index.js";
import { HttpError } from "../middlewares/errorHandler.js";

const TECHNOLOGY_FIELDS = ["name", "category"];

const ensureNameIsAvailable = async (name, ignoreId = null) => {
  if (!name) return;

  const where = { name: { [Op.iLike]: name.trim() } };
  if (ignoreId) where.id = { [Op.ne]: ignoreId };

  const existing = await Technology.findOne({ where });
  if (existing) {
    throw new HttpError(409, `A tecnologia "${existing.name}" já está cadastrada.`);
  }
};

const getAllTechnologies = async (filters = {}) => {
  const where = {};
  if (filters.category) where.category = { [Op.iLike]: filters.category };

  return await Technology.findAll({
    where,
    order: [["name", "ASC"]],
  });
};

const getTechnologyById = async (id) => {
  return await Technology.findByPk(id);
};

const getTechnologyProjects = async (id) => {
  const technology = await Technology.findByPk(id);
  if (!technology) return null;

  return await technology.getProjects({
    joinTableAttributes: [],
    include: [{ model: Profile, as: "profile", attributes: ["id", "name"] }],
    order: [["name", "ASC"]],
  });
};

const createTechnology = async (data) => {
  await ensureNameIsAvailable(data.name);

  return await Technology.create(
    { ...data, name: data.name?.trim() },
    { fields: TECHNOLOGY_FIELDS },
  );
};

const updateTechnology = async (id, data) => {
  const technology = await Technology.findByPk(id);
  if (!technology) return null;

  if (data.name !== undefined) {
    await ensureNameIsAvailable(data.name, id);
    data = { ...data, name: data.name?.trim() };
  }

  await technology.update(data, { fields: TECHNOLOGY_FIELDS });
  return technology;
};

const deleteTechnology = async (id) => {
  const technology = await Technology.findByPk(id);
  if (!technology) return null;

  await technology.destroy();
  return technology;
};

export default {
  getAllTechnologies,
  getTechnologyById,
  getTechnologyProjects,
  createTechnology,
  updateTechnology,
  deleteTechnology,
};