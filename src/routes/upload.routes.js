import express from "express";

import upload from "../middlewares/upload.middleware.js";

import {
  uploadUserPhoto,
} from "../controllers/upload.controller.js";

const router = express.Router();

router.post(
  "/user-photo",
  upload.single("image"),
  uploadUserPhoto
);

export default router;