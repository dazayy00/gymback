import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { validate, requireSuperAdmin } from "../middlewares/index.js";
import { createProductSchema, updateProductSchema } from "../validations/product.schema.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", validate(createProductSchema), createProduct);

router.put("/:id", validate(updateProductSchema), updateProduct);

router.delete("/:id", requireSuperAdmin, deleteProduct);

export default router;