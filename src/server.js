import "dotenv/config";
import app from "./app.js";
import sequelize from "./config/database.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado ao PostgreSQL (NeonDB) com sucesso.");

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Não foi possível conectar ao banco:", error.message);
    process.exit(1);
  }
};

startServer();