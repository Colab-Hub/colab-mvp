import { z } from "zod";

const opportunityTypes = ["full-time", "part-time"] as const;
const contractTypes = ["contract", "freelance"] as const;
const activityAreas = ["musica", "teatro", "audiovisual", "relacoes publicas", "marketing e design", "tech"] as const;
const experienceLevels = ["junior", "mid", "senior", "specialist", "manager"] as const;
const commitmentTypes = ["full-time", "part-time"] as const;

export const OpportunitiesSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3, "Title must be at least 3 characters long"),
  type: z.enum([...opportunityTypes]),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  location: z.string(),
  isRemote: z.boolean(),
  isPaid: z.boolean(),
  contractType: z.array(z.enum(contractTypes)),
  activityArea: z.array(z.enum(activityAreas)),
  experienceLevel: z.array(z.enum(experienceLevels)),
  requiredSkills: z.array(z.string()),
  timeCommitment: z.enum([...commitmentTypes]),
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
  createdAt: z.date(),
  updatedAt: z.date(),
  additionalInfo: z.string().optional(),
  is_active: z.boolean(),
});

export const GetOpportunitiesSchema = z.object({
  params: z.object({ id: OpportunitiesSchema.shape.id }),
});

export const PostOpportunitiesSchema = z.object({
  params: OpportunitiesSchema,
});
