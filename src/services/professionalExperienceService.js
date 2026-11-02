import { Op } from "sequelize";
import { ProfessionalExperience, Profile } from "../models/index.js";
import { HttpError } from "../middlewares/errorHandler.js";

const PROFESSIONAL_FIELDS = [
  "profileId",
  "company",
  "position",
  "startDate",
  "endDate",
  "description",
];

const profileInclude = {
  model: Profile,
  as: "profile",
  attributes: ["id", "name"],
};

const ensureProfileExists = async (profileId) => {
  if (!profileId) {
    throw new HttpError(400, "profileId é obrigatório.");
  }

  const profile = await Profile.findByPk(profileId);
  if (!profile) {
    throw new HttpError(404, "Perfil informado não encontrado.");
  }
};

const getAllProfessionalExperiences = async (filters = {}) => {
  const where = {};

  if (filters.profileId) where.profileId = filters.profileId;

  if (filters.current === "true") where.endDate = { [Op.is]: null };

  return await ProfessionalExperience.findAll({
    where,
    include: [profileInclude],
    order: [["startDate", "DESC"]],
  });
};

const getProfessionalExperienceById = async (id) => {
  return await ProfessionalExperience.findByPk(id, {
    include: [profileInclude],
  });
};

const createProfessionalExperience = async (data) => {
  await ensureProfileExists(data.profileId);

  const created = await ProfessionalExperience.create(data, {
    fields: PROFESSIONAL_FIELDS,
  });
  return await getProfessionalExperienceById(created.id);
};

const updateProfessionalExperience = async (id, data) => {
  const professionalExperience = await ProfessionalExperience.findByPk(id);
  if (!professionalExperience) return null;

  if (data.profileId !== undefined) {
    await ensureProfileExists(data.profileId);
  }

  await professionalExperience.update(data, { fields: PROFESSIONAL_FIELDS });
  return await getProfessionalExperienceById(id);
};

const deleteProfessionalExperience = async (id) => {
  const professionalExperience = await ProfessionalExperience.findByPk(id);
  if (!professionalExperience) return null;

  await professionalExperience.destroy();
  return professionalExperience;
};

export default {
  getAllProfessionalExperiences,
  getProfessionalExperienceById,
  createProfessionalExperience,
  updateProfessionalExperience,
  deleteProfessionalExperience,
};