import express from "express";
import cors from "cors";

import profileRoutes from "./routes/profileRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import academicExperienceRoutes from "./routes/academicExperienceRoutes.js";
import professionalExperienceRoutes from "./routes/professionalExperienceRoutes.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API de Currículo no ar!",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.use("/profiles", profileRoutes);
app.use("/academic-experiences", academicExperienceRoutes);
app.use("/professional-experiences", professionalExperienceRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "Rota não encontrada.",
  });
});

app.use(errorHandler);

export default app;