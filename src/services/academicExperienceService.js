import { AcademicExperience, Profile } from "../models/index.js";
import { HttpError } from "../middlewares/errorHandler.js";

const ACADEMIC_FIELDS = [
  "profileId",
  "institution",
  "course",
  "degree",
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

const getAllAcademicExperiences = async (filters = {}) => {
  const where = {};
  if (filters.profileId) where.profileId = filters.profileId;

  return await AcademicExperience.findAll({
    where,
    include: [profileInclude],
    order: [["startDate", "DESC"]],
  });
};

const getAcademicExperienceById = async (id) => {
  return await AcademicExperience.findByPk(id, {
    include: [profileInclude],
  });
};

const createAcademicExperience = async (data) => {
  await ensureProfileExists(data.profileId);

  const created = await AcademicExperience.create(data, { fields: ACADEMIC_FIELDS });
  return await getAcademicExperienceById(created.id);
};

const updateAcademicExperience = async (id, data) => {
  const academicExperience = await AcademicExperience.findByPk(id);
  if (!academicExperience) return null;

  if (data.profileId !== undefined) {
    await ensureProfileExists(data.profileId);
  }

  await academicExperience.update(data, { fields: ACADEMIC_FIELDS });
  return await getAcademicExperienceById(id);
};

const deleteAcademicExperience = async (id) => {
  const academicExperience = await AcademicExperience.findByPk(id);
  if (!academicExperience) return null;

  await academicExperience.destroy();
  return academicExperience;
};

export default {
  getAllAcademicExperiences,
  getAcademicExperienceById,
  createAcademicExperience,
  updateAcademicExperience,
  deleteAcademicExperience,
};