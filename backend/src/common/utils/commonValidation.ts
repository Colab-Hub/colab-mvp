import { z } from "zod";

export const commonValidations = {
  id: z
    .string()
    .refine((data) => !Number.isNaN(Number(data)), "ID must be a numeric value")
    .transform(Number)
    .refine((num) => num > 0, "ID must be a positive number"),
};

const areasOfInterest = [
  "MARKETING", "DESIGN", "PROGRAMACAO", "MUSICA", "OUTROS"
] as const;

const subscriptionLevels = [
  "BASIC", "PREMIUM", "ENTERPRISE"
] as const;

export const clientValidations = {
  id: z.string().regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    "Invalid UUID format"
  ),
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  age: z.number().int().positive("Age must be a positive integer"),
  areasOfInterest: z.enum(areasOfInterest),
  address: z.object({
    zipCode: z.string().min(5, "ZipCode must be at least 5 characters"),
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(2, "State must be at least 2 characters"),
    number: z.string().optional(),
    complement: z.string().optional(),
  }),
  isActive: z.boolean(),
  subscriptionLevel: z.enum(subscriptionLevels),
  cellphone: z.string().min(10, "Cellphone must be at least 10 characters").max(11, "Cellphone must be at most 11 characters"),
  email: z.string().email("Invalid email format"),
  additionalInfo: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
};