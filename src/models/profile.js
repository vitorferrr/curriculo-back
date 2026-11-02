import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Profile = sequelize.define(
  "Profile",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: {
        notEmpty: { msg: "O nome é obrigatório." },
      },
    },
    title: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(160),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Informe um e-mail válido." },
      },
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    photoUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: { isUrl: { msg: "photoUrl deve ser uma URL válida." } },
    },
    githubUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: { isUrl: { msg: "githubUrl deve ser uma URL válida." } },
    },
    linkedinUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: { isUrl: { msg: "linkedinUrl deve ser uma URL válida." } },
    },
  },
  {
    tableName: "profiles",
    timestamps: true,
    underscored: true,
  },
);

export default Profile;