import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ProjectTechnology = sequelize.define(
  "ProjectTechnology",
  {
    projectId: {
      type: DataTypes.UUID,
      primaryKey: true, // projectId + technologyId
      allowNull: false,
    },
    technologyId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    tableName: "project_technologies",
    timestamps: false,
    underscored: true,
  },
);

export default ProjectTechnology;