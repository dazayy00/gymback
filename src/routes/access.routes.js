import express from "express";
import { validateAccess } from "../controllers/access.controller.js";

const router = express.Router();

// POST /api/access/validate — valida un QR y registra el acceso
router.post("/validate", validateAccess);

export default router;
