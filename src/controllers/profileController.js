import profileService from "../services/profileService.js";

const NOT_FOUND = { error: "Perfil não encontrado." };

const getProfiles = async (req, res) => {
  const profiles = await profileService.getAllProfiles();
  return res.status(200).json(profiles);
};

const getProfile = async (req, res) => {
  const profile = await profileService.getProfileById(req.params.profileId);
  if (!profile) return res.status(404).json(NOT_FOUND);

  return res.status(200).json(profile);
};

const getFullProfile = async (req, res) => {
  const profile = await profileService.getFullProfile(req.params.profileId);
  if (!profile) return res.status(404).json(NOT_FOUND);

  return res.status(200).json(profile);
};

const getProfileAcademicExperiences = async (req, res) => {
  const items = await profileService.getProfileAcademicExperiences(req.params.profileId);
  if (!items) return res.status(404).json(NOT_FOUND);

  return res.status(200).json(items);
};

const getProfileProfessionalExperiences = async (req, res) => {
  const items = await profileService.getProfileProfessionalExperiences(req.params.profileId);
  if (!items) return res.status(404).json(NOT_FOUND);

  return res.status(200).json(items);
};

const getProfileProjects = async (req, res) => {
  const items = await profileService.getProfileProjects(req.params.profileId);
  if (!items) return res.status(404).json(NOT_FOUND);

  return res.status(200).json(items);
};

const createProfile = async (req, res) => {
  const profile = await profileService.createProfile(req.body ?? {});
  return res.status(201).json(profile);
};

const updateProfile = async (req, res) => {
  const profile = await profileService.updateProfile(req.params.profileId, req.body ?? {});
  if (!profile) return res.status(404).json(NOT_FOUND);

  return res.status(200).json(profile);
};

const deleteProfile = async (req, res) => {
  const profile = await profileService.deleteProfile(req.params.profileId);
  if (!profile) return res.status(404).json(NOT_FOUND);

  return res.status(200).json({ message: "Perfil excluído com sucesso." });
};

export default {
  getProfiles,
  getProfile,
  getFullProfile,
  getProfileAcademicExperiences,
  getProfileProfessionalExperiences,
  getProfileProjects,
  createProfile,
  updateProfile,
  deleteProfile,
};