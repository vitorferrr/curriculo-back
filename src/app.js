import express from "express";
import cors from "cors";

import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API de Currículo funcionando",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "rota não encontrada",
  });
});

app.use(errorHandler);

export default app;