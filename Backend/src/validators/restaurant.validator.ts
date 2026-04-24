import { z } from "zod";

export const createRestaurantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  contact: z.string().min(1, "Contact is required"),
  imageUrl: z.string().url("Invalid URL").optional(),
});

export const updateRestaurantSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  contact: z.string().optional(),
  imageUrl: z.string().url("Invalid URL").optional(),
});
