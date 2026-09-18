import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  imageUrl: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
});

export const updateUserSchema = createUserSchema.extend({
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});
