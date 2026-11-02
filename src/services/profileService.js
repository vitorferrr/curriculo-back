import {
  Profile,
  AcademicExperience,
  ProfessionalExperience,
  Project,
  Technology,
} from "../models/index.js";

const PROFILE_FIELDS = [
  "name",
  "title",
  "email",
  "phone",
  "location",
  "summary",
  "photoUrl",
  "githubUrl",
  "linkedinUrl",
];

const technologiesInclude = {
  model: Technology,
  as: "technologies",
  attributes: ["id", "name", "category"],
  through: { attributes: [] },
};

const getAllProfiles = async () => {
  return await Profile.findAll({
    order: [["name", "ASC"]],
  });
};

const getProfileById = async (id) => {
  return await Profile.findByPk(id);
};

// Currículo completo: perfil + formações + experiências + projetos com tecnologias
const getFullProfile = async (id) => {
  return await Profile.findByPk(id, {
    include: [
      { model: AcademicExperience, as: "academicExperiences" },
      { model: ProfessionalExperience, as: "professionalExperiences" },
      { model: Project, as: "projects", include: [technologiesInclude] },
    ],
    order: [
      [{ model: AcademicExperience, as: "academicExperiences" }, "startDate", "DESC"],
      [{ model: ProfessionalExperience, as: "professionalExperiences" }, "startDate", "DESC"],
      [{ model: Project, as: "projects" }, "createdAt", "DESC"],
    ],
  });
};

const getProfileAcademicExperiences = async (id) => {
  const profile = await Profile.findByPk(id);
  if (!profile) return null;

  return await profile.getAcademicExperiences({
    order: [["startDate", "DESC"]],
  });
};

const getProfileProfessionalExperiences = async (id) => {
  const profile = await Profile.findByPk(id);
  if (!profile) return null;

  return await profile.getProfessionalExperiences({
    order: [["startDate", "DESC"]],
  });
};

const getProfileProjects = async (id) => {
  const profile = await Profile.findByPk(id);
  if (!profile) return null;

  return await profile.getProjects({
    include: [technologiesInclude],
    order: [["createdAt", "DESC"]],
  });
};

const createProfile = async (data) => {
  return await Profile.create(data, { fields: PROFILE_FIELDS });
};

const updateProfile = async (id, data) => {
  const profile = await Profile.findByPk(id);
  if (!profile) return null;

  await profile.update(data, { fields: PROFILE_FIELDS });
  return profile;
};

const deleteProfile = async (id) => {
  const profile = await Profile.findByPk(id);
  if (!profile) return null;

  await profile.destroy();
  return profile;
};

export default {
  getAllProfiles,
  getProfileById,
  getFullProfile,
  getProfileAcademicExperiences,
  getProfileProfessionalExperiences,
  getProfileProjects,
  createProfile,
  updateProfile,
  deleteProfile,
};