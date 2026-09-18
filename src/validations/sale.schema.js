import { z } from "zod";

export const createSaleSchema = z.object({
  userId: z.number().int().positive().optional(),
  paymentMethod: z.enum(["CASH", "CARD", "TRANSFER"]).default("CASH"),
  items: z.array(z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive(),
  })).min(1, "La venta debe tener al menos un producto"),
});
