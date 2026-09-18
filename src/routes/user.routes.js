import express from "express";

import {
  createUser,
  getUsers,
  getUserQr,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { validate, requireSuperAdmin } from "../middlewares/index.js";
import { createUserSchema, updateUserSchema } from "../validations/user.schema.js";

const router = express.Router();

router.get("/",      getUsers);
router.get("/:id/qr", getUserQr);
router.post("/",     validate(createUserSchema), createUser);
router.put("/:id",   validate(updateUserSchema), updateUser);
router.delete("/:id", requireSuperAdmin, deleteUser);

export default router;