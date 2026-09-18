import express from "express";
import { createMembership, getUserMemberships } from "../controllers/membership.controller.js";

const router = express.Router();

router.post("/", createMembership);
router.get("/:userId", getUserMemberships);

export default router;