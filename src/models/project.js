import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    profileId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: { msg: "O nome do projeto é obrigatório." },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    repositoryUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: { isUrl: { msg: "repositoryUrl deve ser uma URL válida." } },
    },
    demoUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: { isUrl: { msg: "demoUrl deve ser uma URL válida." } },
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: { isUrl: { msg: "imageUrl deve ser uma URL válida." } },
    },
  },
  {
    tableName: "projects",
    timestamps: true,
    underscored: true,
  },
);

export default Project;