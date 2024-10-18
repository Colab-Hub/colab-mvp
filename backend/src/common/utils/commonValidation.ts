import { z } from "zod";

export const commonValidations = {
  id: z
    .string()
    .refine((data) => !Number.isNaN(Number(data)), "ID must be a numeric value")
    .transform(Number)
    .refine((num) => num > 0, "ID must be a positive number"),
};

const areasOfInterest = ["MARKETING", "DESIGN", "PROGRAMACAO", "MUSICA", "OUTROS"] as const;

const subscriptionLevels = ["BASIC", "PREMIUM", "ENTERPRISE"] as const;

export const clientValidations = {
  id: z.string().optional(),
  password: z.string().min(6).max(50),
  name: z.string().min(3).max(50),
  surname: z.string().min(3).max(50),
  age: z.number().positive().min(18).max(120),
  areasOfInterest: z.enum(areasOfInterest),
  address: z.object({
    zipCode: z.string().length(8),
    street: z.string().min(3).max(50),
    city: z.string().min(3).max(50),
    state: z.string().length(2),
    number: z.string().optional(),
    complement: z.string().optional(),
  }),
  isActive: z.boolean(),
  subscriptionLevel: z.enum(subscriptionLevels),
  cellphone: z.string().min(11).max(20),
  email: z.string().email(),
  additionalInfo: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
};

export const loginValidations = {
  email: z.string().email(),
  password: z.string().min(6).max(50),
};

export const authValidations = {
  token: z.string(),
};
