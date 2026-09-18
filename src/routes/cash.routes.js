import express from "express";
import { getCashStatus, openCash, closeCash } from "../controllers/cash.controller.js";
import { requireSuperAdmin } from "../middlewares/index.js";

const router = express.Router();

router.get("/status", getCashStatus);
router.post("/open", requireSuperAdmin, openCash);
router.post("/close", requireSuperAdmin, closeCash);

export default router;
