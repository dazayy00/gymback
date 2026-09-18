import express from "express";
import { createSale, getSales } from "../controllers/sale.controller.js";
import { validate } from "../middlewares/index.js";
import { createSaleSchema } from "../validations/sale.schema.js";

const router = express.Router();

router.post("/", validate(createSaleSchema), createSale);
router.get("/", getSales);

export default router;