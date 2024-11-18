import { z } from "zod";

const states = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
    "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

export const UserAdressSchema = z.object({
    id: z.string().uuid(),
    
    userId: z.string().uuid(),
    
    zipCode: z.string().
        min(8, "ZipCode must be at least 8 characters long"),
    
    street: z.string().
        min(3, "Street must be at least 3 characters long"),
    
    number: z.string().
        min(1, "Number must be at least 1 characters long"),
    
    complement: z.string().optional(),
    
    neighborhood: z.string().
        min(3, "Neighborhood must be at least 3 characters long"),
    
    city: z.string().
        min(3, "City must be at least 3 characters long"),
    
    state: z.string().
        min(2, "State must be at least 2 characters long").
        refine((value) => states.includes(value), { message: "Invalid state" }),
    
    country: z.string().
        min(3, "Country must be at least 3 characters long"),
    
    createdAt: z.date(),
    updatedAt: z.date()
});

export const GetUserAdressSchema = z.object({
    params: z.object({ id: UserAdressSchema.shape.id }),
});

export const PostUserAdressSchema = z.object({
    params: UserAdressSchema,
});
