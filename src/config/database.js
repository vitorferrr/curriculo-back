import "dotenv/config";
import pg from "pg";
import { Sequelize } from "sequelize";

if (!process.env.DATABASE_URL) {
  throw new Error("Variável DATABASE_URL não definida no arquivo .env");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

export default sequelize;