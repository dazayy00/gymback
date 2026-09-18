import { validateAccessService } from "../services/access.service.js";

export const validateAccess = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token QR requerido",
      });
    }

    const result = await validateAccessService(token);

    const statusCode = result.success ? 200 : 403;
    return res.status(statusCode).json(result);
  } catch (error) {
    console.error("ERROR VALIDATE ACCESS:", error);

    return res.status(500).json({
      success: false,
      message: "Error interno al validar acceso",
    });
  }
};
