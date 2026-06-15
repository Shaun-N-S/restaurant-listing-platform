import { z } from "zod";

export const createRestaurantSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be under 80 characters"),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address is too long"),

  contact: z
    .string()
    .regex(/^[+]?[\d\s\-().]{7,20}$/, "Enter a valid phone number"),
});

export const updateRestaurantSchema = createRestaurantSchema.partial();
