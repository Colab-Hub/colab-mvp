import { z } from "zod";

const contractTypes = ["contract", "freelance"] as const;
const experienceLevels = ["junior", "mid", "senior"] as const;
const areasOfInterest = ["marketing", "development", "arts"] as const;

export const OpportunitiesSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(3, "Title must be at least 3 characters long"),
    type: z.enum(["full-time", "part-time", ...contractTypes]),
    description: z.string().optional(),
    startDate: z.date(),
    endDate: z.date(),
    location: z.string(),
    isRemote: z.boolean(),
    isPaid: z.boolean(),
    contractType: z.array(z.enum(contractTypes)),
    activityArea: z.array(z.enum(areasOfInterest)),
    experienceLevel: z.array(z.enum(experienceLevels)),
    requiredSkills: z.array(z.string()),
    timeCommitment: z.enum(["full-time", "part-time"]),
    languages: z.array(z.string()),
    feedbackTime: z.string(),
    applicantsEmails: z.array(z.string().email()).optional(),
    howManyApplicants: z.number().nonnegative().optional(),
    hirerEmail: z.string().email(),
    hirerName: z.string(),
    hirerPhone: z.string().optional(),
    hirerCompany: z.string(),
    hirerCompanyWebsite: z.string().url().optional(),
    hirerCompanyLogo: z.string().url().optional(),
    areasOfInterest: z.array(z.enum(areasOfInterest)),
    createdAt: z.date(),
    updatedAt: z.date(),
    additionalInfo: z.string().optional(),
});

export const GetOpportunitiesSchema = z.object({
    params: z.object({ id: OpportunitiesSchema.shape.id }),
});

export const PostOpportunitiesSchema = z.object({
    params: OpportunitiesSchema,
});

