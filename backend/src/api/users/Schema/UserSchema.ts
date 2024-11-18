import { z } from "zod";
import { UserAdressSchema } from "@/api/users/Schema/UserAdressSchema";

const subscriptionLevels = [
    "0", "1", "2"
] as const;

const areasOfInterest = [
    "musica",
    "teatro",
    "audiovisual",
    "relacoes publicas",
    "marketing e design",
    "tech",
    "outros",
] as const;

const newsletterOptions = [
    "tech",
    "desenvolvimento_pessoal",
    "outros"
] as const;
 

export const UserSchema = z.object({
    id: z.string().uuid(),
    
    name: z.string()
        .min(3, "Name must be at least 3 characters long"),
    
    surname: z.string().
        min(3, "Surname must be at least 3 characters long"),
    
    bio: z.string()
        .max(500, "Bio must be at most 500 characters long")
        .optional(),

    age: z.number().int().min(1).max(120).positive(),
    
    areasOfInterest: z.array(z.enum(areasOfInterest)),
    
    address: UserAdressSchema,
    
    subscriptionLevel: z.enum(subscriptionLevels),
    
    subscriptionNewsletter: z.array(z.enum(newsletterOptions)),

    subscribedOpportunitiesId: z.array(z.string()),
    
    cellphone: z.string().
        min(9, "Cellphone must be at least 9 characters long"),
    
    email: z.string().email(),

    password: z.string().
        min(8, "Password must be at least 8 characters long"),
    
    additionalInfo: z.string().optional(),
    
    is_active: z.boolean(),
    
    createdAt: z.date(),
    
    updatedAt: z.date(),
    
});

export const GetUserSchema = z.object({
    params: z.object({ id: UserSchema.shape.id }),
});

export const PostUserSchema = z.object({
    params: UserSchema,
});
