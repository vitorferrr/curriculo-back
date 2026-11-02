import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const AcademicExperience = sequelize.define(
  "AcademicExperience",
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
    institution: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: { msg: "A instituição é obrigatória." },
      },
    },
    course: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: { msg: "O curso é obrigatório." },
      },
    },
    degree: {
      type: DataTypes.STRING(60),
      allowNull: true,
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
    tableName: "academic_experiences",
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

export default AcademicExperience;