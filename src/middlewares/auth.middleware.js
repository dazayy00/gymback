import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token requerido" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = decoded; // now it's an admin token containing { id, role }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export const requireSuperAdmin = (req, res, next) => {
  if (!req.admin || req.admin.role !== "SUPERADMIN") {
    return res.status(403).json({ message: "Acción denegada: Solo SUPERADMIN" });
  }
  next();
};