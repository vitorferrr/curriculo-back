import academicExperienceService from "../services/academicExperienceService.js";

const NOT_FOUND = { error: "Experiência acadêmica não encontrada." };

const getAcademicExperiences = async (req, res) => {
  const items = await academicExperienceService.getAllAcademicExperiences(req.query);
  return res.status(200).json(items);
};

const getAcademicExperience = async (req, res) => {
  const item = await academicExperienceService.getAcademicExperienceById(
    req.params.academicExperienceId,
  );
  if (!item) return res.status(404).json(NOT_FOUND);

  return res.status(200).json(item);
};

const createAcademicExperience = async (req, res) => {
  const item = await academicExperienceService.createAcademicExperience(req.body ?? {});
  return res.status(201).json(item);
};

const updateAcademicExperience = async (req, res) => {
  const item = await academicExperienceService.updateAcademicExperience(
    req.params.academicExperienceId,
    req.body ?? {},
  );
  if (!item) return res.status(404).json(NOT_FOUND);

  return res.status(200).json(item);
};

const deleteAcademicExperience = async (req, res) => {
  const item = await academicExperienceService.deleteAcademicExperience(
    req.params.academicExperienceId,
  );
  if (!item) return res.status(404).json(NOT_FOUND);

  return res.status(200).json({ message: "Experiência acadêmica excluída com sucesso." });
};

export default {
  getAcademicExperiences,
  getAcademicExperience,
  createAcademicExperience,
  updateAcademicExperience,
  deleteAcademicExperience,
};
