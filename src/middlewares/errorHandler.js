const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      error: "JSON inválido no corpo da requisição.",
    });
  }

  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: "Dados inválidos.",
      details: error.errors.map((item) => item.message),
    });
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      error: "Já existe um registro com esses dados.",
      details: error.errors.map((item) => item.message),
    });
  }

  if (error.name === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({
      error: "O registro relacionado informado não existe.",
    });
  }

  if (error.parent?.code === "22P02") {
    return res.status(400).json({
      error: "O ID informado possui formato inválido.",
    });
  }

  return res.status(500).json({
    error: "Erro interno do servidor.",
  });
};

export default errorHandler;