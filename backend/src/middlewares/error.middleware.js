export function errorHandler(err, req, res, next) {
  console.error(err);

  // errores de Zod
  if (err?.issues) {
    return res.status(400).json({
      message: "Datos inválidos",
      errors: err.issues,
    });
  }

  // Prisma
  if (err?.code?.startsWith?.("P")) {
    return res.status(400).json({
      message: "Error de base de datos",
      code: err.code,
    });
  }

  res.status(500).json({
    message: "Error interno del servidor",
  });
}