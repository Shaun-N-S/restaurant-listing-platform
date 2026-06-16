import { z } from "zod";

export const createRestaurantSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be under 80 characters")
    .regex(/[A-Za-z]/, "Name must contain at least one letter"),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address is too long")
    .regex(/[A-Za-z0-9]/, "Address must contain at least one letter or number"),

  contact: z
    .string()
    .trim()
    .regex(/^[+]?[\d\s\-().]{7,20}$/, "Enter a valid phone number")
    .refine(
      (value) => !/^0+$/.test(value.replace(/\D/g, "")),
      "Phone number cannot contain only zeros",
    ),
});

export const updateRestaurantSchema = createRestaurantSchema.partial();
