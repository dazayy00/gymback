import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional().or(z.literal("")),
  price: z.number().min(0, "El precio no puede ser negativo"),
  stock: z.number().int().min(0, "El stock no puede ser negativo").optional(),
  barcode: z.string().optional().or(z.literal("")),
  imageUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  isActive: z.boolean().optional(),
});

export const updateProductSchema = createProductSchema.partial();
