import express from "express";
import { getGymSettings, updateGymSettings } from "../controllers/settings.controller.js";
import { requireSuperAdmin } from "../middlewares/index.js";

const router = express.Router();

router.get("/", getGymSettings);
router.put("/", requireSuperAdmin, updateGymSettings);

export default router;
