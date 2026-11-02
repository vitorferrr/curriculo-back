import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ProfessionalExperience = sequelize.define(
  "ProfessionalExperience",
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
    company: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: { msg: "A empresa é obrigatória." },
      },
    },
    position: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: {
        notEmpty: { msg: "O cargo é obrigatório." },
      },
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "professional_experiences",
    timestamps: true,
    underscored: true,
    validate: {
      endDateAfterStartDate() {
        if (this.endDate && this.startDate && this.endDate < this.startDate) {
          throw new Error("A data de término não pode ser anterior à data de início.");
        }
      },
    },
  },
);

export default ProfessionalExperience;