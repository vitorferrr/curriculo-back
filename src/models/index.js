import Profile from "./profile.js";
import AcademicExperience from "./academicExperience.js";
import ProfessionalExperience from "./professionalExperience.js";
import Project from "./project.js";
import Technology from "./technology.js";
import ProjectTechnology from "./projectTechnology.js";

Profile.hasMany(AcademicExperience, {
  foreignKey: "profileId",
  as: "academicExperiences",
  onDelete: "CASCADE", // apagar o perfil apaga suas formações
});
AcademicExperience.belongsTo(Profile, {
  foreignKey: "profileId",
  as: "profile",
});

Profile.hasMany(ProfessionalExperience, {
  foreignKey: "profileId",
  as: "professionalExperiences",
  onDelete: "CASCADE",
});
ProfessionalExperience.belongsTo(Profile, {
  foreignKey: "profileId",
  as: "profile",
});

Profile.hasMany(Project, {
  foreignKey: "profileId",
  as: "projects",
  onDelete: "CASCADE",
});
Project.belongsTo(Profile, {
  foreignKey: "profileId",
  as: "profile",
});

Project.belongsToMany(Technology, {
  through: ProjectTechnology,
  foreignKey: "projectId",
  otherKey: "technologyId",
  as: "technologies",
});
Technology.belongsToMany(Project, {
  through: ProjectTechnology,
  foreignKey: "technologyId",
  otherKey: "projectId",
  as: "projects",
});

export {
  Profile,
  AcademicExperience,
  ProfessionalExperience,
  Project,
  Technology,
  ProjectTechnology,
};