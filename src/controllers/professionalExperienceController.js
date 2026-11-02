import professionalExperienceService from "../services/professionalExperienceService.js";

const NOT_FOUND = { error: "Experiência profissional não encontrada." };

const getProfessionalExperiences = async (req, res) => {
  const items = await professionalExperienceService.getAllProfessionalExperiences({
    profileId: req.query.profileId,
    current: req.query.current,
  });
  return res.status(200).json(items);
};

const getProfessionalExperience = async (req, res) => {
  const item = await professionalExperienceService.getProfessionalExperienceById(
    req.params.professionalExperienceId,
  );
  if (!item) return res.status(404).json(NOT_FOUND);

  return res.status(200).json(item);
};

const createProfessionalExperience = async (req, res) => {
  const item = await professionalExperienceService.createProfessionalExperience(
    req.body ?? {},
  );
  return res.status(201).json(item);
};

const updateProfessionalExperience = async (req, res) => {
  const item = await professionalExperienceService.updateProfessionalExperience(
    req.params.professionalExperienceId,
    req.body ?? {},
  );
  if (!item) return res.status(404).json(NOT_FOUND);

  return res.status(200).json(item);
};

const deleteProfessionalExperience = async (req, res) => {
  const item = await professionalExperienceService.deleteProfessionalExperience(
    req.params.professionalExperienceId,
  );
  if (!item) return res.status(404).json(NOT_FOUND);

  return res.status(200).json({ message: "Experiência profissional excluída com sucesso." });
};

export default {
  getProfessionalExperiences,
  getProfessionalExperience,
  createProfessionalExperience,
  updateProfessionalExperience,
  deleteProfessionalExperience,
};