import sequelize from "./database.js";
import "../models/index.js";

// npm run db:sync            -> cria as tabelas que ainda não existem
// npm run db:sync -- --force -> apaga e recria todas as tabelas (perde os dados)
const force = process.argv.includes("--force");

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force });

    console.log(
      force
        ? "Tabelas recriadas do zero com sucesso"
        : "Banco de dados sincronizado com sucesso",
    );
  } catch (error) {
    console.error("Erro ao sincronizar o banco:", error.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

syncDatabase();